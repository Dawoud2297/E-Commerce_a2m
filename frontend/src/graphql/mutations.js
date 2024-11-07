import { gql } from "@apollo/client";

export const MAKE_ORDER = gql`
  mutation MakeOrder($orderInput: OrderInput!) {
    makeOrder(orderInput: $orderInput) {
      message
      orderId
    }
  }
`;
