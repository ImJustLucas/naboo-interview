import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ActivityFragment } from "@/graphql/generated/types";
import { Box } from "@mantine/core";
import { UIFavorite } from "./ui-favorite";

export const SortableFavorite: React.FC<{
  activity: ActivityFragment;
}> = ({ activity }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "grab",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Box
      pos="relative"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <UIFavorite activity={activity} />
    </Box>
  );
};
