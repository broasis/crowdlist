import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Impressum = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Box
          component="span"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            style={{ fontWeight: 600, fontSize: 30 }}
            display={"inline"}
          >
            Impressum
          </Typography>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Zurück
          </Button>
        </Box>
        <Box marginLeft={2}>
          <Box component="p">Anbieter:</Box>
          <Box component="p" marginLeft={2}>
            <Box component="p">Robert Schlick</Box>
          </Box>
          <Box component="p">Kontakt:</Box>
          <Box component="p" marginLeft={2}>
            <Button
              variant="text"
              size={"small"}
              href={"mailto:robert@schlick.it"}
            >
              robert@schlick.it
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default Impressum;
