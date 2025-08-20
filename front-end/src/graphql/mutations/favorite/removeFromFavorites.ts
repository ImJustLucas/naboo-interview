import gql from "graphql-tag";

const RemoveFromFavorites = gql`
  mutation RemoveFromFavorites($input: RemoveFromFavoritesInput!) {
    removeFromFavorites(input: $input)
  }
`;

export default RemoveFromFavorites;