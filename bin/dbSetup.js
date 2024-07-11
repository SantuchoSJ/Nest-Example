const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const args = process.argv.slice(2);
const dbChoice = args[0]; // 'nosql' or 'sql'

if (!["nosql", "sql"].includes(dbChoice)) {
  console.error('Please specify "nosql" or "sql" as the argument.');
  process.exit(1);
}

const baseDir = path.join(__dirname, "../src/config/database");
const packageJsonPath = path.join(__dirname, "../package.json");
const configModulePath = path.join(__dirname, "../src/config/config.module.ts");

// Remove the other folder
const folderToRemove = dbChoice === "nosql" ? "sql" : "nosql";
const folderPath = path.join(baseDir, folderToRemove);
fs.rmSync(folderPath, { recursive: true, force: true });

// Update package.json to remove dependencies
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const dependenciesToRemove =
  dbChoice === "nosql"
    ? ["pg", "typeorm", "@nestjs/typeorm"]
    : ["mongoose", "@nestjs/mongoose"];

dependenciesToRemove.forEach((dep) => {
  delete packageJson.dependencies[dep];
});

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Modify app.module.ts to import the correct database module
let configModuleContent = fs.readFileSync(configModulePath, "utf8");

// Determine which module to keep and rename
const keepModule =
  dbChoice === "nosql" ? "NoSqlDatabaseModule" : "SqlDatabaseModule";
const removeModule =
  dbChoice === "nosql" ? "SqlDatabaseModule" : "NoSqlDatabaseModule";

// Replace the removed module import with an empty string
configModuleContent = configModuleContent.replace(
  new RegExp(`import ${removeModule}.*;\\s*`, "g"),
  ""
);

// Rename the kept module import to DatabaseModule
configModuleContent = configModuleContent.replace(
  new RegExp(`import ${keepModule}`, "g"),
  "import DatabaseModule"
);

// Update the imports array to only include DatabaseModule
configModuleContent = configModuleContent.replace(
  new RegExp(`\\[${keepModule}, ${removeModule}\\]`, "g"),
  "[DatabaseModule]"
);
configModuleContent = configModuleContent.replace(
  new RegExp(`\\[${removeModule}, ${keepModule}\\]`, "g"),
  "[DatabaseModule]"
);
configModuleContent = configModuleContent.replace(
  new RegExp(`\\[${keepModule}\\]`, "g"),
  "[DatabaseModule]"
);

fs.writeFileSync(configModulePath, configModuleContent);

// Run npm install to update the node_modules
exec("npm install", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

console.log(
  `${dbChoice.toUpperCase()} setup completed successfully. Please clean up your required env file`
);
