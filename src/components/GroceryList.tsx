import { Box, List, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomForm from "./Form";
import { nanoid } from "nanoid";
import GroceryType from "../types/grocery.type";
import Grocery from "./Grocery";
import { Link, useParams } from "react-router-dom";
import { getListById } from "../data/lists";
import GroceryListType from "../types/groceryList.type";

interface IProps {
  userId?: string;
}

const GroceryList = (props: IProps) => {
  const { listId } = useParams();
  const [list, setList] = useState<GroceryListType | undefined>(
    getListById(listId)
  );
  const { userId } = props;
  useEffect(() => {
    setList(getListById(listId));
  }, [listId]);

  if (!list) {
    return <p>List not found</p>;
  }

  function addGrocery(name: string, userid: string) {
    if (!list) {
      return;
    }

    let existingGrocery = list?.groceries.find(
      (grocery) => grocery.name === name
    );

    if (existingGrocery) {
      if (existingGrocery.votes.includes(userid)) {
        console.log("grocery was already added by user");
      } else {
        existingGrocery.votes.push(userid);
        setList({
          ...list,
          groceries: list.groceries.map((grocery) => {
            if (existingGrocery && grocery.id === existingGrocery.id) {
              return existingGrocery;
            }
            return grocery;
          }),
        });
      }
    } else {
      const newGrocery = { name: name, votes: [userid], id: nanoid() };
      setList({ ...list, groceries: [...list.groceries, newGrocery] });
    }
  }

  const handleVote = (id: string) => {
    if (!userId) {
      return;
    }

    const updatedGroceries: GroceryType[] = [];

    list.groceries.forEach((grocery) => {
      if (grocery.id === id) {
        if (!grocery.votes.includes(userId)) {
          grocery.votes.push(userId);
        } else {
          grocery.votes = grocery.votes.filter((vote) => vote !== userId);
        }
      }
      if (grocery.votes.length > 0) {
        updatedGroceries.push(grocery);
      }
    });

    setList({ ...list, groceries: updatedGroceries });
  };

  const groceriesList = list.groceries
    ?.sort((a, b) => b.votes.length - a.votes.length)
    .map((grocery) => (
      <Grocery
        grocery={grocery}
        userId={props.userId}
        id={grocery.id}
        key={grocery.id}
        onChange={handleVote}
      />
    ));

  return (
    <>
      <Box component="span" mr={1}>
        <Typography
          style={{ fontWeight: 600, fontSize: 30 }}
          display={"inline"}
        >
          {list.name}
        </Typography>
      </Box>
      <Box component="span">
        <Link to="/">Zurück zum Start</Link>
      </Box>
      <br />
      <CustomForm
        existingGroceries={list.groceries.map((grocery) => grocery.name)}
        addGrocery={addGrocery}
      />
      <List>{groceriesList}</List>
    </>
  );
};

export default GroceryList;
