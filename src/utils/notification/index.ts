import React from 'react';
import { toast, ToastOptions } from 'react-toastify';

// Default toast configuration
const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// Notification utility functions
export const notification = {
  // Success notification
  success: (message: string, options?: ToastOptions) => {
    toast.success(message, { ...defaultOptions, ...options });
  },

  // Error notification
  error: (message: string, options?: ToastOptions) => {
    toast.error(message, { ...defaultOptions, ...options });
  },

  // Warning notification
  warning: (message: string, options?: ToastOptions) => {
    toast.warning(message, { ...defaultOptions, ...options });
  },

  // Info notification
  info: (message: string, options?: ToastOptions) => {
    toast.info(message, { ...defaultOptions, ...options });
  },

  // Default notification
  default: (message: string, options?: ToastOptions) => {
    toast(message, { ...defaultOptions, ...options });
  },

  // Dismiss all notifications
  dismiss: () => {
    toast.dismiss();
  },

  // Dismiss specific notification by id
  dismissById: (id: string | number) => {
    toast.dismiss(id);
  }
};

export default notification;

// Enhanced notification with custom styling
export const showNotification = {
  success: (title: string, message?: string) => {
    toast.success(
      React.createElement('div', { className: 'toast-content' },
        React.createElement('div', { className: 'toast-title' }, title),
        message && React.createElement('div', { className: 'toast-message' }, message)
      ),
      defaultOptions
    );
  },
  
  error: (title: string, message?: string) => {
    toast.error(
      React.createElement('div', { className: 'toast-content' },
        React.createElement('div', { className: 'toast-title' }, title),
        message && React.createElement('div', { className: 'toast-message' }, message)
      ),
      defaultOptions
    );
  },
  
  warning: (title: string, message?: string) => {
    toast.warning(
      React.createElement('div', { className: 'toast-content' },
        React.createElement('div', { className: 'toast-title' }, title),
        message && React.createElement('div', { className: 'toast-message' }, message)
      ),
      defaultOptions
    );
  },
  
  info: (title: string, message?: string) => {
    toast.info(
      React.createElement('div', { className: 'toast-content' },
        React.createElement('div', { className: 'toast-title' }, title),
        message && React.createElement('div', { className: 'toast-message' }, message)
      ),
      defaultOptions
    );
  }
};