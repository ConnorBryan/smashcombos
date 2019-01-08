import axios from "axios";
import uuid from "uuid/v4";

const URL_BASE = "https://smashcombos.xyz";

export class CharacterService {
  static async editProfile(name, description, tags) {
    const url = `${URL_BASE}/characters/${name}/profile`;
    const { data } = await axios.post(url, {
      description,
      tags
    });

    return data.success;
  }

  static async addCombo(name, combo) {
    const url = `${URL_BASE}/characters/${name}/combos`;
    const { data } = await axios.post(url, {
      combo: {
        ...combo,
        uuid: uuid()
      }
    });

    return data.success;
  }

  static async editCombo(name, uuid, combo) {
    const url = `${URL_BASE}/characters/${name}/combos/${uuid}`;
    const { data } = await axios.post(url, {
      combo
    });

    return data.success;
  }
}

export default CharacterService;
