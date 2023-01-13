/**
 * generate link for 3rd party downloader to download
 */
const generateLink = () => {
  const dir = Deno.readDirSync("./original/contents");
  for (const file of dir) {
    const name = file.name.split(".")[0];
    const contents = JSON.parse(
      Deno.readTextFileSync("./original/contents/" + file.name),
    );
    //@ts-ignore any
    const link = contents.map((content) => content.path);
    Deno.mkdirSync(`./link/original/${name}`);
    Deno.writeFileSync(
      `./link/original/${name}/` + file.name.split(".")[0] + ".txt",
      new TextEncoder().encode(link.join("\n")),
    );
  }
};

generateLink();
