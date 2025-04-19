type StoreKey = "allergens" | "ingredients";

const useStore = () => {
  const getData = (key: StoreKey) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : {};
  };
  const setData = (key: StoreKey, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const translate = (key: StoreKey, item: string) => {
    const data = getData(key);
    const entry = data[item];
    if (!entry) {
      console.log("item not found", item);
      return item;
    }
    if (entry.name["fr"]) {
      return entry.name["fr"];
    }
    return entry.name["en"];
  };
  return [setData, translate];
};

export default useStore;
