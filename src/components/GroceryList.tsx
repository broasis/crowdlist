import { Box, Button, LinearProgress, List, Typography } from "@mui/material";
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

  const groceryListResult = useQuery(GET_GROCERY_LIST, {
    variables: { id: listId },
  });
  const [addGroceryItem, addStatus] = useMutation(ADD_GROCERY_ITEM);
  const [voteGroceryItem, voteStatus] = useMutation(VOTE_GROCERY_ITEM);

  if (!groceryListResult.data?.getListById) {
    return <LinearProgress />;
  }

  async function handleAddGrocery(itemName: string) {
    await addGroceryItem({ variables: { listId, itemName } });
    await groceryListResult.refetch({ id: listId });
  }

  async function handleVoteItem(itemId: string) {
    await voteGroceryItem({ variables: { itemId } });
    await groceryListResult.refetch({ id: listId });
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
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant="outlined">Zurück</Button>
        </Link>
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
      {!groceryListResult.data || groceryListResult.loading ? (
        <LinearProgress />
      ) : (
        <List>
          {[...groceryListResult.data.getListById.items]
            .sort(
              (a: GroceryType, b: GroceryType) =>
                b.votes.length - a.votes.length
            )
            .map((grocery: any) => (
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
