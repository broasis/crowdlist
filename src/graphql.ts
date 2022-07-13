import { gql } from "@apollo/client";

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
  mutation AddGrocery($listId: String!, $itemName: String!, $userId: String!) {
    addItem(listId: $listId, name: $itemName, userId: $userId) {
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
  mutation VoteGrocery($itemId: String!, $userId: String!) {
    voteItem(itemId: $itemId, userId: $userId) {
      id
      name
      listId
    }
  }
`;
