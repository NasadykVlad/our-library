const fileService = require('../services/fileServices')
const User = require('../models/User')
const File = require('../models/File')
const fs = require("fs");

class FileController {
    async getFiles(req, res) {
        try {
            const {userId} = req.query

            const files = await File.find({owner: userId})
            if (files) {
                return res.json({files})
            } else {
                return res.json({message: 'Can not find files'})
            }

        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Can not get files'})
        }
    }

    async uploadFile(req, res) {
        try {
            const {userId} = req.query
            if (req.files.file) {
                const file = req.files.file

                const fileOwnerPath = `D:\\Programming\\WEB_UI_PROGRAMMING\\Project\\our-library\\backend\\files\\${userId}`
                const filePath = `D:\\Programming\\WEB_UI_PROGRAMMING\\Project\\our-library\\backend\\files\\${userId}\\${file.name}`

                fs.mkdirSync(fileOwnerPath, { recursive: true })
                file.mv(filePath)

                const dbFile = new File({
                    name: file.name,
                    type: file.mimetype,
                    size: file.size,
                    owner: userId
                })

                await dbFile.save()
                res.json(dbFile)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async downloadFile(req, resp) {
        try {
            const {userId, id} = req.body

            const file = await File.findOne({owner: userId, _id: id})

            const filePath = `D:\\Programming\\WEB_UI_PROGRAMMING\\Project\\our-library\\backend\\files\\${userId}\\${file.name}`

            if (fs.existsSync(filePath)) {
                return resp.download(filePath, file.name)
            }

        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new FileController()
