import express from "express"
import { getNotesController, postNotesController, updateNotesController, deleteNotesController, getNoteByIdController} from "../Controllers/notesController.js"

const router = express.Router()


router.get("/",getNotesController)

router.get("/:id",getNoteByIdController)

router.post("/",postNotesController)

router.put("/:id",updateNotesController)

router.delete("/:id",deleteNotesController)

export default router;