import { ToastContainerProps } from 'react-toastify';

// Toast container configuration
export const toastConfig: ToastContainerProps = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: 'light',
  limit: 5,
};

// Custom toast styles
export const customToastStyles = {
  success: {
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
  },
  error: {
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: 'white',
  },
  warning: {
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: 'white',
  },
  info: {
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    color: 'white',
  },
};