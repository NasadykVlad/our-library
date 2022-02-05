const fileService = require('../services/fileServices')
const User = require('../models/User')
const File = require('../models/File')
const fs = require("fs");

class FileController {
    async getFiles(req, res) {
        try {

            const {userId, sort} = req.query

            let files

            switch (sort) {
                case 'name1':
                    files = await File.find({owner: userId}).sort({name: 1})
                    break
                case 'size1':
                    files = await File.find({owner: userId}).sort({size: 1})
                    break
                case 'date1':
                    files = await File.find({owner: userId}).sort({date: 1})
                    break
                case 'name-1':
                    files = await File.find({owner: userId}).sort({name: -1})
                    break
                case 'size-1':
                    files = await File.find({owner: userId}).sort({size: -1})
                    break
                case 'date-1':
                    files = await File.find({owner: userId}).sort({date: -1})
                    break
                default:
                    files = await File.find({owner: userId}).sort({date: -1})
                    break
            }

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

    async removeFile(req, resp) {
        try {
            const {userId, id} = req.body

            const file = await File.findOne({owner: userId, _id: id})

            const filePath = `D:\\Programming\\WEB_UI_PROGRAMMING\\Project\\our-library\\backend\\files\\${userId}\\${file.name}`

            if (file) {
                await File.deleteOne({owner: userId, _id: id})

                resp.json({status: 'ok'})
            }

            if (filePath) {
                fs.rmSync(filePath)
            }

        } catch (e) {
            console.log(e)
        }
    }

    async shareFile(req, resp) {
        try {
            const {userId, id} = req.body

            const file = await File.findOne({owner: userId, _id: id})

            const filePath = `D:\\Programming\\WEB_UI_PROGRAMMING\\Project\\our-library\\backend\\files\\${userId}\\${file.name}`

            if (file && filePath) {
                resp.json({link: `localhost:5001/${userId}/${file.name}`})
            } else {
                resp.json({message: 'File is not defined'})
            }
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new FileController()
