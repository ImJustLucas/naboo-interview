import { ActivityFragment } from "@/graphql/generated/types";
import { useAuth } from "@/hooks";
import { useGlobalStyles } from "@/utils";
import { Box, Button, Flex, Image, Text, Badge } from "@mantine/core";
import Link from "next/link";

interface ActivityListItemProps {
  activity: ActivityFragment;
}

export function ActivityListItem({ activity }: ActivityListItemProps) {
  const { classes } = useGlobalStyles();
  const { user } = useAuth();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Flex align="center" justify="space-between">
      <Flex gap="md" align="center">
        <Image
          src="https://dummyimage.com/125"
          radius="md"
          alt="random image of city"
          height="125"
          width="125"
        />
        <Box sx={{ maxWidth: "300px" }}>
          <Text className={classes.ellipsis}>{activity.city}</Text>
          <Text className={classes.ellipsis}>{activity.name}</Text>
          <Text className={classes.ellipsis}>{activity.description}</Text>
          <Text
            weight="bold"
            className={classes.ellipsis}
          >{`${activity.price}€/j`}</Text>
          {user?.debugModeEnabled && activity.createdAt && (
            <Badge color="orange" variant="light" size="xs" mt="xs">
              Créé le {formatDate(activity.createdAt)}
            </Badge>
          )}
        </Box>
      </Flex>
      <Link href={`/activities/${activity.id}`} className={classes.link}>
        <Button variant="outline" color="dark">
          Voir plus
        </Button>
      </Link>
    </Flex>
  );
}
