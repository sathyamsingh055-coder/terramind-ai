'use client';

import React, { useState } from 'react';
import { Bot, User, Copy, Check, Sparkles, Sprout, ArrowRight } from 'lucide-react';
import { Message } from '@/hooks/useChat';
import { MarkdownContent } from './MarkdownContent';
import Link from 'next/link';

interface ChatMessageItemProps {
  message: Message;
  isLatest: boolean;
  isLoading: boolean;
  onSelectPrompt?: (prompt: string) => void;
}

export function ChatMessageItem({
  message,
  isLatest,
  isLoading,
  onSelectPrompt,
}: ChatMessageItemProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={`group flex flex-col ${
        isUser ? 'items-end' : 'items-start'
      } w-full`}
    >
      <div
        className={`flex items-start gap-2.5 max-w-[92%] sm:max-w-[85%] ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Avatar */}
        <div
          className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center shadow-2xs ${
            isUser
              ? 'bg-zinc-800 dark:bg-zinc-700 text-white font-semibold text-xs'
              : 'bg-emerald-600 dark:bg-emerald-500 text-white'
          }`}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Bubble Container */}
        <div className="flex flex-col space-y-1 min-w-0">
          {/* Header info */}
          <div
            className={`flex items-center gap-2 text-[11px] text-zinc-400 dark:text-zinc-500 px-1 ${
              isUser ? 'justify-end' : 'justify-start'
            }`}
          >
            <span className="font-semibold text-zinc-600 dark:text-zinc-400">
              {isUser ? 'You' : 'TerraMind Agronomist'}
            </span>
            {message.timestamp && <span>{message.timestamp}</span>}
          </div>

          {/* Body Content */}
          <div
            className={`p-4 rounded-2xl shadow-2xs ${
              isUser
                ? 'bg-emerald-600 dark:bg-emerald-600 text-white rounded-tr-xs'
                : 'bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-xs'
            }`}
          >
            {isUser ? (
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {message.content}
              </p>
            ) : (
              <div>
                <MarkdownContent content={message.content} />
                {isLatest && isLoading && (
                  <div className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Analyzing agronomic parameters...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Assistant Actions Bar */}
          {!isUser && message.content && (
            <div className="flex items-center gap-2 px-1 pt-0.5">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                title="Copy response to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Suggested Follow-up Actions for the latest assistant message */}
      {!isUser && isLatest && !isLoading && message.content && (
        <div className="mt-3.5 ml-10 flex flex-wrap items-center gap-2 max-w-[85%]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-500" />
            Quick Actions:
          </span>

          <Link
            href="/recommendation"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors shadow-2xs"
          >
            <Sprout className="w-3 h-3" />
            <span>Analyze my soil</span>
          </Link>

          <Link
            href="/recommendations"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors shadow-2xs"
          >
            <span>View saved recommendations</span>
            <ArrowRight className="w-3 h-3" />
          </Link>

          {onSelectPrompt && (
            <>
              <button
                type="button"
                onClick={() => onSelectPrompt('What specific fertilizer dosage is recommended for this scenario?')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Recommended fertilizer dose?</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectPrompt('What are the key pest and disease risks to monitor?')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors shadow-2xs cursor-pointer"
              >
                <span>Pest management steps?</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
