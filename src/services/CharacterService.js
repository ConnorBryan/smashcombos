import axios from "axios";

const URL_BASE = "http://68.183.96.138:1337";

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
      combo
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
