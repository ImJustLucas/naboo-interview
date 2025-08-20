import { useState, useEffect } from "react";
import { Grid, Text, Stack, ActionIcon, Box, Group } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useMutation, useQuery } from "@apollo/client";
import { ActivityCard } from "./Activity";
import { useSnackbar } from "@/hooks";
import GetUserFavorites from "@/graphql/queries/favorite/getUserFavorites";
import RemoveFromFavorites from "@/graphql/mutations/favorite/removeFromFavorites";
import type { ActivityFragment } from "@/graphql/generated/types";

function FavoritesListClient() {
  const { success, error } = useSnackbar();
  const [localFavorites, setLocalFavorites] = useState<ActivityFragment[]>([]);

  const { data, loading } = useQuery(GetUserFavorites, {
    onCompleted: (data) => {
      setLocalFavorites(data.getUserFavorites || []);
    },
    fetchPolicy: "cache-and-network",
  });

  const [removeFromFavorites] = useMutation(RemoveFromFavorites, {
    update(cache, { data }, { variables }) {
      if (variables) {
        const removedActivityId = variables.input.activityId;
        
        setLocalFavorites(prev => 
          prev.filter(activity => activity.id !== removedActivityId)
        );

        const existingFavorites: any = cache.readQuery({
          query: GetUserFavorites,
        });

        if (existingFavorites) {
          cache.writeQuery({
            query: GetUserFavorites,
            data: {
              getUserFavorites: existingFavorites.getUserFavorites.filter(
                (activity: ActivityFragment) => activity.id !== removedActivityId
              ),
            },
          });
        }
      }
    },
    onCompleted: () => {
      success("Favori supprimé");
    },
    onError: (err: any) => {
      error(`Erreur: ${err.message}`);
      if (data?.getUserFavorites) {
        setLocalFavorites(data.getUserFavorites);
      }
    },
  });

  const handleRemoveFavorite = async (activityId: string) => {
    try {
      await removeFromFavorites({
        variables: { input: { activityId } },
      });
    } catch (err: any) {
      error(`Erreur lors de la suppression: ${err.message}`);
    }
  };

  if (loading) {
    return <Text>Chargement des favoris...</Text>;
  }

  if (!localFavorites.length) {
    return (
      <Text color="dimmed" ta="center" py="xl">
        Aucun favori pour le moment
      </Text>
    );
  }

  return (
    <Stack spacing="md">
      <Text size="lg" weight={600}>
        Mes favoris ({localFavorites.length})
      </Text>
      
      <Grid>
        {localFavorites.map((activity) => (
          <Grid.Col key={activity.id} span={4}>
            <Box pos="relative">
              <Group
                pos="absolute"
                top={8}
                right={8}
                spacing="xs"
                style={{ zIndex: 10 }}
              >
                <ActionIcon
                  size="sm"
                  variant="filled"
                  color="red"
                  onClick={() => handleRemoveFavorite(activity.id)}
                >
                  <IconTrash size="0.8rem" />
                </ActionIcon>
              </Group>
              <ActivityCard activity={activity} />
            </Box>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}

export function FavoritesList() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Stack spacing="md">
        <Text size="lg" weight={600}>
          Mes favoris
        </Text>
        <Text color="dimmed" ta="center" py="xl">
          Chargement...
        </Text>
      </Stack>
    );
  }

  return <FavoritesListClient />;
}