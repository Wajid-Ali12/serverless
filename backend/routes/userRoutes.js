import express from 'express';
const router = express.router();

import {authUser, registerUser, updateUser, deleteUser, getUser} from '../controller/userController.js'

router.route('/').post(registerUser);

router.post('/login', authUser)
router.route('/profile').get(getUser)
router
.route('/:id')
.delete(deleteUser)
.put(updateUser)