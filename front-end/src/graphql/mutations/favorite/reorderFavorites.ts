import gql from "graphql-tag";

const ReorderFavorites = gql`
  mutation ReorderFavorites($input: ReorderFavoritesInput!) {
    reorderFavorites(input: $input)
  }
`;

export default ReorderFavorites;