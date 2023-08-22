import { api } from "../api/api";
console.log(api.defaults);

const BASE = "/v1/1";

export const getCategories = () => api.get(`${BASE}/list.php?c=list`);

export const getItemsByCategory = (item) =>
  api.get(`${BASE}/filter.php`, { params: { c: item } });

export const getItemDetails = (item) =>
  api.get(`${BASE}/search.php`, { params: { s: item } });
