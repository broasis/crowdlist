import React, { useState } from "react";
import { TextField, Autocomplete } from "@mui/material";

const maxGroceryLength = 40;

interface IProps {
  existingGroceries: string[];
  addGrocery: Function;
}

function CustomForm(props: IProps) {
  const [name, setName] = useState<string | null>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name === "") {
      alert("grocery can't be an empty item");
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
          />
        )}
        autoSelect={true}
        freeSolo
        fullWidth
        onSelect={handleChange}
        onChange={(event: any, newValue: string | null) => {
          setName(newValue);
        }}
      />
    </form>
  );
}

export default CustomForm;
