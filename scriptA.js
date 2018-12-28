const { promisify } = require("util");
const fs = require("fs");
const slugify = require("slugify");
const readFileAsync = promisify(fs.readFile);

(async () => {
  const contents = await readFileAsync("./a.txt", { encoding: "utf8" });
  const lines = contents.split("\n");
  const factory = lines.reduce((prev, next) => {
    const [rank, name, maxAdditional, baseValue, total] = next.split("\t");

    if (!name) {
      return prev;
    }

    prev += `
${name}
---
\n
  airAcceleration:
    baseValue: '${baseValue}'
    maxAdditional: '${maxAdditional}'
    rank: '${rank.split("-")[0]}'
    total: '${total}'
\n
---
`;
    return prev;
  }, "");

  fs.writeFile("airAcceleration.txt", factory, () => {});
})();
