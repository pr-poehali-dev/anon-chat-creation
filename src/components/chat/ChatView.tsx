import { useState, useRef, useEffect } from 'react';
import { ChatMessage, UserProfile, Attachment } from './types';
import { mockMessages, formatTime, formatSize, detectSpam, generateId } from './mockData';
import Icon from '@/components/ui/icon';

interface Props {
  profile: UserProfile;
}

export default function ChatView({ profile }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showSpam, setShowSpam] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text && attachments.length === 0) return;

    const isSpam = detectSpam(text);
    const msg: ChatMessage = {
      id: generateId(),
      senderId: 'me',
      senderNick: profile.nickname,
      senderAvatar: profile.avatar,
      senderColor: profile.color,
      text,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
      isSpam,
      isMine: true,
    };
    setMessages(prev => [...prev, msg]);
    setInput('');
    setAttachments([]);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments: Attachment[] = files.map(f => ({
      name: f.name,
      size: f.size,
      type: f.type,
      url: URL.createObjectURL(f),
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
    e.target.value = '';
  };

  const removeAttachment = (i: number) => {
    setAttachments(prev => prev.filter((_, idx) => idx !== i));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  const visibleMessages = messages.filter(m => showSpam || !m.isSpam || m.isMine);
  const spamCount = messages.filter(m => m.isSpam && !m.isMine).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h2 className="font-semibold text-sm tracking-wide">Общий чат</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{messages.length} сообщений · 4 онлайн</p>
        </div>
        <button
          onClick={() => setShowSpam(s => !s)}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-border hover:bg-accent transition-colors"
        >
          <Icon name="ShieldAlert" size={13} />
          {showSpam ? 'Скрыть спам' : `Спам (${spamCount})`}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
        {visibleMessages.map((msg, i) => {
          const showDate = i === 0 || new Date(visibleMessages[i - 1].timestamp).toDateString() !== new Date(msg.timestamp).toDateString();
          return (
            <div key={msg.id} className="animate-message-in">
              {showDate && (
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground">
                    {msg.timestamp.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
              )}
              <div className={`flex gap-3 group items-end ${msg.isMine ? 'flex-row-reverse' : ''}`}>
                <div className="text-lg leading-none shrink-0 mb-1">{msg.senderAvatar}</div>
                <div className={`max-w-[70%] ${msg.isMine ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                  {!msg.isMine && (
                    <span className="text-xs text-muted-foreground ml-1 font-medium">{msg.senderNick}</span>
                  )}
                  <div className={`relative rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.isMine ? 'msg-bubble-mine rounded-br-sm' : 'msg-bubble-other rounded-bl-sm'} ${msg.isSpam ? 'opacity-60' : ''}`}>
                    {msg.isSpam && (
                      <div className="flex items-center gap-1 mb-1.5">
                        <span className="spam-badge flex items-center gap-1">
                          <Icon name="AlertTriangle" size={10} />
                          СПАМ
                        </span>
                      </div>
                    )}
                    {msg.text && <p>{msg.text}</p>}
                    {msg.attachments && msg.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {msg.attachments.map((att, ai) => (
                          <a
                            key={ai}
                            href={att.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-lg ${msg.isMine ? 'bg-white/15 hover:bg-white/25' : 'bg-black/5 hover:bg-black/10'} transition-colors`}
                          >
                            <Icon name={att.type.startsWith('image/') ? 'Image' : 'FileText'} size={12} />
                            <span className="truncate max-w-[180px]">{att.name}</span>
                            <span className="opacity-60 shrink-0">{formatSize(att.size)}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={`flex items-center gap-1.5 px-1 ${msg.isMine ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[10px] text-muted-foreground font-mono-chat">{formatTime(msg.timestamp)}</span>
                    {msg.isMine && (
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                      >
                        <Icon name="Trash2" size={11} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="px-5 py-2 flex gap-2 flex-wrap border-t border-border bg-secondary/30">
          {attachments.map((att, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-accent rounded-lg px-2.5 py-1.5 text-xs">
              <Icon name={att.type.startsWith('image/') ? 'Image' : 'FileText'} size={12} />
              <span className="max-w-[120px] truncate">{att.name}</span>
              <button onClick={() => removeAttachment(i)} className="hover:text-destructive transition-colors ml-0.5">
                <Icon name="X" size={11} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-5 py-4 border-t border-border">
        <div className="flex items-end gap-2.5 bg-secondary rounded-xl px-4 py-3">
          <input
            ref={fileRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFile}
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mb-0.5"
          >
            <Icon name="Paperclip" size={16} />
          </button>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="Сообщение..."
            rows={1}
            className="flex-1 bg-transparent text-sm resize-none outline-none placeholder:text-muted-foreground leading-relaxed max-h-32"
            style={{ fieldSizing: 'content' } as React.CSSProperties}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() && attachments.length === 0}
            className="shrink-0 mb-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
          >
            <Icon name="Send" size={16} />
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">Enter — отправить · Shift+Enter — перенос строки</p>
      </div>
    </div>
  );
}
