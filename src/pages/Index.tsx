import { useState } from 'react';
import { TabId, UserProfile } from '@/components/chat/types';
import { defaultProfile } from '@/components/chat/mockData';
import ChatView from '@/components/chat/ChatView';
import ProfileView from '@/components/chat/ProfileView';
import SettingsView from '@/components/chat/SettingsView';
import HistoryView from '@/components/chat/HistoryView';
import UsersView from '@/components/chat/UsersView';
import AboutView from '@/components/chat/AboutView';
import Icon from '@/components/ui/icon';

const NAV: { id: TabId; label: string; icon: string }[] = [
  { id: 'chat', label: 'Чат', icon: 'MessageSquare' },
  { id: 'profile', label: 'Профиль', icon: 'User' },
  { id: 'settings', label: 'Настройки', icon: 'Settings' },
  { id: 'history', label: 'История', icon: 'Clock' },
  { id: 'users', label: 'Участники', icon: 'Users' },
  { id: 'about', label: 'О приложении', icon: 'Info' },
];

export default function Index() {
  const [tab, setTab] = useState<TabId>('chat');
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (tab) {
      case 'chat': return <ChatView profile={profile} />;
      case 'profile': return <ProfileView profile={profile} onUpdate={setProfile} />;
      case 'settings': return <SettingsView />;
      case 'history': return <HistoryView />;
      case 'users': return <UsersView />;
      case 'about': return <AboutView />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-30 md:z-auto
        flex flex-col w-64 h-full bg-background border-r border-border
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="px-5 py-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Icon name="MessageSquare" size={15} />
            </div>
            <div>
              <p className="font-semibold text-sm">Анонимат</p>
              <p className="text-[10px] text-muted-foreground font-mono-chat">anonymous chat</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-secondary">
            <span className="text-lg">{profile.avatar}</span>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate">{profile.nickname}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[10px] text-muted-foreground">онлайн</span>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className={`nav-item w-full ${tab === item.id ? 'active' : ''}`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-border">
          <p className="text-[10px] text-muted-foreground font-mono-chat">v1.0 · анонимно и свободно</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-background">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
          >
            <Icon name="Menu" size={18} />
          </button>
          <span className="font-semibold text-sm">{NAV.find(n => n.id === tab)?.label}</span>
        </div>

        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
