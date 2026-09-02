'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useChat } from '@/hooks/useChat';
import { AssistantHeader } from './AssistantHeader';
import { WelcomeEmptyState } from './WelcomeEmptyState';
import { ChatMessageItem } from './ChatMessageItem';
import { ChatComposer } from './ChatComposer';
import { FarmContextPanel } from './FarmContextPanel';
import { AlertCircle, RotateCcw, Bot } from 'lucide-react';

function ChatInterfaceInner() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    sendMessage,
    clearMessages,
    stopChat,
    isLoading,
    error,
  } = useChat();

  const searchParams = useSearchParams();
  const [showContextPanel, setShowContextPanel] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryHandledRef = useRef(false);

  // Auto-fill or send query from URL parameter once on mount
  useEffect(() => {
    if (queryHandledRef.current) return;
    const initialQuery = searchParams.get('query') || searchParams.get('prompt');
    if (initialQuery && initialQuery.trim()) {
      queryHandledRef.current = true;
      sendMessage(initialQuery.trim());
    }
  }, [searchParams, sendMessage]);

  // Auto-scroll to bottom when new messages arrive or loading state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSelectPrompt = (promptText: string) => {
    sendMessage(promptText);
  };

  return (
    <div className="flex flex-col h-full w-full min-h-0 bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Top Assistant Header */}
      <AssistantHeader
        messageCount={messages.length}
        onReset={clearMessages}
        showContextPanel={showContextPanel}
        onToggleContextPanel={() => setShowContextPanel(!showContextPanel)}
      />

      {/* Main Workspace Body: Messages + Side Context Panel */}
      <div className="flex-1 flex min-h-0 w-full overflow-hidden">
        {/* Chat Feed Column */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-zinc-50/50 dark:bg-zinc-950">
          {/* Scrollable Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
            {messages.length === 0 ? (
              <WelcomeEmptyState onSelectPrompt={handleSelectPrompt} />
            ) : (
              <div className="max-w-4xl mx-auto space-y-6">
                {messages.map((msg, idx) => (
                  <ChatMessageItem
                    key={msg.id || idx}
                    message={msg}
                    isLatest={idx === messages.length - 1}
                    isLoading={isLoading}
                    onSelectPrompt={handleSelectPrompt}
                  />
                ))}

                {/* Loading indicator when waiting for initial stream response */}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    <div className="shrink-0 w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-tl-xs shadow-2xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium ml-1">
                        Formulating agronomic recommendation...
                      </span>
                    </div>
                  </div>
                )}

                {/* Error Banner */}
                {error && (
                  <div className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 p-4 shadow-xs">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-semibold text-red-900 dark:text-red-100">
                            Advisory Engine Communication Issue
                          </h4>
                          <p className="text-xs text-red-700 dark:text-red-300 mt-0.5">
                            {error.message || 'Unable to connect to Gemini agronomy model. Please verify your connection.'}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
                          if (lastUserMsg) {
                            sendMessage(lastUserMsg.content);
                          }
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-100 hover:bg-red-200 dark:bg-red-900/50 dark:hover:bg-red-900 text-red-800 dark:text-red-200 transition-colors shrink-0 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retry</span>
                      </button>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Bottom Composer */}
          <ChatComposer
            input={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onStop={stopChat}
            isLoading={isLoading}
          />
        </div>

        {/* Right Demonstration Context Panel */}
        {showContextPanel && (
          <div className="hidden md:flex">
            <FarmContextPanel onInjectContextPrompt={handleSelectPrompt} />
          </div>
        )}
      </div>
    </div>
  );
}

export function ChatInterface() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full w-full bg-white dark:bg-zinc-950">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading Agronomist Workspace...</p>
          </div>
        </div>
      }
    >
      <ChatInterfaceInner />
    </Suspense>
  );
}
