import fs from "fs";
export const renameAndMove = (userDir, oldPath) => {
  if (!fs.existsSync(userDir)) fs.mkdirSync(userDir);
  const newPath =
    userDir +
    "/" +
    fs.readdirSync(userDir).length +
    "_" +
    "_" +
    String(oldPath).replace(" ", "_");
  fs.renameSync("public/assets/" + oldPath, newPath);
  return newPath;
};
export const deleteFile = (filePath) => {
  fs.rmSync(filePath);
};
