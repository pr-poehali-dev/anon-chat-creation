import { useState } from 'react';
import { UserProfile } from './types';
import { AVATAR_OPTIONS, COLOR_OPTIONS, formatDate } from './mockData';
import Icon from '@/components/ui/icon';

interface Props {
  profile: UserProfile;
  onUpdate: (p: UserProfile) => void;
}

export default function ProfileView({ profile, onUpdate }: Props) {
  const [nick, setNick] = useState(profile.nickname);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [color, setColor] = useState(profile.color);
  const [saved, setSaved] = useState(false);

  const save = () => {
    onUpdate({ ...profile, nickname: nick.trim() || profile.nickname, avatar, color });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-8 animate-fade-in">
      <div>
        <h2 className="font-semibold text-sm tracking-widest uppercase text-muted-foreground mb-6">Мой профиль</h2>

        {/* Preview */}
        <div className="flex items-center gap-4 p-4 bg-secondary rounded-xl mb-8">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ background: color + '18', border: `2px solid ${color}30` }}>
            {avatar}
          </div>
          <div>
            <p className="font-semibold">{nick || 'Анонимный'}</p>
            <p className="text-xs text-muted-foreground mt-0.5 font-mono-chat">анонимный · {formatDate(profile.joinedAt)}</p>
          </div>
        </div>

        {/* Nickname */}
        <div className="space-y-2 mb-6">
          <label className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Никнейм</label>
          <div className="relative">
            <input
              value={nick}
              onChange={e => setNick(e.target.value)}
              maxLength={24}
              placeholder="Введите никнейм"
              className="w-full bg-secondary rounded-lg px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-foreground/20 transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono-chat">
              {nick.length}/24
            </span>
          </div>
        </div>

        {/* Avatar */}
        <div className="space-y-3 mb-6">
          <label className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Аватар</label>
          <div className="grid grid-cols-6 gap-2">
            {AVATAR_OPTIONS.map(a => (
              <button
                key={a}
                onClick={() => setAvatar(a)}
                className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${avatar === a ? 'bg-primary text-primary-foreground scale-110' : 'bg-secondary hover:bg-accent'}`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="space-y-3 mb-8">
          <label className="text-xs font-medium tracking-wide uppercase text-muted-foreground">Цвет профиля</label>
          <div className="flex gap-2">
            {COLOR_OPTIONS.map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full transition-all ${color === c ? 'scale-125 ring-2 ring-offset-2 ring-foreground/30' : 'hover:scale-110'}`}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={save}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {saved ? (
            <>
              <Icon name="Check" size={15} />
              Сохранено
            </>
          ) : (
            <>
              <Icon name="Save" size={15} />
              Сохранить изменения
            </>
          )}
        </button>
      </div>

      <div className="border-t border-border pt-6">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Все данные хранятся только на этом устройстве. Ваша личность не раскрывается другим участникам.
        </p>
      </div>
    </div>
  );
}
