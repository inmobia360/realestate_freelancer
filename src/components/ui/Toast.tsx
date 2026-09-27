'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  id?: string;
  type?: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'success',
  message,
  duration = 3500,
  onClose
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const bgStyles = {
    success: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100',
    error: 'bg-rose-950/90 border-rose-500/50 text-rose-100',
    info: 'bg-orange-950/90 border-orange-500/50 text-orange-100'
  }[type];

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-orange-700 shrink-0" />
  }[type];

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 ${bgStyles}`}>
      {icons}
      <span className="text-sm font-medium pr-2">{message}</span>
      <button 
        onClick={() => { setVisible(false); if (onClose) onClose(); }}
        className="opacity-70 hover:opacity-100 p-0.5 rounded transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
