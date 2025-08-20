import { ActivityFragment } from "@/graphql/generated/types";
import { useAuth } from "@/hooks";
import { useGlobalStyles } from "@/utils";
import { Badge, Button, Card, Grid, Group, Image, Text } from "@mantine/core";
import Link from "next/link";
import { FavoriteButton } from "./FavoriteButton";

interface ActivityProps {
  activity: ActivityFragment;
}

export function ActivityCard({ activity }: ActivityProps) {
  const { classes } = useGlobalStyles();
  const { user } = useAuth();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://dummyimage.com/480x4:3"
          height={160}
          alt="random image of city"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} className={classes.ellipsis}>
          {activity.name}
        </Text>
        <FavoriteButton activityId={activity.id} />
      </Group>

      <Group mt="md" mb="xs">
        <Badge color="pink" variant="light">
          {activity.city}
        </Badge>
        <Badge color="yellow" variant="light">
          {`${activity.price}€/j`}
        </Badge>
        {user?.role === "admin" &&
          user?.debugModeEnabled &&
          activity.createdAt && (
            <Badge color="indigo" variant="light" size="xs">
              Créé le {formatDate(activity.createdAt)}
            </Badge>
          )}
      </Group>

      <Text size="sm" color="dimmed" className={classes.ellipsis}>
        {activity.description}
      </Text>

      <Link href={`/activities/${activity.id}`} className={classes.link}>
        <Button variant="light" color="blue" fullWidth mt="md" radius="md">
          Voir plus
        </Button>
      </Link>
    </Card>
  );
}

export function Activity({ activity }: ActivityProps) {
  return (
    <Grid.Col span={4}>
      <ActivityCard activity={activity} />
    </Grid.Col>
  );
}
