const express = require ('express')
const router = express.Router()


router.use('/users', require('./users_router.cjs'))
router.use('/tasks', require('./tasks_router.cjs'))

module.exports = router
