'use client';

import { useState, useRef, useCallback } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (textToSend: string) => {
      const trimmed = textToSend.trim();
      if (!trimmed || isLoading) return;

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: trimmed,
        timestamp: timeStr,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);
      setError(null);

      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: trimmed }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('Response body is not readable');
        }

        const decoder = new TextDecoder();
        let assistantMessage = '';
        const messageId = (Date.now() + 1).toString();
        const assistantTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Create initial assistant message
        setMessages((prev) => [
          ...prev,
          {
            id: messageId,
            role: 'assistant',
            content: '',
            timestamp: assistantTime,
          },
        ]);

        // Stream the response
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          assistantMessage += chunk;

          // Update the last message (assistant's response)
          setMessages((prev) => {
            const updated = [...prev];
            const lastMsg = updated[updated.length - 1];
            if (lastMsg && lastMsg.role === 'assistant') {
              lastMsg.content = assistantMessage;
            }
            return updated;
          });
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err);
          // Remove incomplete assistant message on error
          setMessages((prev) => prev.filter((msg) => msg.role !== 'assistant' || msg.content !== ''));
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [isLoading]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await sendMessage(input);
    },
    [input, sendMessage]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const clearMessages = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setMessages([]);
    setError(null);
    setIsLoading(false);
  }, []);

  const stopChat = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    sendMessage,
    clearMessages,
    stopChat,
    isLoading,
    error,
  };
}
