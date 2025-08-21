import { Group, ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { ActivityCard } from "../Activity";
import { ActivityFragment } from "@/graphql/generated/types";
import { useRemoveFromFavorites } from "@/hooks/favorite.hook";
import { useSnackbar } from "@/hooks";

export const UIFavorite: React.FC<{
  activity: ActivityFragment;
}> = ({ activity }) => {
  const { error } = useSnackbar();

  const { removeFromFavorites } = useRemoveFromFavorites();

  const handleRemoveFavorite = async (activityId: string) => {
    try {
      await removeFromFavorites({
        variables: { input: { activityId } },
      });
    } catch (err: any) {
      error(`Erreur lors de la suppression: ${err.message}`);
    }
  };

  return (
    <>
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
    </>
  );
};
