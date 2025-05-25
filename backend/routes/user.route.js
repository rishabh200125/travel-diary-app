import express from "express"
import { getUsers } from "../controllers/user.contoller.js"
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router()

router.get("/getusers", verifyToken, getUsers)
export default router