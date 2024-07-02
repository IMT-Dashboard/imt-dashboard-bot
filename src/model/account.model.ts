import { NotificationHistory } from './notification.model';

export interface Account {
  username: string;
  allowPublish: boolean;
  scheduleId: string;
  promotion: string | null;
  lastUpdated: Date;
  email: string | null;
  isNotification: boolean;
  discordId: string | null;
  notifications: NotificationHistory[];
  theme: Theme;
}

export type Theme = 'light' | 'dark' | 'system';
