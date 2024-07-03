export interface Notification {
  username: string;
  discordId: string;
  semester: string;
  subjects: string[];
}

export interface NotificationHistory {
  semester: string;
  subject: string;
  date: Date;
}
