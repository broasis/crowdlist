import { Box, List, Typography } from "@mui/material";
import React from "react";
import CustomForm from "./Form";
import Grocery from "./Grocery";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_GROCERY_ITEM,
  GET_GROCERY_LIST,
  VOTE_GROCERY_ITEM,
} from "../graphql";
import GroceryType from "../types/grocery.type";

interface IProps {
  userId: string | null;
  isAuthed: boolean;
}

const GroceryList = (props: IProps) => {
  const { listId } = useParams();
  const { userId } = props;

  const groceryListResult = useQuery(GET_GROCERY_LIST, {
    variables: { listId },
  });
  const [addGroceryItem] = useMutation(ADD_GROCERY_ITEM);
  const [voteGroceryItem] = useMutation(VOTE_GROCERY_ITEM);

  if (!groceryListResult.data) {
    return <p>List not found</p>;
  }

  async function handleAddGrocery(itemName: string) {
    await addGroceryItem({ variables: { listId, itemName, userId } });
    await groceryListResult.refetch({ listId });
  }

  async function handleVoteItem(itemId: string) {
    await voteGroceryItem({ variables: { itemId, userId } });
    await groceryListResult.refetch({ listId });
  }

  const groceriesList = [...groceryListResult.data.getItemsFromList]
    .sort((a: GroceryType, b: GroceryType) => b.votes.length - a.votes.length)
    .map((grocery: any) => (
      <Grocery
        grocery={grocery}
        userId={props.userId}
        id={grocery.id}
        key={grocery.id}
        onChange={handleVoteItem}
        isAuthed={props.isAuthed}
      />
    ));

  return (
    <>
      <Box component="span" mr={1}>
        <Typography
          style={{ fontWeight: 600, fontSize: 30 }}
          display={"inline"}
        >
          {listId}
        </Typography>
      </Box>
      <Box component="span">
        <Link to="/">Zurück zum Start</Link>
      </Box>
      <br />
      <CustomForm
        existingGroceries={groceryListResult.data.getItemsFromList.map(
          (grocery: any) => grocery.name
        )}
        addGrocery={handleAddGrocery}
        isAuthed={props.isAuthed}
      />
      <List>{groceriesList}</List>
    </>
  );
};

export default GroceryList;
