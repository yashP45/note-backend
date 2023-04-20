import Note from "../Models/noteModel.js"

export const createNote = async (req , res  , next) => { 
    try {
        const note = new Note({
            ...req.body,
            owner: req.user._id,
        });
        try {
            await note.save();
            res.status(201).send({ note, message: "Note Created" });
        } catch (e) {
            res.status(500).send(e);
        }
    } catch (error) {
        res.status(500).send(e);
    }
}

export const getNote = async ( req , res , next ) => {
    try {
        await req.user.populate("notes");

        res.send(req.user.notes);
    } catch (error) {
        console.log(e);
        res.status(500).send(e);
    }
}

export const getSingleNote = async (req , res , next) => {
    try {
        const note = await Note.findById({ _id: req.params.id });
        if (!note) {
            return res.status(404).send();
        }
        res.send(note);
    } catch (error) {
        res.status(500).send();
    }
}

export const deleteNote = async (req , res , next) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id });

        if (!note) {
            return res.status(404).send();
        }
        res.send({ message: "Note was deleted" });
    } catch (error) {
        res.status(500).send(error);
    }
}