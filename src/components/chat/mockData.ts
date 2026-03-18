import { ChatMessage, ChatUser } from './types';

const AVATARS = ['🦊', '🐺', '🦁', '🐯', '🐻', '🦝', '🐼', '🦨', '🦦', '🐸', '🦋', '🐙'];
const COLORS = ['#2d2d2d', '#4a4a4a', '#6b6b6b', '#8a8a8a'];
const NICKS = ['Странник', 'Тёмный_лис', 'Безымянный', 'Тихий', 'Номад', 'Эхо', 'Сумрак', 'Призрак'];

export const generateId = () => Math.random().toString(36).slice(2, 10);

export const pickRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const defaultProfile = {
  nickname: 'Анон_' + Math.floor(Math.random() * 9999),
  avatar: pickRandom(AVATARS),
  color: pickRandom(COLORS),
  joinedAt: new Date(),
};

export const AVATAR_OPTIONS = AVATARS;
export const COLOR_OPTIONS = ['#1a1a1a', '#2d4a3e', '#1e2d4a', '#4a1e2d', '#3a3a1e', '#2a1e4a'];

export const mockUsers: ChatUser[] = [
  { id: 'u1', nickname: 'Странник', avatar: '🦊', color: '#2d2d2d', isOnline: true, isBlocked: false, messageCount: 42, joinedAt: new Date(Date.now() - 3600000 * 5) },
  { id: 'u2', nickname: 'Тёмный_лис', avatar: '🐺', color: '#4a4a4a', isOnline: true, isBlocked: false, messageCount: 17, joinedAt: new Date(Date.now() - 3600000 * 2) },
  { id: 'u3', nickname: 'Безымянный', avatar: '🦋', color: '#6b6b6b', isOnline: false, isBlocked: false, messageCount: 8, joinedAt: new Date(Date.now() - 3600000 * 12) },
  { id: 'u4', nickname: 'Спамер_999', avatar: '🐸', color: '#8a8a8a', isOnline: true, isBlocked: true, messageCount: 103, joinedAt: new Date(Date.now() - 3600000 * 1) },
  { id: 'u5', nickname: 'Номад', avatar: '🐙', color: '#2d2d2d', isOnline: false, isBlocked: false, messageCount: 31, joinedAt: new Date(Date.now() - 3600000 * 8) },
];

export const mockMessages: ChatMessage[] = [
  {
    id: 'm1', senderId: 'u1', senderNick: 'Странник', senderAvatar: '🦊', senderColor: '#2d2d2d',
    text: 'Всем привет! Новый анонимный чат — интересно посмотреть как тут всё устроено.',
    timestamp: new Date(Date.now() - 60000 * 30), isMine: false,
  },
  {
    id: 'm2', senderId: 'u2', senderNick: 'Тёмный_лис', senderAvatar: '🐺', senderColor: '#4a4a4a',
    text: 'Привет. Ник можно поменять в профиле. Аватар тоже.',
    timestamp: new Date(Date.now() - 60000 * 28), isMine: false,
  },
  {
    id: 'm3', senderId: 'u4', senderNick: 'Спамер_999', senderAvatar: '🐸', senderColor: '#8a8a8a',
    text: 'КУПИ КУПИ КУПИ ДЁШЕВО!!! ПЕРЕХОДИ ПО ССЫЛКЕ http://spam.ru ВЫГОДА 100%!!!',
    timestamp: new Date(Date.now() - 60000 * 25), isMine: false, isSpam: true,
  },
  {
    id: 'm4', senderId: 'u3', senderNick: 'Безымянный', senderAvatar: '🦋', senderColor: '#6b6b6b',
    text: 'Можно файлы прикреплять? Удобно.',
    timestamp: new Date(Date.now() - 60000 * 20), isMine: false,
  },
  {
    id: 'm5', senderId: 'u5', senderNick: 'Номад', senderAvatar: '🐙', senderColor: '#2d2d2d',
    text: 'Да, скрепка внизу. Поддерживаются картинки и документы.',
    timestamp: new Date(Date.now() - 60000 * 18), isMine: false,
    attachments: [{ name: 'инструкция.pdf', size: 248000, type: 'application/pdf', url: '#' }],
  },
];

export const formatTime = (d: Date) =>
  d.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

export const formatDate = (d: Date) =>
  d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

export const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' Б';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' КБ';
  return (bytes / (1024 * 1024)).toFixed(1) + ' МБ';
};

const SPAM_PATTERNS = [
  /купи|скидк|акци|распродаж/i,
  /http[s]?:\/\//i,
  /([а-яёa-z])\1{4,}/i,
  /(.)\1{5,}/,
];

export const detectSpam = (text: string): boolean => {
  const upperRatio = (text.match(/[А-ЯA-Z]/g) || []).length / text.length;
  if (upperRatio > 0.6 && text.length > 10) return true;
  return SPAM_PATTERNS.some(p => p.test(text));
};
