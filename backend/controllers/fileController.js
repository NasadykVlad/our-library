const File = require('../models/File')
const fs = require("fs");
const AWS = require('aws-sdk');
const getUserId = require('../middleware/getUserId.middleware')
require('dotenv').config()


const ID = process.env.ID;
const SECRET = process.env.SECRET;

const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});


class FileController {
    async getFiles(req, res) {
        try {
            const userId = getUserId(req.headers.authorization)
            const {sort} = req.query

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

            const {name} = req.query
            const userId = getUserId(req.headers.authorization)


            let book = await File.findOne({userId, name})

            if (!book) {
                if (req.files.file) {
                    const file = req.files.file
                    const params = {
                        Bucket: BUCKET_NAME,
                        Key: `${userId}/${file.name}`, // File name you want to save as in S3
                        Body: file.data,
                        ACL: 'public-read-write'
                    };

                    s3.upload(params, async function(err, data) {
                        const dbFile = new File({
                            name: file.name,
                            type: file.mimetype,
                            size: file.size,
                            owner: userId,
                            link: data.Location
                        })

                        await dbFile.save()
                        res.json(dbFile)
                    });
                }
            } else {
                res.json({error: 'book-is-already-exists'})
            }
        } catch (e) {
            console.log(e)
        }
    }

    async downloadFile(req, resp) {
        try {
            const {id} = req.body
            const userId = getUserId(req.headers.authorization)

            const file = await File.findOne({owner: userId, _id: id})

            if (file) {
                resp.json({link: file.link})
            } else {
                resp.json({status: 'error'})
            }

        } catch (e) {
            console.log(e)
        }
    }

    async removeFile(req, resp) {
        try {
            const {id} = req.body
            const userId = getUserId(req.headers.authorization)

            const file = await File.findOne({owner: userId, _id: id})
            

            if (file) {
                const params = {
                    Bucket: BUCKET_NAME,
                    Key: `${userId}/${file.name}` // File name you want to save as in S3
                };

                s3.deleteObject(params, (req, res) => {
                })
                
                await File.deleteOne({owner: userId, _id: id})

                resp.json({status: 'ok'})
            }

        } catch (e) {
            console.log(e)
        }
    }

    async shareFile(req, resp) {
        try {
            const {id} = req.body
            const userId = getUserId(req.headers.authorization)

            const file = await File.findOne({owner: userId, _id: id})

            if (file) {
                resp.json({link: file.link})
            } else {
                resp.json({message: 'File is not defined'})
            }
        } catch (e) {
            console.log(e)
        }
    }

}

module.exports = new FileController()
