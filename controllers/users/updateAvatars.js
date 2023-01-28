const { Users } = require("../../models/modelUsers");
// const { Unauthorized } = require("http-errors");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

async function updateAvatars(req, res, next) {
  const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;

  try {
    await Jimp.read(tempUpload)
      .then((avatar) => {
        return avatar.resize(256, 256).write(tempUpload);
      })
      .catch((err) => {
        console.error(err);
      });

    const avatarName = `${id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", avatarName);

    await Users.findByIdAndUpdate(req.user._id, { avatarURL });
    res.status(201).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
}

module.exports = updateAvatars;
