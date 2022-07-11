import React, { useState } from "react";
import { Container, AppBar, TextField } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import GroceryLists from "./components/GroceryLists";
import GroceryList from "./components/GroceryList";
import GroceryListsExample from "./data/lists";

const initialUserId = "efgh";

function App() {
  const [userId, setUserId] = useState<string>(initialUserId);

  const changeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleBlur = () => {
    if (userId === "") {
      setUserId(initialUserId);
    }
  };

  return (
    <Container fixed className="App">
      <header style={{ marginBottom: "40px" }}>
        <AppBar>Groceries List</AppBar>
      </header>
      <Container>
        <TextField
          label={"UserId"}
          value={userId}
          onChange={changeUserId}
          onBlur={handleBlur}
          autoComplete={"off"}
        />
      </Container>
      <Container>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<GroceryLists data={GroceryListsExample} />}
            />
            <Route
              path="/list/:listId"
              element={<GroceryList userId={userId} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </Container>
    </Container>
  );
}

export default App;
