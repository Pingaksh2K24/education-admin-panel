import React, { useState, useCallback } from 'react';
import Confirmation from './index';
import { ConfirmationConfig } from './types';

export const useConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmationConfig | null>(null);
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);
  const [loading, setLoading] = useState(false);

  const showConfirmation = useCallback((confirmationConfig: ConfirmationConfig): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfig(confirmationConfig);
      setResolvePromise(() => resolve);
      setIsOpen(true);
    });
  }, []);

  const handleConfirm = useCallback(async () => {
    setLoading(true);
    if (resolvePromise) {
      resolvePromise(true);
    }
    setLoading(false);
    setIsOpen(false);
    setConfig(null);
    setResolvePromise(null);
  }, [resolvePromise]);

  const handleCancel = useCallback(() => {
    if (resolvePromise) {
      resolvePromise(false);
    }
    setIsOpen(false);
    setConfig(null);
    setResolvePromise(null);
  }, [resolvePromise]);

  const ConfirmationComponent = useCallback(() => {
    if (!config) return null;

    return (
      <Confirmation
        isOpen={isOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title={config.title}
        message={config.message}
        type={config.type}
        confirmText={config.confirmText}
        cancelText={config.cancelText}
        loading={loading}
      />
    );
  }, [isOpen, config, handleCancel, handleConfirm, loading]);

  return {
    showConfirmation,
    ConfirmationComponent
  };
};