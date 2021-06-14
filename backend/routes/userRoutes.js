const express = require('express')
const router = express.Router();

const {authUser, registerUser, updateUser, deleteUser, getUsers} = require('../controller/userController')

router.route('/').post(registerUser);

router.post('/login', authUser)
router.route('/profile').get(getUsers)
router
.route('/:id')
.delete(deleteUser)
.put(updateUser)
module.exports = router