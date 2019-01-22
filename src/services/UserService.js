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
    const user = auth.currentUser();
    const token = getAccessToken(user);
    const { data } = await axios.post(
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

    console.log("\n\n\n", "data", data, "\n\n\n");
  }
}

export default UserService;
