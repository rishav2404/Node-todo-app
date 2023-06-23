import { ErrorHandler } from "../middlewares/error.js"
import { Task } from "../models/task.js"

export const newTask = async (req, res, next) => {

    try {
        const { title, description } = req.body

        await Task.create({
            title,
            description,
            user: req.user,
        })
        res.status(201).json({
            success: true,
            message: "Task added successfully!",
        })
    } catch (error) {
        next(error)
    }
}

export const getMyTasks = async (req, res, next) => {

    try {
        const tasks = await Task.find({ user: req.user._id })
        res.status(201).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error)
    }
}

export const updatetMyTasks = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)

        if (!task) return next(new ErrorHandler("Invalid task", 404))

        task.isCompleted = !(task.isCompleted)
        await task.save()



        res.status(201).json({
            success: true,
            message: "Task updated successfully",
        })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {

    try {
        const task = await Task.findById(req.params.id)

        if (!task) return next(new ErrorHandler("Task not found", 500))

        task.isCompleted = !task.isCompleted
        await task.deleteOne()      // for deleting the task


        res.status(201).json({
            success: true,
            message: "Task deleted successfully"

        })
    } catch (error) {
        next(error)
    }
}

