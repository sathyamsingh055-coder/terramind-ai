'use client';

import React, { useRef, useEffect } from 'react';
import { Send, Square, Sparkles } from 'lucide-react';

interface ChatComposerProps {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onStop: () => void;
  isLoading: boolean;
}

export function ChatComposer({
  input,
  onChange,
  onSubmit,
  onStop,
  isLoading,
}: ChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize textarea up to a max height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        140
      )}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const form = textareaRef.current?.form;
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  return (
    <div className="shrink-0 p-3 sm:p-4 bg-white/95 dark:bg-zinc-900/95 border-t border-zinc-200/90 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={onSubmit} className="relative">
          <div className="rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 focus-within:border-emerald-500 dark:focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 shadow-xs transition-all overflow-hidden">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about crop planning, soil pH, NPK balance, or disease management..."
              disabled={isLoading}
              className="w-full resize-none px-4 pt-3.5 pb-10 text-sm bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none min-h-[44px] max-h-[140px] leading-relaxed"
            />

            {/* Bottom Bar inside Composer */}
            <div className="absolute bottom-2 left-3 right-2 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1 text-[11px] text-zinc-400 dark:text-zinc-500 select-none">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span className="hidden sm:inline">Press Enter to send, Shift+Enter for new line</span>
              </div>

              <div className="pointer-events-auto">
                {isLoading ? (
                  <button
                    type="button"
                    onClick={onStop}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-900 text-white dark:bg-zinc-700 dark:hover:bg-zinc-600 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>Stop</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-700 text-white disabled:text-zinc-400 disabled:cursor-not-allowed shadow-xs transition-all cursor-pointer"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>

        <p className="mt-2 text-center text-[11px] text-zinc-400 dark:text-zinc-500">
          TerraMind AI Agronomist provides advisory guidance based on agronomic benchmarks. Always verify critical chemical applications locally.
        </p>
      </div>
    </div>
  );
}
