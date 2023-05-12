import { getItemAsync, setItemAsync } from "expo-secure-store";

type storeType = "username";

export async function setStorePair(key: storeType, value: string) {
  await setItemAsync(key, value);
}

export async function getStoreValue(key: storeType) {
  const storeValue = (await getItemAsync(key)) as string;
  return storeValue ?? "";
}
