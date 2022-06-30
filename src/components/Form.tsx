import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const maxGroceryLength = 40;

function CustomForm (props: {addGrocery: Function}) {
    const [name, setName] = useState('');

    function handleChange (e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function handleSubmit (e: React.FormEvent) {
        e.preventDefault();
        if (name === "") {
            alert("grocery can't be an empty item")
            return
        }
        if (name.length > maxGroceryLength) {
            return;
        }

        props.addGrocery(name, "efgh");
        setName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                id="new-todo-input"
                label={`Name (${maxGroceryLength} Zeichen)`}
                autoComplete="off"
                value={name}
                error={name.length>maxGroceryLength}
                onChange={handleChange}
            />
            <Button onClick={handleSubmit} disabled={name.length>maxGroceryLength} >
                Add
            </Button>
        </form>

    );
}

export default CustomForm;