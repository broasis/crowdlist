import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { nanoid } from "nanoid";

import 'bootstrap/dist/css/bootstrap.min.css';
import GroceryType from "./types/grocery.type";

const DATA: GroceryType[] = [
    {name: "Wasser", votes: ["abcd"], id: nanoid()},
    {name: "Milch", votes: ["abcd"], id: nanoid()},
    {name: "Cola", votes: ["abcd"], id: nanoid()},
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App groceries={DATA} />
  </React.StrictMode>
);


export default DATA;