export type TabType = 'chat' | 'friends' | 'profile';
export type ChatSubTab = 'posts' | 'group' | 'private';

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  email: string;
  allowFriendRequests: boolean;
  studentId?: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  hasLiked?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
}

export interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}
