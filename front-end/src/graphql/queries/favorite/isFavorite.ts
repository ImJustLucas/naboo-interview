import gql from "graphql-tag";

const IsFavorite = gql`
  query IsFavorite($activityId: ID!) {
    isFavorite(activityId: $activityId)
  }
`;

export default IsFavorite;