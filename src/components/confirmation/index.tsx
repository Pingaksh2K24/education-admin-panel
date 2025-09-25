import React from 'react';
import { 
  ExclamationTriangleIcon, 
  TrashIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import Modal from '../modal';
import './style.css';

export type ConfirmationType = 'delete' | 'warning' | 'success' | 'error' | 'info';

interface ConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  type?: ConfirmationType;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'delete':
        return <TrashIcon className="confirmation-icon delete" />;
      case 'success':
        return <CheckCircleIcon className="confirmation-icon success" />;
      case 'error':
        return <XCircleIcon className="confirmation-icon error" />;
      case 'info':
        return <InformationCircleIcon className="confirmation-icon info" />;
      default:
        return <ExclamationTriangleIcon className="confirmation-icon warning" />;
    }
  };

  const getConfirmButtonClass = () => {
    switch (type) {
      case 'delete':
        return 'btn-confirm delete';
      case 'success':
        return 'btn-confirm success';
      case 'error':
        return 'btn-confirm error';
      case 'info':
        return 'btn-confirm info';
      default:
        return 'btn-confirm warning';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="small"
      showCloseButton={false}
    >
      <div className="confirmation-dialog">
        <div className="confirmation-header">
          {getIcon()}
          <h3 className="confirmation-title">{title}</h3>
        </div>
        
        <div className="confirmation-body">
          <p className="confirmation-message">{message}</p>
        </div>
        
        <div className="confirmation-actions">
          <button 
            className="btn-cancel" 
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button 
            className={getConfirmButtonClass()} 
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Confirmation;