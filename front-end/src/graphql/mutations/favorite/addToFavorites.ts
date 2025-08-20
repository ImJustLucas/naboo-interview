import gql from "graphql-tag";
import UserFavoriteFragment from "@/graphql/fragments/userFavorite";

const AddToFavorites = gql`
  mutation AddToFavorites($input: AddToFavoritesInput!) {
    addToFavorites(input: $input) {
      ...UserFavorite
    }
  }
  ${UserFavoriteFragment}
`;

export default AddToFavorites;