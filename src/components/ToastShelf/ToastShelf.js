import React from "react";

import { ToastContext } from "../ToastProvider";
import Toast from "../Toast";

import styles from "./ToastShelf.module.css";

function ToastShelf() {
  const { toasts, resetToasts } = React.useContext(ToastContext);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== "Escape") {
        return;
      }

      resetToasts();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [resetToasts]);

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toasts.map((toast) => (
        <li key={toast.id} className={styles.toastWrapper}>
          <Toast variant={toast.variant} onClose={toast.onClose}>
            {toast.message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
