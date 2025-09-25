export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'default';

export interface NotificationOptions {
  autoClose?: number | false;
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  theme?: 'light' | 'dark' | 'colored';
}

export interface CustomNotification {
  id?: string | number;
  message: string;
  type: NotificationType;
  options?: NotificationOptions;
}