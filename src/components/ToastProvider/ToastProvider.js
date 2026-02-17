import React from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const removeToast = React.useCallback(
    (toastId) => {
      setToasts((prev) => prev.filter((t) => t.id !== toastId));
    },
    [setToasts]
  );

  const addToast = React.useCallback(
    ({ message = "", variant = "notice", onClose }) => {
      const newToastId = crypto.randomUUID();

      const newToast = {
        id: newToastId,
        variant,
        message,
        onClose:
          typeof onClose === "function"
            ? onClose
            : () => removeToast(newToastId),
      };

      setToasts((prev) => prev.concat([newToast]));
    },
    [removeToast, setToasts]
  );

  const providerValue = {
    toasts,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={providerValue}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
