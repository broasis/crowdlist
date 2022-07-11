import React from "react";
import { Container, ListItem, ListItemText, IconButton } from "@mui/material";
import GroceryType from "../types/grocery.type";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  RemoveCircleOutline,
} from "@mui/icons-material";

interface IProps {
  grocery: GroceryType;
  userId?: string;
  id: string;
  onChange: (id: string) => void;
}

function Grocery({ grocery, userId, id, onChange }: IProps) {
  let isVoted = userId && grocery.votes.includes(userId);

  const handleClick = () => onChange(id);

  return (
    <ListItem
      className="todo stack-small"
      disableGutters={true}
      disablePadding={true}
    >
      <Container>
        <ListItemText className="c-cb">{grocery.name}</ListItemText>
      </Container>
      <ListItemText>{grocery.votes.length}</ListItemText>
      <ListItemText>
        <IconButton
          color={isVoted ? "secondary" : "primary"}
          onClick={handleClick}
        >
          {isVoted ? (
            grocery.votes.length === 1 ? (
              <RemoveCircleOutline />
            ) : (
              <ArrowCircleDown />
            )
          ) : (
            <ArrowCircleUp />
          )}
        </IconButton>
      </ListItemText>
    </ListItem>
  );
}

export default Grocery;
