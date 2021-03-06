const asyncHandler =require('express-async-handler'); 
const User = require('../model/userModel')
const generateToken = require('../utils/generateToken')



const authUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;

    const user = await User.findOne({email})

    if(user &&(user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
        console.log(user)
    }
    else {
        res.status(401)
        throw new Error('Invalid email or password')
      }
})


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
      }
      const user = await User.create({
          name,
          email,
          password
          
      })
      console.log(user)
      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
      }
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
  
    if (user) {
      await user.remove()
      res.json({ message: 'User removed' })
    } else {
      res.status(404)
      throw new Error('User not found')
    }
  })
  const updateUser = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user._id)

      if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
          user.password = req.body.password
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            token: generateToken(updatedUser._id),
          })
    }
    else {
        res.status(404)
        throw new Error('User not found')
      }
  })
  const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
  })

module.exports = {authUser, registerUser, deleteUser, updateUser, getUsers}