const express = require('express')
const router = express.Router()
const db = require("../../db/models")
const {requireAuth} = require('../../utils/auth')
const {check} = require('express-validator')
const {handleValidationErrors} = require('../../utils/validation')
const { singlePublicFileUpload } = require('../../awsS3')

// const photoValidation = [
//     check('photoName').exists({checkFalsey: true}).withMessage('Enter a valid photo name')
//     .isLength({min:1, max:24}).withMessage('Enter photo name that is between 1 and 24 characters long'),
//     handleValidationErrors
// ]

router.get('/', async (req, res) => {
    const photos = await db.Photo.findAll()
    return res.json(photos)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const photo = await db.Photo.findByPk(id)
    return res.json(photo)
})

router.post('/new', async (req, res) => {
    // const photo = await db.Photo.create(req.body)
    const {userId, photoName} = req.body
    console.log('BACKEND HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE*********************', userId, photoName)
    const source = await singlePublicFileUpload(req.file)
    const photo = await db.Photo.create({
        userId,
        photoName,
        source
    })
    return res.json(photo)
})

router.put('/edit/:id',  async (req, res) => {
    const id = parseInt(req.params.id)

    const photo = await db.Photo.findByPk(id)
    photo.photoName = req.body.photoName

    await photo.save()
    return res.json(photo)
})

router.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const photo = await db.Photo.findByPk(id)
    await photo.destroy()
    return res.json(photo)
})

module.exports = router
