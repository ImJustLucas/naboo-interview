import gql from "graphql-tag";
import ActivityFragment from "./activity";

const UserFavoriteFragment = gql`
  fragment UserFavorite on UserFavorite {
    id
    order
    createdAt
    activity {
      ...Activity
    }
  }
  ${ActivityFragment}
`;

export default UserFavoriteFragment;