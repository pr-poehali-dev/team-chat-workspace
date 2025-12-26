export type Message = {
  id: number;
  user: string;
  avatar: string;
  content: string;
  time: string;
  isOwn?: boolean;
};

export type Chat = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
};

export type File = {
  id: number;
  name: string;
  size: string;
  type: string;
  uploadedBy: string;
  time: string;
};

export type Task = {
  id: number;
  title: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
};

export type Contact = {
  id: number;
  name: string;
  role: 'admin' | 'member';
  status: 'online' | 'offline';
  avatar: string;
};

export type TableData = {
  id: number;
  name: string;
  columns: string[];
  rows: string[][];
  createdBy: string;
  createdAt: string;
};

export type TabType = 'chats' | 'files' | 'tasks' | 'contacts' | 'tables' | 'settings';

export type CurrentUser = {
  id: number;
  name: string;
  role: 'admin' | 'member';
};
