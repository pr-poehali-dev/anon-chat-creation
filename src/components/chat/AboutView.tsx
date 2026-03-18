import Icon from '@/components/ui/icon';

export default function AboutView() {
  const features = [
    { icon: 'UserX', title: 'Полная анонимность', desc: 'Никаких регистраций и личных данных. Только ник и аватар по желанию.' },
    { icon: 'ShieldCheck', title: 'Защита от спама', desc: 'Автоматическое определение спама и нежелательного контента по нескольким алгоритмам.' },
    { icon: 'Paperclip', title: 'Файлы и вложения', desc: 'Отправляйте изображения, документы и другие файлы прямо в чат.' },
    { icon: 'Users', title: 'Управление участниками', desc: 'Блокировка нарушителей и просмотр активности пользователей.' },
    { icon: 'History', title: 'История сообщений', desc: 'Поиск по своим сообщениям и просмотр истории переписки.' },
    { icon: 'SlidersHorizontal', title: 'Гибкие настройки', desc: 'Уведомления, звуки, фильтры и режимы отображения под ваши предпочтения.' },
  ];

  const rules = [
    'Не публикуйте личные данные других людей',
    'Запрещён спам, реклама и флуд',
    'Уважайте других участников чата',
    'Запрещён вредоносный контент и ссылки',
    'Нарушители блокируются без предупреждения',
  ];

  return (
    <div className="p-6 max-w-md mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">💬</span>
          <h1 className="font-semibold text-lg">Анонимный чат</h1>
        </div>
        <p className="text-xs text-muted-foreground font-mono-chat">версия 1.0.0</p>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        Пространство для открытого общения без регистрации и слежки.
        Создайте ник, выберите аватар и начните разговор прямо сейчас.
      </p>

      <div>
        <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Возможности</h3>
        <div className="space-y-3">
          {features.map((f, i) => (
            <div key={i} className="flex gap-3 items-start p-3 rounded-xl hover:bg-secondary/60 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                <Icon name={f.icon} size={14} className="text-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">{f.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-4">Правила чата</h3>
        <div className="space-y-2">
          {rules.map((rule, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-xs font-mono-chat text-muted-foreground shrink-0 mt-0.5">{String(i + 1).padStart(2, '0')}</span>
              <p className="text-sm">{rule}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <p className="text-xs text-muted-foreground text-center leading-relaxed">
          Анонимный чат · Все данные хранятся локально
        </p>
      </div>
    </div>
  );
}
