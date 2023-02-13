import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./config";
import {
  REACT_APP_AUTH_PASSWORD,
  REACT_APP_AUTH_USERNAME_SUFFIX,
} from "../../.env";

interface Login {
  username: string;
}

const auth = getAuth(app);

export async function Auth(props: Login) {
  const username = props.username + REACT_APP_AUTH_USERNAME_SUFFIX;
  const password = REACT_APP_AUTH_PASSWORD || "";
  const result = await signInWithEmailAndPassword(
    auth,
    username.toLocaleLowerCase(),
    password
  )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
  return result;
}
