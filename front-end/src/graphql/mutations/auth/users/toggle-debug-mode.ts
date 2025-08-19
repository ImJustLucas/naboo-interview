import gql from "graphql-tag";

const ToggleDebugMode = gql`
  mutation ToggleDebugMode {
    toggleDebugMode {
      id
      debugModeEnabled
    }
  }
`;

export default ToggleDebugMode;
