import { useState } from "react";
import { ActionIcon } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useMutation, useQuery } from "@apollo/client";
import { useAuth, useSnackbar } from "@/hooks";
import AddToFavorites from "@/graphql/mutations/favorite/addToFavorites";
import RemoveFromFavorites from "@/graphql/mutations/favorite/removeFromFavorites";
import IsFavorite from "@/graphql/queries/favorite/isFavorite";
import GetUserFavorites from "@/graphql/queries/favorite/getUserFavorites";

interface FavoriteButtonProps {
  activityId: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function FavoriteButton({
  activityId,
  size = "sm",
}: FavoriteButtonProps) {
  const { user } = useAuth();
  const { success, error } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const { data: favoriteData } = useQuery(IsFavorite, {
    variables: { activityId },
    skip: !user,
    fetchPolicy: "cache-and-network",
  });

  const [addToFavorites] = useMutation(AddToFavorites, {
    update(cache) {
      cache.writeQuery({
        query: IsFavorite,
        variables: { activityId },
        data: { isFavorite: true },
      });

      cache.evict({ fieldName: "getUserFavorites" });
      cache.gc();
    },
    onCompleted: () => {
      success("Activité ajoutée aux favoris");
      setIsLoading(false);
    },
    onError: (err) => {
      error(`Erreur: ${err.message}`);
      setIsLoading(false);
    },
  });

  const [removeFromFavorites] = useMutation(RemoveFromFavorites, {
    update(cache) {
      cache.writeQuery({
        query: IsFavorite,
        variables: { activityId },
        data: { isFavorite: false },
      });

      cache.evict({ fieldName: "getUserFavorites" });
      cache.gc();
    },
    onCompleted: () => {
      success("Activité retirée des favoris");
      setIsLoading(false);
    },
    onError: (err) => {
      error(`Erreur: ${err.message}`);
      setIsLoading(false);
    },
  });

  const handleToggleFavorite = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      if (favoriteData?.isFavorite) {
        await removeFromFavorites({
          variables: { input: { activityId } },
        });
      } else {
        await addToFavorites({
          variables: { input: { activityId } },
        });
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <ActionIcon
      size={size}
      variant="subtle"
      color={favoriteData?.isFavorite ? "red" : "gray"}
      loading={isLoading}
      onClick={handleToggleFavorite}
    >
      {favoriteData?.isFavorite ? (
        <IconHeartFilled size="1rem" />
      ) : (
        <IconHeart size="1rem" />
      )}
    </ActionIcon>
  );
}
