import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const assetsDir = join(process.cwd(), "dist/client/assets");
const files = readdirSync(assetsDir);

const css = files.find(f => f.startsWith("styles") && f.endsWith(".css"));
const js  = files.find(f => /^index-[^.]+\.js$/.test(f));

if (!css || !js) {
  console.error("Could not find CSS or JS entry files in dist/client/assets");
  console.log("Files found:", files);
  process.exit(1);
}

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Maharashtra Sports — DSYS</title>
    <meta name="description" content="Directorate of Sports and Youth Services, Government of Maharashtra" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="stylesheet" href="/assets/${css}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${js}"></script>
  </body>
</html>`;

writeFileSync(join(process.cwd(), "dist/client/index.html"), html);
console.log(`Generated index.html with:\n  CSS: ${css}\n  JS:  ${js}`);
