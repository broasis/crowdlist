import React, { useState } from 'react';
import Grocery from "./components/Grocery";
import CustomForm from "./components/Form";
import { nanoid } from "nanoid";
import {Container, List, AppBar, TextField} from "@mui/material";
import GroceryType from "./types/grocery.type";

const initialUserId = "efgh"

function App(props: {groceries: Array<GroceryType>}) {
  const [groceries, setGroceries] = useState(props.groceries);
  const [userId, setUserId] = useState<string>(initialUserId);

  function addGrocery (name: string, userid: string) {
    let existingGrocery = groceries.filter(grocery => grocery.name === name)

    if (existingGrocery.length > 0) {
      if (existingGrocery[0].votes.includes(userid)) {
        alert("grocery was already added by user");
        setGroceries([...groceries]);
      } else {
        existingGrocery[0].votes.push(userid);
        setGroceries([...groceries]);
      }
    } else {
      const newGrocery = {name: name, votes: [userid], id: nanoid()};
      setGroceries([...groceries, newGrocery]);
    }
  }

    const handleVote = (id: string) => {
        const updatedGroceries: GroceryType[] = [];

        groceries.forEach((grocery) => {
            if (grocery.id === id) {
                if (!grocery.votes.includes(userId)) {
                    grocery.votes.push(userId);
                } else {
                    grocery.votes = grocery.votes.filter(vote => vote !== userId);
                }
            }
            if (grocery.votes.length > 0) {
                updatedGroceries.push(grocery);
            }
        })

        setGroceries(updatedGroceries);
    }

  const changeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserId(e.target.value);
  }

  const handleBlur = () => {
      if (userId === "") {
          setUserId(initialUserId);
      }
  }

  const groceriesList = groceries?.sort(
      (a, b) => b.votes.length - a.votes.length).map(
          grocery => <Grocery grocery={grocery} userId={userId} id={grocery.id} key={grocery.id} onChange={handleVote} />)

  return (
    <Container maxWidth="sm" className="App">
      <header style={{marginBottom: "40px"}}>
          <AppBar>
              Groceries List
          </AppBar>
      </header>
        <Container >
        <CustomForm addGrocery={addGrocery} />
        <br/>
        <TextField label={"UserId"} value={userId} onChange={changeUserId} onBlur={handleBlur} autoComplete={"off"}/>
        <List >
         {groceriesList}
        </List>
      </Container>
    </Container>
  );
}

export default App;
