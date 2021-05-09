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

    const responseData = this.client.request(query);
    return responseData;
  };

  getMeasurements = (metricValue: string, prevTime: number, dateTime: number) => {
    const query = gql`
      query {
        getMeasurements(input: { metricName: "${metricValue}", after: ${prevTime} }) {
          metric
          at
          value
          unit
        }
      }
    `;

    const responseData = this.client.request(query);
    return responseData;
  };
}
