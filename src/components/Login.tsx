import { Button, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState<string | null>("");
  const navigate = useNavigate();

  const { token } = useParams();

  useEffect(() => {
    if (token) {
      localStorage.setItem("userid", token);
      navigate("/");
    }
  }, [navigate, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("userid", login || "");
    navigate("/");
  };

  return (
    <>
      <Container>
        <Button onClick={() => navigate("/")}>Zurück zum Start</Button>
      </Container>
      <form onSubmit={handleSubmit}>
        <Container>
          <TextField
            onSubmit={handleSubmit}
            onChange={handleChange}
            label={"Login eingeben"}
            value={login}
          ></TextField>
        </Container>
      </form>
    </>
  );
};
export default Login;
