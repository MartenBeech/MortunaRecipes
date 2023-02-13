import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { RecipeImage } from "../entities/image";

interface uploadImage {
  image: any;
}

export async function uploadImage(props: uploadImage) {
  const storage = getStorage();
  const imageRef = ref(storage, props.image.name);
  const uploadResult = await uploadBytes(imageRef, props.image);
  return uploadResult;
}

export async function getImages() {
  const storage = getStorage();
  const storageRef = ref(storage);
  const listRes = await listAll(storageRef);

  const URLs: RecipeImage[] = await Promise.all(
    listRes.items.map(async (item) => {
      const url = await getDownloadURL(item);
      return { url: url, name: item.name };
    })
  );

  return URLs;
}
