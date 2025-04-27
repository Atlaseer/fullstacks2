import express from 'express';
const router = express.Router();
import ProjectAssignment from '../models/ProjectAssignment.js';

router.post('/', async (req, res)=>{
    try {
        const assignment = new ProjectAssignment(req.body);
        await assignment.save();
        res.status(201).json(assignment)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

router.get('/', async (req, res) =>{
    try{
        const assignments = await ProjectAssignment.find()
        .populate('employee')
        .populate('project');
       // console.log(assignments)
    res.json(assignments)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

export default router;
