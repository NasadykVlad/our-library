const fs = require('fs')
const File = require('../models/File')


class FileServices {
    createDir(file) {
        return new Promise((resolve, reject) => {
            try {
                const filePath = `D:\\Programming\\WEB_UI_PROGRAMMING\\Project\\our-library\\backend\\files\\${file.owner}\\${file.path}`

                if (!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath, { recursive: true })
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: 'File is already exists'})
                }
            } catch (e) {
                return reject({message: e})
            }
        })
    }

}

module.exports = new FileServices()
