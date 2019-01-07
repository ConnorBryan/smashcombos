import axios from "axios";

const URL_BASE = "http://localhost:3000";

export class CharacterService {
  static async addCombo(name, combo) {
    const url = `${URL_BASE}/characters/${name}/combos`;
    const { data } = await axios.post(url, {
      combo
    });

    console.log("\n\n\n", "data", data, "\n\n\n");
  }
}

export default CharacterService;
