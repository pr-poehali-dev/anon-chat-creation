import { useState } from 'react';
import { mockUsers } from './mockData';
import { ChatUser } from './types';
import Icon from '@/components/ui/icon';

export default function UsersView() {
  const [users, setUsers] = useState<ChatUser[]>(mockUsers);
  const [filter, setFilter] = useState<'all' | 'online' | 'blocked'>('all');

  const toggleBlock = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isBlocked: !u.isBlocked } : u));
  };

  const filtered = users.filter(u => {
    if (filter === 'online') return u.isOnline && !u.isBlocked;
    if (filter === 'blocked') return u.isBlocked;
    return true;
  });

  const onlineCount = users.filter(u => u.isOnline && !u.isBlocked).length;
  const blockedCount = users.filter(u => u.isBlocked).length;

  const formatJoin = (d: Date) => {
    const h = Math.round((Date.now() - d.getTime()) / 3600000);
    if (h < 1) return 'только что';
    if (h < 24) return `${h}ч назад`;
    return `${Math.round(h / 24)}д назад`;
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="px-6 py-5 border-b border-border">
        <h2 className="font-semibold text-sm tracking-widest uppercase text-muted-foreground mb-4">Пользователи</h2>
        <div className="flex gap-1.5">
          {([
            { key: 'all', label: `Все (${users.length})` },
            { key: 'online', label: `Онлайн (${onlineCount})` },
            { key: 'blocked', label: `Заблокированы (${blockedCount})` },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${filter === tab.key ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-accent text-muted-foreground'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filtered.map(user => (
          <div key={user.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${user.isBlocked ? 'border-destructive/20 bg-destructive/5' : 'border-transparent hover:bg-secondary/60'}`}>
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-secondary">
                {user.avatar}
              </div>
              {!user.isBlocked && (
                <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background ${user.isOnline ? 'bg-green-500' : 'bg-border'}`} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm truncate">{user.nickname}</span>
                {user.isBlocked && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/15 text-destructive font-medium shrink-0">заблок.</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-muted-foreground">{user.messageCount} сообщ.</span>
                <span className="text-muted-foreground/30">·</span>
                <span className="text-xs text-muted-foreground">вошёл {formatJoin(user.joinedAt)}</span>
              </div>
            </div>

            <button
              onClick={() => toggleBlock(user.id)}
              title={user.isBlocked ? 'Разблокировать' : 'Заблокировать'}
              className={`p-2 rounded-lg transition-colors shrink-0 ${user.isBlocked ? 'text-destructive hover:bg-destructive/10' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
            >
              <Icon name={user.isBlocked ? 'UserCheck' : 'UserMinus'} size={14} />
            </button>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <span className="text-3xl mb-2">👤</span>
            <p className="text-sm text-muted-foreground">Нет пользователей</p>
          </div>
        )}
      </div>

      <div className="px-6 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          {blockedCount > 0 && `${blockedCount} заблокировано · `}{onlineCount} онлайн из {users.length}
        </p>
      </div>
    </div>
  );
}
