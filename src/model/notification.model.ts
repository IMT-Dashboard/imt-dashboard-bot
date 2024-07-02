export interface NotificationType {
  username: string;
  email: string;
  semester: string;
  subjects: string[];
}

export interface NotificationHistory {
  semester: string;
  subject: string;
  date: Date;
}
