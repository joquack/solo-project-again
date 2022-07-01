const express = require('express')
const router = express.Router()
const db = require("../../db/models")
const {requireAuth} = require('../../utils/auth')
const {check} = require('express-validator')
const {handleValidationErrors} = require('../../utils/validation')

const commentValidation = [
    check('body').exists({checkFalsey: true}).withMessage('Enter a comment')
    .isLength({min:1}).withMessage('Enter comment that is more than 1 character long'),
    handleValidationErrors
]

router.get('/', async (req, res) => {
    const comments = await db.Comment.findAll({include: db.User})
    return res.json(comments)
})

router.post('/new',commentValidation, async (req, res) => {
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
