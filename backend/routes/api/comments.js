const express = require('express')
const router = express.Router()
const db = require("../../db/models")
const {requireAuth} = require('../../utils/auth')

router.get('/', async (req, res) => {
    const comments = await db.Comment.findAll({include: db.User})
    return res.json(comments)
})

router.post('/new', async (req, res) => {
    const comment = await db.Comment.create(req.body)
    return res.json(comment)
})

module.exports = router
