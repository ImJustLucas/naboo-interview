import { ActivityCard } from "../Activity";
import { ActivityFragment } from "@/graphql/generated/types";

export const DragPreview: React.FC<{
  activity: ActivityFragment;
}> = ({ activity }) => {
  return (
    <div style={{ transform: "rotate(5deg)", opacity: 0.8 }}>
      <ActivityCard activity={activity} />
    </div>
  );
};