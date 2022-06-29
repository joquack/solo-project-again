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

router.delete('/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    const comment = await db.Comment.findByPk(id)
    await comment.destroy()
    return res.json(comment)
})

module.exports = router
