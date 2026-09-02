'use client';

import { AppLayout } from '@/components/app-shell/AppLayout';
import { ChatInterface } from '@/components/chat';

export default function AssistantPage() {
  return (
    <AppLayout>
      <ChatInterface />
    </AppLayout>
  );
}
