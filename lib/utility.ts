import path from "path";
import fs from "fs";

export function generateStylesheetAliases(stylesDirectoryPath: string) {
  const aliases = {};
  const stylesheetTypes = fs.readdirSync(
    path.resolve(__dirname, stylesDirectoryPath)
  );

  for (const stylesheetType of stylesheetTypes) {
    const stylesheets = fs.readdirSync(
      path.resolve(__dirname, `${stylesDirectoryPath}/${stylesheetType}/`)
    );

    for (const stylesheet of stylesheets.filter((s) => !s.includes(".d.ts"))) {
      aliases[stylesheet.substring(1, stylesheet.indexOf("."))] = path.resolve(
        __dirname,
        `${stylesDirectoryPath}/${stylesheetType}/${stylesheet}`
      );
    }
  }

  return aliases;
}
