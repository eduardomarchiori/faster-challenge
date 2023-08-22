export const setItemOnStorage = (item) => {
  const objectStorageList = JSON.parse(getItemOnStorage()) || [];

  const listWithoutItemAlreadyCreated = objectStorageList.filter(
    (el) => el?.category !== item.category
  );

  const validList = [...listWithoutItemAlreadyCreated, item];

  console.log(validList);
  return localStorage.setItem("favoriteItems", JSON.stringify(validList));
};

export const getItemOnStorage = () => {
  return localStorage.getItem("favoriteItems");
};
