import React from "react";
import RepositoryList, { REPOSITORY_FRAGMENT } from "../Repository";
import Loading from "../Loading";
import ErrorMessage from "../Error";
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query($cursor: String) {
    viewer {
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;
// const Profile = ({ data, loading, error }) => {
//   if (error) {
//     return <ErrorMessage error={error} />;
//   }
//   const { viewer } = data;
//   if (loading || !viewer) {
//     return <Loading />;
//   }
//   return <RepositoryList repositories={viewer.repositories} />;
// };
const Profile = () => (
  <Query
    query={GET_REPOSITORIES_OF_CURRENT_USER}
    notifyOnNetworkStatusChange={true}
  >
    {({ data, loading, error, fetchMore }) => {
      console.log(data, "data.......");
      console.log(loading, "loadinng.......");
      if (error) {
        return <ErrorMessage error={error} />;
      }
      if (loading && !data) {
        return <Loading />;
      }
      return (
        <RepositoryList
          loading={loading}
          repositories={data.viewer.repositories}
          fetchMore={fetchMore}
        />
      );
    }}
  </Query>
);
export default Profile;

// export default graphql(GET_REPOSITORIES_OF_CURRENT_USER)(Profile);
