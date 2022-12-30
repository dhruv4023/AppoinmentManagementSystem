import fs from "fs";
export const renameAndMove = async (userDir, oldPath) => {
  fs.mkdirSync(userDir);
  fs.renameSync(
    "public/assets/" + oldPath,
    userDir +
      "/" +
      fs.readdirSync(userDir).length +
      "_" +
      "_" +
      String(oldPath).replace(" ", "_")
  );
};
export const deleteFile = (filePath) => {
  fs.rmSync(filePath);
};
