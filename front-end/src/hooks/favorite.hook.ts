import { ActivityFragment, UserFavoriteWithActivity } from "@/graphql/generated/types";
import RemoveFromFavorites from "@/graphql/mutations/favorite/removeFromFavorites";
import ReorderFavorites from "@/graphql/mutations/favorite/reorderFavorites";
import GetUserFavorites from "@/graphql/queries/favorite/getUserFavorites";
import { useMutation, useQuery } from "@apollo/client";
import { useSnackbar } from "./useSnackbar";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

export const useRemoveFromFavorites = () => {
  const { success, error } = useSnackbar();
  const [localFavorites, setLocalFavorites] = useState<ActivityFragment[]>([]);

  const { data, loading } = useQuery(GetUserFavorites, {
    onCompleted: (data) => {
      setLocalFavorites(data.getUserFavorites || []);
    },
    fetchPolicy: "cache-and-network",
  });

  const [removeFromFavorites] = useMutation(RemoveFromFavorites, {
    update(cache, _, { variables }) {
      if (variables) {
        const removedActivityId = variables.input.activityId;

        setLocalFavorites((prev) =>
          prev.filter((activity) => activity.id !== removedActivityId)
        );

        const existingFavorites: any = cache.readQuery({
          query: GetUserFavorites,
        });

        if (existingFavorites) {
          cache.writeQuery({
            query: GetUserFavorites,
            data: {
              getUserFavorites: existingFavorites.getUserFavorites.filter(
                (activity: ActivityFragment) =>
                  activity.id !== removedActivityId
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

  return { removeFromFavorites, localFavorites, loading, data };
};

export const useReorderFavorites = () => {
  const { success, error } = useSnackbar();
  const [localFavorites, setLocalFavorites] = useState<ActivityFragment[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { data, loading } = useQuery(GetUserFavorites, {
    onCompleted: (data) => {
      // Extraire les activities depuis UserFavoriteWithActivity (déjà triées par order)
      const activities = data.getUserFavorites?.map((favorite: UserFavoriteWithActivity) => 
        favorite.activity
      ) || [];
      setLocalFavorites(activities);
    },
    fetchPolicy: "cache-and-network",
  });

  const [reorderFavorites] = useMutation(ReorderFavorites, {
    onCompleted: () => {
      success("Ordre des favoris mis à jour");
    },
    onError: (err: any) => {
      error(`Erreur lors du réordonnancement: ${err.message}`);
      // Rollback en rechargeant les données
      if (data?.getUserFavorites) {
        const activities = data.getUserFavorites.map((favorite: UserFavoriteWithActivity) => 
          favorite.activity
        );
        setLocalFavorites(activities);
      }
    },
  });

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveId(null);

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = localFavorites.findIndex((item) => item.id === active.id);
    const newIndex = localFavorites.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    // Mise à jour optimiste
    const reorderedFavorites = arrayMove(localFavorites, oldIndex, newIndex);
    setLocalFavorites(reorderedFavorites);

    // Mutation backend
    try {
      await reorderFavorites({
        variables: {
          input: {
            activityIds: reorderedFavorites.map((item) => item.id),
          },
        },
      });
    } catch (err) {
      // L'erreur est gérée par onError du useMutation
      console.error("Erreur reorder:", err);
    }
  };

  const activeActivity = activeId ? localFavorites.find(activity => activity.id === activeId) : null;

  return {
    localFavorites,
    loading,
    data,
    handleDragStart,
    handleDragEnd,
    activeActivity,
  };
};
