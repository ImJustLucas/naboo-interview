import { PageTitle, DebugModeToggle, FavoritesList } from "@/components";
import { withAuth } from "@/hocs";
import { useAuth } from "@/hooks";
import { Avatar, Flex, Text, Divider } from "@mantine/core";
import Head from "next/head";

const Profile = () => {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>Mon profil | CDTR</title>
      </Head>
      <PageTitle title="Mon profil" />
      <Flex align="center" gap="md" mb="xl">
        <Avatar color="cyan" radius="xl" size="lg">
          {user?.firstName[0]}
          {user?.lastName[0]}
        </Avatar>
        <Flex direction="column">
          <Text>{user?.email}</Text>
          <Text>{user?.firstName}</Text>
          <Text>{user?.lastName}</Text>
        </Flex>
      </Flex>

      <Divider my="lg" />

      <DebugModeToggle />

      <Divider my="lg" />

      <FavoritesList />
    </>
  );
};

export default withAuth(Profile);
