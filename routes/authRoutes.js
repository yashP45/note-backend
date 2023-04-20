import express from 'express'
import auth from "./../auth.js"
import { signUp , login, logout, getUser, deleteUser} from '../controllers/authController.js';
const router = new express.Router();

router.post("/signUp" , signUp)
router.post("/login",  login)
router.post("/logout" , auth, logout)
router.get("/getUser" , auth, getUser)
router.delete("/deleteMe" , auth, deleteUser)

export default router