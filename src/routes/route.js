const express = require("express")
const router = express.Router()
const { userDetails } = require("../controllers/userController")


router.post("/start", userDetails);

module.exports=router