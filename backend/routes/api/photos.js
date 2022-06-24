const express = require('express')
const router = express.Router()
const db = require("../../db/models")
const {requireAuth} = require('../../utils/auth')

router.get('/', async (req, res) => {
    const photos = await db.Photo.findAll()
    return res.json(photos)
})

module.exports = router
