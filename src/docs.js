import { readFileSync, writeFileSync } from "fs";
const { version, name } = JSON.parse(readFileSync("./package.json", "utf-8"));

function writeDocs(doc, name) {
  const readme = readFileSync("./README.md", "utf-8");
  const comment = {
    start: `<!-- START GENERATED ${name} -->`,
    end: `<!-- END GENERATED ${name} -->`,
  };

  const regex = new RegExp(`${comment.start}([\\s\\S]*?)${comment.end}`, "gm");
  const oldFile = readme.match(regex);
  const newFile = readme.replace(
    oldFile,
    `${comment.start}
${doc}
${comment.end}`
  );
  writeFileSync("./README.md", newFile);
}

// SETUP
let yml = readFileSync("./.github/workflows/seasonal.yml", "utf8");
// TODO: clean this up!
writeDocs(
  `\`\`\`yml
${yml.replace("uses: ./", `uses: katydecorah/${name}@v${version}`)}
\`\`\`
`,
  "SETUP"
);
