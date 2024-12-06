import React, { createContext, useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Alert, Snackbar, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const ToastContext = createContext(null);

const TOAST_STYLES = {
  success: {
    backgroundColor: '#ffffff',
    color: '#5fb351',
    actionColor: 'rgb(73, 80, 87)'
  },
  error: {
    backgroundColor: '#ffffff',
    color: '#f44336',
    actionColor: 'rgb(73, 80, 87)'
  },
  warning: {
    backgroundColor: '#ffffff',
    color: '#ff9800',
    actionColor: 'rgb(73, 80, 87)'
  },
  info: {
    backgroundColor: '#ffffff',
    color: '#2196f3',
    actionColor: 'rgb(73, 80, 87)'
  }
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const toastsRef = useRef(toasts);

  const getIcon = (severity) => {
    switch (severity) {
      case 'success':
        return <CheckCircleOutlineIcon />;
      case 'error':
        return <ErrorOutlineIcon />;
      case 'info':
        return <InfoOutlinedIcon />;
      case 'warning':
        return <WarningAmberIcon />;
      default:
        return <InfoOutlinedIcon />;
    }
  };

  const showToast = (message, severity = 'success', duration = 3000) => {
    const id = Date.now();
    const newToast = { id, message, severity, duration };
    toastsRef.current.push(newToast);
    setToasts([...toastsRef.current]);
    setTimeout(() => {
      toastsRef.current = toastsRef.current.filter((toast) => toast.id !== id);
      setToasts([...toastsRef.current]);
    }, duration);
  };

  const toast = {
    success: (message, duration) => showToast(message, 'success', duration),
    error: (message, duration) => showToast(message, 'error', duration),
    info: (message, duration) => showToast(message, 'info', duration),
    warning: (message, duration) => showToast(message, 'warning', duration)
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Stack
        spacing={2}
        sx={{
          position: 'fixed',
          top: 40,
          right: 0,
          zIndex: 2000
        }}
      >
        {toasts.map((toast) => (
          <Snackbar
            key={toast.id}
            open={true}
            autoHideDuration={toast.duration}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ position: 'relative', top: 'auto', right: 'auto' }}
          >
            <Alert
              onClose={() => {
                toastsRef.current = toastsRef.current.filter((t) => t.id !== toast.id);
                setToasts([...toastsRef.current]);
              }}
              severity={toast.severity}
              variant='filled'
              icon={getIcon(toast.severity)}
              sx={{
                minWidth: '300px',
                boxShadow: 4,
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...TOAST_STYLES[toast.severity],
                '& .MuiAlert-icon': {
                  fontSize: '24px',
                  color: TOAST_STYLES[toast.severity].color
                },
                '& .MuiAlert-action': {
                  color: TOAST_STYLES[toast.severity].actionColor
                }
              }}
            >
              {toast.message}
            </Alert>
          </Snackbar>
        ))}
      </Stack>
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired
};
