import axios from "axios";
import uuid from "uuid/v4";

import { auth } from "../components/user-provider";

// const URL_BASE = "https://smashcombos.xyz";
const URL_BASE = "http://localhost:1337";

export class CharacterService {
  static async editProfile(name, description, tags) {
    const user = auth.currentUser();

    if (!user) {
      throw new Error(`Unable to edit a profile when not signed in.`);
    }

    const url = `${URL_BASE}/characters/${name}/profile`;
    const { data } = await axios.post(url, {
      user,
      description,
      tags
    });

    return data.success;
  }

  static async addCombo(name, combo) {
    const user = auth.currentUser();

    if (!user) {
      throw new Error(`Unable to edit a profile when not signed in.`);
    }

    const url = `${URL_BASE}/characters/${name}/combos`;
    const { data } = await axios.post(url, {
      user,
      combo: {
        ...combo,
        uuid: uuid()
      }
    });

    return data.success;
  }

  static async editCombo(name, uuid, combo) {
    const user = auth.currentUser();

    if (!user) {
      throw new Error(`Unable to edit a profile when not signed in.`);
    }

    const url = `${URL_BASE}/characters/${name}/combos/${uuid}`;
    const { data } = await axios.post(url, {
      user,
      combo
    });

    return data.success;
  }
}

export default CharacterService;
