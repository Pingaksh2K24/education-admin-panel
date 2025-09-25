export type ConfirmationType = 'delete' | 'warning' | 'success' | 'error' | 'info';

export interface ConfirmationConfig {
  title: string;
  message: string;
  type?: ConfirmationType;
  confirmText?: string;
  cancelText?: string;
}

export interface UseConfirmationReturn {
  showConfirmation: (config: ConfirmationConfig) => Promise<boolean>;
  ConfirmationComponent: React.ComponentType;
}