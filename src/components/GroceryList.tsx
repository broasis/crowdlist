import {
  Box,
  Button,
  FormControl,
  InputLabel,
  LinearProgress,
  List,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CustomForm from "./Form";
import Grocery from "./Grocery";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_GROCERY_ITEM,
  GET_GROCERY_LIST,
  VOTE_GROCERY_ITEM,
} from "../graphql";
import GroceryType from "../types/grocery.type";
import React, { useState } from "react";

interface IProps {
  userId: string | null;
  isAuthed: boolean;
}

const GroceryList = (props: IProps) => {
  const { listId } = useParams();
  const [sortMethod, setSortMethod] = useState("Upvotes");
  const navigate = useNavigate();

  const groceryListResult = useQuery(GET_GROCERY_LIST, {
    variables: { id: listId },
  });
  const [addGroceryItem, addStatus] = useMutation(ADD_GROCERY_ITEM);
  const [voteGroceryItem, voteStatus] = useMutation(VOTE_GROCERY_ITEM);

  if (!groceryListResult.data?.getListById) {
    return <LinearProgress />;
  }

  const handleChangeSortMethod = (e: any) => {
    setSortMethod(e.target.value);
  };

  async function handleAddGrocery(itemName: string) {
    await addGroceryItem({ variables: { listId, itemName } });
    await groceryListResult.refetch({ id: listId });
  }

  async function handleVoteItem(itemId: string) {
    await voteGroceryItem({ variables: { itemId } });
    await groceryListResult.refetch({ id: listId });
  }

  let sortedGroceries;

  switch (sortMethod) {
    // case "Upvotes":
    // this is the default case
    case "Alphabetisch":
      // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
      sortedGroceries = [...groceryListResult.data.getListById.items].sort(
        (a: GroceryType, b: GroceryType) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        }
      );
      break;
    default:
      sortedGroceries = [...groceryListResult.data.getListById.items].sort(
        (a: GroceryType, b: GroceryType) => b.votes.length - a.votes.length
      );
  }

  return (
    <>
      <Box
        component="span"
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          style={{ fontWeight: 600, fontSize: 30 }}
          display={"inline"}
        >
          {groceryListResult.data.getListById.name}
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/")}>
          Zurück
        </Button>
      </Box>
      <br />
      {props.userId && (
        <CustomForm
          existingGroceries={groceryListResult.data.getListById.items.map(
            (grocery: any) => grocery.name
          )}
          addGrocery={handleAddGrocery}
          isAuthed={props.isAuthed}
          isLoading={addStatus.loading || voteStatus.loading}
        />
      )}
      <br />
      <FormControl fullWidth>
        <InputLabel id="grocery-list-items-sort-method-label">
          Sortieren
        </InputLabel>
        <Select
          id="grocery-list-items-sort-method"
          value={sortMethod}
          label="Sortieren"
          onChange={handleChangeSortMethod}
        >
          <MenuItem value={"Upvotes"}>Upvotes</MenuItem>
          <MenuItem value={"Alphabetisch"}>Alphabetisch</MenuItem>
        </Select>
      </FormControl>
      {!groceryListResult.data || groceryListResult.loading ? (
        <LinearProgress />
      ) : (
        <List>
          {sortedGroceries.map((grocery: any) => (
            <Grocery
              grocery={grocery}
              userId={props.userId}
              id={grocery.id}
              key={grocery.id}
              onChange={handleVoteItem}
              isLoading={addStatus.loading || voteStatus.loading}
            />
          ))}
        </List>
      )}
    </>
  );
};

export default GroceryList;
