import Note from "../models/Note.js"

export async function getNotesController (req,res) {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getNotesController", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function getNoteByIdController (req,res) {
    try {
        const fetchedNote = await Note.findById(req.params.id)
        if(!fetchedNote) return res.status(404).json({message: "Note not found"})
        
        res.status(200).json(fetchedNote)
    } catch (error) {
        console.error("Error in getNoteByIdController", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function postNotesController (req,res) {
    try {
        const {title, content} = req.body;
        const note = new Note({title: title ,content: content});

        const savedNote = await note.save();
        res.status(201).json(savedNote)
    } catch (error) {
        console.error("Error in postNotesController", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function updateNotesController (req,res) {
    try {
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true,});

        if(!updatedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json(updatedNote)

    } catch (error) {
        console.error("Error in updateNotesController", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function deleteNotesController (req,res) {
    try {
        const {title,content} = req.body
        const toBeDeletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!toBeDeletedNote) return res.status(404).json({message: "Note not found"})
        res.status(200).json({message: "Note Deleted"})

    } catch (error) {
        console.error("Error in deleteNotesController", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}