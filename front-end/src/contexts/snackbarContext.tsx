import { Notification } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import { createContext, useEffect, useState } from "react";

interface SnackbarContextType {
  error: (message: string) => void;
  success: (message: string) => void;
}

interface Snackbar {
  message: string;
  type: "error" | "success";
}

export const SnackbarContext = createContext<SnackbarContextType>({
  error: () => {},
  success: () => {},
});

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [snackbar, setSnackbar] = useState<Snackbar | null>(null);

  const error = (message: string) => {
    console.error(message);
    setSnackbar({ message, type: "error" });
  };

  const success = (message: string) => {
    setSnackbar({ message, type: "success" });
  };

  useEffect(() => {
    if (snackbar) {
      setTimeout(() => {
        setSnackbar(null);
      }, 4000); // Augmente de 1s à 4s
    }
  }, [snackbar]);

  return (
    <SnackbarContext.Provider value={{ success, error }}>
      {children}
      {snackbar && (
        <Notification
          icon={snackbar.type === "success" ? <IconCheck size="1.1rem" /> : <IconX size="1.1rem" />}
          color={snackbar.type === "error" ? "red" : "green"}
          style={{ 
            position: "fixed", 
            right: 16, 
            bottom: 16, 
            zIndex: 999,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(8px)"
          }}
        >
          {snackbar.message}
        </Notification>
      )}
    </SnackbarContext.Provider>
  );
};
