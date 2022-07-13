import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_GROCERIES_LISTS } from "../graphql";

const GroceryLists = () => {
  const { loading, error, data } = useQuery<{
    lists?: Array<{ id: string; name: string }>;
  }>(GET_GROCERIES_LISTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Typography style={{ fontWeight: 600, fontSize: 30 }}>
        Groceries Lists
      </Typography>
      <List>
        {data?.lists?.map((groceryList) => (
          <ListItem>
            <Link to={`/list/${groceryList.id}`} key={groceryList.id}>
              <ListItemText>{groceryList.name}</ListItemText>
            </Link>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default GroceryLists;
