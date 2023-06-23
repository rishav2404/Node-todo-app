import express from "express"
import { getMyTasks, newTask ,updatetMyTasks,deleteTask} from '../controllers/task.js'
import { isAuthenticated } from '../middlewares/auth.js'

const router =express()

router.post("/new",isAuthenticated,newTask )
router.get("/my",isAuthenticated,getMyTasks )
router.route("/:id").put(isAuthenticated,updatetMyTasks ).delete(isAuthenticated, deleteTask)



export default router