import { gql } from "@apollo/client";

const ProductInputs = `
  id
  name
  inStock
  gallery
  description
  brand
  prices {
    amount
    currency {
      label
      symbol
    }
  }
  category
  attributes {
    id
    name
    type
    items {
      id
      attribute_id
      value
      display_value
    }
  }
`;
export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;
export const GET_PRODUCTS = gql`
  query ($category: String) {
    products(category: $category) {
      ${ProductInputs}
    }
  }
`;

export const GET_ONE_PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
      ${ProductInputs}
    }
  }
`;
