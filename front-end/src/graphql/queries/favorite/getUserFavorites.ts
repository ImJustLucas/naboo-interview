import gql from "graphql-tag";
import ActivityFragment from "@/graphql/fragments/activity";

const GetUserFavorites = gql`
  query GetUserFavorites {
    getUserFavorites {
      id
      order
      createdAt
      activity {
        ...Activity
      }
    }
  }
  ${ActivityFragment}
`;

export default GetUserFavorites;