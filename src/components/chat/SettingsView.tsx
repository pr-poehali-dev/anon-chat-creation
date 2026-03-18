import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface Settings {
  notifications: boolean;
  sound: boolean;
  spamFilter: boolean;
  showSpamWarning: boolean;
  autoBlock: boolean;
  compactMode: boolean;
  enterToSend: boolean;
  theme: 'light' | 'system';
}

export default function SettingsView() {
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    sound: false,
    spamFilter: true,
    showSpamWarning: true,
    autoBlock: false,
    compactMode: false,
    enterToSend: true,
    theme: 'light',
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof Settings) => {
    setSettings(s => ({ ...s, [key]: !s[key] }));
  };

  const saveAll = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  type ToggleKey = 'notifications' | 'sound' | 'spamFilter' | 'showSpamWarning' | 'autoBlock' | 'compactMode' | 'enterToSend';

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div>
      <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );

  const Row = ({ label, desc, settingKey }: { label: string; desc?: string; settingKey: ToggleKey }) => (
    <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-secondary/60 transition-colors">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {desc && <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={() => toggle(settingKey)}
        className={`w-10 h-5 rounded-full transition-all relative ${settings[settingKey] ? 'bg-primary' : 'bg-border'}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${settings[settingKey] ? 'left-5' : 'left-0.5'}`} />
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-md mx-auto space-y-8 animate-fade-in">
      <h2 className="font-semibold text-sm tracking-widest uppercase text-muted-foreground">Настройки</h2>

      <Section title="Уведомления">
        <Row label="Push-уведомления" desc="Получать уведомления о новых сообщениях" settingKey="notifications" />
        <Row label="Звуки" desc="Звук при получении сообщения" settingKey="sound" />
      </Section>

      <Section title="Модерация и безопасность">
        <Row label="Фильтр спама" desc="Автоматически помечать подозрительные сообщения" settingKey="spamFilter" />
        <Row label="Предупреждение о спаме" desc="Показывать метку на сомнительных сообщениях" settingKey="showSpamWarning" />
        <Row label="Автоблокировка" desc="Блокировать пользователей после 3 спам-сообщений" settingKey="autoBlock" />
      </Section>

      <Section title="Интерфейс">
        <Row label="Компактный режим" desc="Уменьшить отступы для отображения большего количества сообщений" settingKey="compactMode" />
        <Row label="Enter для отправки" desc="Отправлять сообщение по нажатию Enter" settingKey="enterToSend" />
      </Section>

      <div>
        <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-3">Опасная зона</h3>
        <button className="w-full flex items-center gap-2 py-3 px-4 rounded-xl border border-destructive/30 text-destructive text-sm hover:bg-destructive/5 transition-colors">
          <Icon name="Trash2" size={14} />
          Очистить историю чата
        </button>
      </div>

      <button
        onClick={saveAll}
        className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-xl py-3 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        {saved ? <><Icon name="Check" size={15} /> Сохранено</> : <><Icon name="Settings" size={15} /> Применить настройки</>}
      </button>
    </div>
  );
}
