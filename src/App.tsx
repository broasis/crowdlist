import {
  Container,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import GroceryLists from "./components/GroceryLists";
import GroceryList from "./components/GroceryList";
import Login from "./components/Login";
import { useQuery } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "./graphql";
import Impressum from "./components/Impressum";

function App() {
  const { data } = useQuery(GET_AUTHENTICATED_USER);

  const navigate = useNavigate();

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
          <Route path="/impressum" element={<Impressum />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
      <Container>
        <Box sx={{ justifyContent: "flex-end" }}>
          <Typography align={"center"} fontWeight={"bold"}>
            © Crowdlist
          </Typography>
          <Typography align={"center"}>
            created by Robert Schlick and Benjamin Gutzmann
          </Typography>
          <Button
            style={{ margin: "0 auto", display: "flex" }}
            onClick={() => navigate("/impressum")}
          >
            Impressum
          </Button>
        </Box>
      </Container>
      <Container></Container>
    </Container>
  );
}

export default App;
