import axios from "axios";
import GoTrue from "gotrue-js";

import { getAccessToken } from "./helpers";

export const auth = new GoTrue({
  APIUrl: "https://smash-combos.netlify.com/.netlify/identity",
  audience: "",
  setCookie: true
});

export class UserService {
  static async updateUsername(username) {
    const user = typeof window !== "undefined" ? auth.currentUser() : null;
    const token = getAccessToken(user);

    await axios.post(
      "/.netlify/functions/updateUser",
      {
        username: "Bob"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      }
    );
  }
}

export default UserService;
