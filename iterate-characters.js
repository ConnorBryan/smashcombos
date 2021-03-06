const fs = require("fs");

let count = 0;

fs.readdir("./src/characters", (err, files) => {
  if (err) return console.error(err);

  files.forEach(file => {
    const fileName = `./src/characters/${file}`;

    fs.readFile(fileName, (err, data) => {
      if (err) return console.error(err);

      const character = JSON.parse(data);

      /** Manipulate character here. */

      fs.writeFile(fileName, JSON.stringify(character, null, 2), err => {
        return err
          ? console.error(err)
          : console.info(`Updated ${character.name}.`);
      });
    });
  });
});
