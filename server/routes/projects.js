import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();


router.post('/', async (req, res) =>{
    try{
        const existing = await Project.findOne({ project_code: req.body.project_code });
        if (existing) return res.status(409).json({ message: "Project already exists" })

        const project = new Project(req.body);
        await project.save();
        res.status(201).json(project)

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router;
