import { useState } from 'react';
import { mockMessages, formatTime } from './mockData';
import { ChatMessage } from './types';
import Icon from '@/components/ui/icon';

export default function HistoryView() {
  const [search, setSearch] = useState('');
  const myMessages: ChatMessage[] = [
    ...mockMessages.filter(m => m.isMine),
    {
      id: 'h1', senderId: 'me', senderNick: 'Я', senderAvatar: '🦊', senderColor: '#1a1a1a',
      text: 'Это мой первый тестовый текст в общем чате', timestamp: new Date(Date.now() - 3600000 * 2),
      isMine: true,
    },
    {
      id: 'h2', senderId: 'me', senderNick: 'Я', senderAvatar: '🦊', senderColor: '#1a1a1a',
      text: 'Проверяю, как выглядит история сообщений', timestamp: new Date(Date.now() - 3600000 * 1),
      isMine: true,
    },
  ];

  const filtered = myMessages.filter(m =>
    m.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-6 py-5 border-b border-border">
        <h2 className="font-semibold text-sm tracking-widest uppercase text-muted-foreground mb-4">История</h2>
        <div className="relative">
          <Icon name="Search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по сообщениям..."
            className="w-full bg-secondary rounded-lg pl-8 pr-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <span className="text-4xl mb-3">📭</span>
            <p className="text-sm text-muted-foreground">Ничего не найдено</p>
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {filtered.map(msg => (
              <div key={msg.id} className="flex gap-3 items-start p-3 rounded-xl hover:bg-secondary/60 transition-colors">
                <div className="text-lg shrink-0 mt-0.5">{msg.senderAvatar}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed">{msg.text || '—'}</p>
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Icon name="Paperclip" size={10} />
                      {msg.attachments.length} вложение
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground font-mono-chat shrink-0">{formatTime(msg.timestamp)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center font-mono-chat">
          {myMessages.length} сообщений отправлено
        </p>
      </div>
    </div>
  );
}
