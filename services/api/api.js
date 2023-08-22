import axios from "axios";

export const api = axios.create({
  baseURL: "https://www.thecocktaildb.com/api/json",
  headers: {
    "Content-Type": "application/json",
  },
});
