import { useMutation } from "@apollo/client";
import { Switch, Text, Box, Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState } from "react";
import ToggleDebugMode from "@/graphql/mutations/auth/users/toggle-debug-mode";
import GetUser from "@/graphql/queries/auth/getUser";
import { useAuth } from "@/hooks";
import { useSnackbar } from "@/hooks";
import type { ToggleDebugModeMutation } from "@/graphql/generated/types";

interface DebugModeToggleProps {
  className?: string;
}

const DebugModeToggle = ({ className }: DebugModeToggleProps) => {
  const { user } = useAuth();
  const { success, error } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const [toggleDebugMode] = useMutation<ToggleDebugModeMutation>(
    ToggleDebugMode,
    {
      refetchQueries: [{ query: GetUser }],
      onCompleted: (data) => {
        const newStatus = data.toggleDebugMode.debugModeEnabled;
        success(`Mode debug ${newStatus ? "activé" : "désactivé"}`);
        setIsLoading(false);
      },
      onError: (err) => {
        error(`Erreur lors du changement du mode debug: ${err.message}`);
        setIsLoading(false);
      },
    }
  );

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await toggleDebugMode();
    } catch (error) {
      setIsLoading(false);
    }
  };

  // Affiche seulement si l'utilisateur est admin
  if (user?.role !== "admin") {
    return null;
  }

  return (
    <Box className={className}>
      <Alert
        icon={<IconInfoCircle size="1rem" />}
        color="blue"
        variant="light"
        mb="md"
      >
        Le mode debug permet d&apos;afficher des informations supplémentaires
        pour le développement.
      </Alert>

      <Switch
        checked={user?.debugModeEnabled || false}
        onChange={handleToggle}
        disabled={isLoading}
        label={
          <Text size="sm" fw={500}>
            Mode debug
          </Text>
        }
        description="Activer les informations de débogage"
        size="md"
      />
    </Box>
  );
};

export default DebugModeToggle;
