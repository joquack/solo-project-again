const express = require('express')
const router = express.Router()
const db = require("../../db/models")
const {requireAuth} = require('../../utils/auth')

router.get('/', async (req, res) => {
    const photos = await db.Photo.findAll()
    return res.json(photos)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    const photo = await db.Photo.findByPk(id)
    // console.log( '\n BACKEND ROUTE', photo)
    return res.json(photo)
})

module.exports = router
