import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "../components/common/Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
    key: new Date().getTime(),
  });

  const showToast = useCallback((message, severity = "success") => {
    setToast({ open: true, message, severity, key: new Date().getTime() });
  }, []);

  const closeToast = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        open={toast.open}
        onClose={closeToast}
        message={toast.message}
        severity={toast.severity}
        key={toast.key}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context.showToast;
};
