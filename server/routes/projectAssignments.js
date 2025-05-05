import express from 'express';
import ProjectAssignment from '../models/ProjectAssignment.js';
import Project from '../models/Project.js'; 
import Employee from '../models/Employee.js'; 

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const assignment = new ProjectAssignment(req.body);
        await assignment.save();
        res.status(201).json(assignment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        console.log('Fetching project assignments...');
        
        const assignments = await ProjectAssignment.find()
            .populate('employee', 'full_name employee_id email') 
            .populate('project', 'project_name project_code project_description') 
        console.log(assignments);
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
