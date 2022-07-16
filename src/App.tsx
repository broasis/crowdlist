import { Container, AppBar, Box, Toolbar } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import GroceryLists from "./components/GroceryLists";
import GroceryList from "./components/GroceryList";
import Login from "./components/Login";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql";

function App() {
  const { data } = useQuery(GET_AUTHENTICATED_USER);

  const user = data?.authenticatedUser?.user
    ? data.authenticatedUser.user
    : undefined;

  return (
    <Container fixed className="App">
      <AppBar position="fixed">
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            Crowdlist {">"}{" "}
            {user ? `Willkommen zurück, ${user.name}` : "not authenticated"}
          </Box>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: "5em" }}>
        <Routes>
          <Route path="/" element={<GroceryLists />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:token" element={<Login />} />
          <Route
            path="/list/:listId"
            element={<GroceryList userId={user?.id} isAuthed={data} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Container>
  );
}

export default App;
