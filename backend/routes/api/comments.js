const express = require('express')
const router = express.Router()
const db = require("../../db/models")
const {requireAuth} = require('../../utils/auth')

router.get('/', async (req, res) => {
    const comments = await db.Comment.findAll({include: db.User})
    return res.json(comments)
})

module.exports = router
