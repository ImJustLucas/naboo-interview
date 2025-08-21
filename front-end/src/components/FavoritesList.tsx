import { useState, useEffect } from "react";
import { Grid, Text, Stack } from "@mantine/core";

import {
  DndContext,
  useSensor,
  KeyboardSensor,
  useSensors,
  PointerSensor,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useReorderFavorites } from "@/hooks/favorite.hook";
import { SortableFavorite } from "./sortable-favorite";
import { DragPreview } from "./sortable-favorite/drag-preview";

function FavoritesListClient() {
  const { loading, localFavorites, handleDragStart, handleDragEnd, activeActivity } = useReorderFavorites();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (loading) {
    return <Text>loading...</Text>;
  }

  if (!localFavorites.length) {
    return null;
  }

  return (
    <Stack spacing="md">
      <Text size="lg" weight={600}>
        Mes favoris ({localFavorites.length})
      </Text>

      <Grid>
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={localFavorites.map((activity) => activity.id)}
          >
            {localFavorites.map((activity) => (
              <Grid.Col key={activity.id} span={4}>
                <SortableFavorite activity={activity} />
              </Grid.Col>
            ))}
          </SortableContext>
          <DragOverlay>
            {activeActivity ? <DragPreview activity={activeActivity} /> : null}
          </DragOverlay>
        </DndContext>
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
