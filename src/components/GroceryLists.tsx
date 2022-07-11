import React from "react";
import GroceryListType from "../types/groceryList.type";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

interface IProps {
  data?: Array<GroceryListType>;
  userId?: string;
}

const GroceryLists = (props: IProps) => {
  return (
    <>
      <Typography style={{ fontWeight: 600, fontSize: 30 }}>
        Groceries Lists
      </Typography>
      <List>
        {props.data?.map((groceryList) => (
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
