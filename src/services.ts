import { gql, GraphQLClient } from 'graphql-request';

const graphQlUrl = 'https://react.eogresources.com/graphql';

export class GraphQlService {
  private client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient(graphQlUrl, { headers: {} });
  }

  getMetrics = () => {
    const query = gql`
      {
        query: getMetrics
        __typename
      }
    `;

    return this.client.request(query);
  };
}
