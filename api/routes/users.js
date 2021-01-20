const express = require('express')

const Users = require('../../data/dbHelper')

const router = express.Router()

router.get('/users', async (request, response) => {
    try {
        if (!request.session || !request.session.user) {
            return response.status(401).json({"message": "none shall pass"})
        } else {
            let users = await Users.get()

            return response.status(200).json(users)
        }
    }
    catch (error) {
        console.log(error)
        return response.status(500).json({"message": "an error occurred"})
    }
})

module.exports = router
