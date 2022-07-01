const express = require('express')
const router = express.Router()
const db = require("../../db/models")
const {requireAuth} = require('../../utils/auth')
const {handleValidationErrors} = require('../../utils/validation')

const photoValidation = [
    check('photoName').exists({checkFalsey: true}).withMessage('Enter a valid photo name')
    .isLength({min:1, max:100}).withMessage('Enter photo name that is between 1 and 24 characters long'),

    handleValidationErrors
]

router.get('/', async (req, res) => {
    const photos = await db.Photo.findAll()
    return res.json(photos)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const photo = await db.Photo.findByPk(id)
    return res.json(photo)
})

router.post('/new', photoValidation, async (req, res) => {
    const photo = await db.Photo.create(req.body)
    return res.json(photo)
})

router.put('/edit/:id', photoValidation, async (req, res) => {
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
