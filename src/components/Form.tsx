import React, { useState } from "react";
import { TextField, Autocomplete, Box, IconButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";

const maxGroceryLength = 40;

interface IProps {
  existingGroceries: string[];
  addGrocery: Function;
  isAuthed: boolean;
  isLoading: boolean;
}

function CustomForm(props: IProps) {
  const [name, setName] = useState<string | null>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name?.trim() === "") {
      return;
    }
    if (name && name.length > maxGroceryLength) {
      return;
    }

    props.addGrocery(name);
    setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ gap: "20px", display: "flex" }}>
        <Autocomplete
          options={props.existingGroceries}
          value={name}
          renderInput={(params) => (
            <TextField
              {...params}
              id="new-grocery-input"
              label={`Add Grocery (max. ${maxGroceryLength} Zeichen)`}
              value={name}
              error={name != null && name.length > maxGroceryLength}
              onSubmit={handleSubmit}
              onChange={handleChange}
              disabled={!props.isAuthed || props.isLoading}
            />
          )}
          autoSelect={true}
          freeSolo
          fullWidth
          onSelect={handleChange}
          onChange={(_event: any, newValue: string | null) => {
            setName(newValue);
          }}
          disabled={!props.isAuthed}
        />
        <IconButton
          aria-label="delete"
          color="primary"
          disabled={props.isLoading}
          onClick={handleSubmit}
          size="large"
        >
          <AddCircleOutline fontSize="inherit" />
        </IconButton>
      </Box>
    </form>
  );
}

export default CustomForm;
