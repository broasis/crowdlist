import { useState } from "react";
import { Container, AppBar, Button, Box, Toolbar } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import GroceryLists from "./components/GroceryLists";
import GroceryList from "./components/GroceryList";
import Login from "./components/Login";
import { verifyLogin } from "./login";

function App() {
  const [loginKey, setLoginKey] = useState<string | null>(null);
  const isAuthed = verifyLogin(loginKey);

  const changeLogin = (loginKey: string) => {
    setLoginKey(loginKey);
  };

  return (
    <Container fixed className="App">
      <AppBar position="fixed">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            Groceries List {">"}{" "}
            {loginKey
              ? `authenticated with '${loginKey}'`
              : "not authenticated"}
          </Box>
          <Box style={{ display: "inline", textAlign: "right" }}>
            <Button variant="contained" href={"/login"}>
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "5em" }}>
        <Routes>
          <Route path="/" element={<GroceryLists />} />
          <Route path="/login" element={<Login changeLogin={changeLogin} />} />
          <Route
            path="/list/:listId"
            element={<GroceryList userId={loginKey} isAuthed={isAuthed} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Container>
  );
}

export default App;
