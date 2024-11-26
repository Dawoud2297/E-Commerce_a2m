import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const withGraphql = (Component, gqlType = "query", query, flag = "") => {
  const GraphqlHoc = (props) => {
    const [data, setData] = useState(null);
    const { id, category } = useParams();
    // Query
    const [fetchData, { loading }] = useLazyQuery(
      gqlType === "query"
        ? query
        : gql`
            {
              __typename
            }
          `,
      {
        onError: (error) => {
          console.error("Error fetching data:", error);
        },
        onCompleted: (data) => setData(data),
      }
    );
    // Mutation
    const [makeOrder, { loading: makeOrderLoading }] = useMutation(
      gqlType === "mutation"
        ? query
        : gql`
            mutation {
              __typename
            }
          `
    );

    useEffect(() => {
      if (gqlType === "query") {
        fetchData({ variables: flag === "one" ? { id } : { category } });
      }
    }, [fetchData, category, id]);

    return (
      <Component
        {...props}
        data={data}
        fetchData={fetchData}
        loading={loading}
        makeOrder={makeOrder}
        makeOrderLoading={makeOrderLoading}
      />
    );
  };

  return GraphqlHoc;
};

export default withGraphql;
