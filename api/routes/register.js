const express = require('express')
const bcrypt = require("bcryptjs")

const User = require('../../data/dbHelper')

const router = express.Router()

router.post('/register', async (request, response) => {
    try {
        let {username, password} = request.body
        let data = {
            username,
            password: await bcrypt.hash(password, 12),
        }

        let user = await User.register(data)

        return response.status(200).json(user)
    }
    catch (error) {
        console.log(error)
        return response.status(500).json({"message": "an error occurred"})
    }
})

module.exports = router
