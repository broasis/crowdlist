import { nanoid } from "nanoid";

const GroceryListsExample = [
  {
    name: "Frühstück",
    groceries: [
      { name: "Wasser", votes: ["abcd"], id: nanoid() },
      { name: "Milch", votes: ["abcd"], id: nanoid() },
      { name: "Cola", votes: ["abcd"], id: nanoid() },
    ],
    id: nanoid(),
  },
  {
    name: "Mittag",
    groceries: [
      { name: "Wasser", votes: ["abcd"], id: nanoid() },
      { name: "Milch", votes: ["abcd"], id: nanoid() },
      { name: "Cola", votes: ["abcd"], id: nanoid() },
    ],
    id: nanoid(),
  },
  {
    name: "Abendessen",
    groceries: [
      { name: "Wasser", votes: ["abcd"], id: nanoid() },
      { name: "Milch", votes: ["abcd"], id: nanoid() },
      { name: "Cola", votes: ["abcd"], id: nanoid() },
    ],
    id: nanoid(),
  },
];

export const getListById = (id?: string) => {
  return GroceryListsExample.find((groceryList) => groceryList.id === id);
};
export default GroceryListsExample;
