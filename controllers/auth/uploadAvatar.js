const path = require('path')
const fs = require('fs/promises')
const jimp = require('jimp')
const service = require('../../services/fetch')
require('dotenv').config()
const { IMG_DIR } = process.env

const IMG_FOLDER = path.join(process.cwd(), 'public', IMG_DIR)

const uploadAvatar = async (req, res, next) => {
  try {
    if (req.file) {
      const { file, user } = req
      const img = await jimp.read(file.path)
      await img
        .autocrop()
        .cover(
          250,
          250,
          jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
        )
        .writeAsync(file.path)
      const imgSavedPath = path.join(
        IMG_FOLDER,
        user.email.split('@')[0] + '-' + file.originalname
      )
      await fs.rename(file.path, imgSavedPath)
      await service.updateUserById(user._id, {
        avatarURL: imgSavedPath,
      })
      return res.json({
        avatarURL: imgSavedPath,
      })
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = uploadAvatar
