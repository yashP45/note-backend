import express from 'express'
import auth from "./../auth.js"
import { createNote  , getNote, getSingleNote , deleteNote} from '../controllers/noteController.js';
const Noterouter = new express.Router();

Noterouter.post("/create" ,auth, createNote )
Noterouter.get("/getNotes" ,auth , getNote )
Noterouter.get("/getNote/:id" ,auth , getSingleNote )
Noterouter.delete("/delete/:id" ,auth , deleteNote )

export default Noterouter