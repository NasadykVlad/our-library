const fileService = require('../services/fileServices')
const User = require('../models/User')
const File = require('../models/File')

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent, userId} = req.body
            const file = new File({name, type, parent, owner: userId})
            const parentFile = await File.findOne({_id: parent})
            if (!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                console.log(parentFile, file)
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            console.log(e)
        }
    }

    async getFiles(req, res) {
        try {
            const {parent, owner} = req.body
            const files = await File.find(owner, parent)
            return res.json({files})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Can not get files'})
        }
    }
}

module.exports = new FileController()
