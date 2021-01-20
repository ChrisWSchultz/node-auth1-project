const express = require('express')
const bcrypt = require("bcryptjs")

const User = require('../../data/dbHelper')

const router = express.Router()

router.post('/login', async (request, response) => {
    try {
        let {username, password} = request.body
        let user = await User.getUserByUsername(username)

        let isValid = bcrypt.compare(user.password, password)

        if (isValid && user) {
            request.session.user = {id: user.id, username: user.username}
            return response.status(200).json({"message": `logged in with user id ${user.id}`})
        }
        else {
            console.log(user, hashed)
            return response.status(401).json({"message": "none shall pass"})
        }
    }
    catch (error) {
        console.log(error)
        return response.status(500).json({"message": "an error occurred"})
    }
})

module.exports = router
