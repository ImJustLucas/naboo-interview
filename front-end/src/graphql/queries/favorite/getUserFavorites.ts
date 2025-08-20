import gql from "graphql-tag";
import ActivityFragment from "@/graphql/fragments/activity";

const GetUserFavorites = gql`
  query GetUserFavorites {
    getUserFavorites {
      ...Activity
    }
  }
  ${ActivityFragment}
`;

export default GetUserFavorites;