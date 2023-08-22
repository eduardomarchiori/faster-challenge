import * as itemsResource from "./itemsResource";

export const getCategories = async () => {
  const response = await itemsResource.getCategories();
  return response.data;
};

export const getItemsByCategory = async (item) => {
  const response = await itemsResource.getItemsByCategory(item);
  return response.data;
};

export const getItemDetails = async (item) => {
  const response = await itemsResource.getItemDetails(item);
  return response.data;
};
