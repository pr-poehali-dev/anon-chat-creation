export type TabId = 'chat' | 'profile' | 'settings' | 'history' | 'users' | 'about';

export interface UserProfile {
  nickname: string;
  avatar: string;
  color: string;
  joinedAt: Date;
}

export interface Attachment {
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderNick: string;
  senderAvatar: string;
  senderColor: string;
  text: string;
  timestamp: Date;
  attachments?: Attachment[];
  isSpam?: boolean;
  isBlocked?: boolean;
  isMine?: boolean;
}

export interface ChatUser {
  id: string;
  nickname: string;
  avatar: string;
  color: string;
  isOnline: boolean;
  isBlocked: boolean;
  messageCount: number;
  joinedAt: Date;
}
