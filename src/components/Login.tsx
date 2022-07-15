import { Button, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../login";

interface IProps {
  changeLogin: Function;
}

const Login = (props: IProps) => {
  const [login, setLogin] = useState<string | null>("");
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLogin(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyLogin(login)) {
      props.changeLogin(login);
      navigate("/");
    }
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
            error={!verifyLogin(login)}
            label={"Login eingeben"}
            value={login}
          ></TextField>
        </Container>
      </form>
    </>
  );
};
export default Login;
