import * as moduleAlias from "module-alias";

moduleAlias.addAliases({
  "@aliases": `dist/aliases.js`,
  "@app": `dist/src/app.module.js`,
  "@common": `dist/src/common`,
  "@config": `dist/src/config`,
  "@features": `dist/src/features`,
  "@repository": `dist/src/repository`,
  "@test": `dist/src/test`,
  "@utils": `dist/src/utils`,
});
