import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
  query getAuthenticatedUser {
    authenticatedUser {
      user {
        id
        name
      }
    }
  }
`;

export const GET_GROCERIES_LISTS = gql`
  query GetLists {
    lists {
      id
      name
    }
  }
`;

export const GET_GROCERY_LIST = gql`
  query GetQuery($listId: String!) {
    getItemsFromList(listId: $listId) {
      name
      id
      votes
    }
  }
`;

export const ADD_GROCERY_ITEM = gql`
  mutation AddGrocery($listId: String!, $itemName: String!) {
    addItem(listId: $listId, name: $itemName) {
      id
      name
      list {
        id
        name
      }
    }
  }
`;

export const VOTE_GROCERY_ITEM = gql`
  mutation VoteGrocery($itemId: String!) {
    voteItem(itemId: $itemId) {
      id
      name
      listId
    }
  }
`;
