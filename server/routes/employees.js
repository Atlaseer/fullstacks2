import express from 'express';
import Employee from '../models/Employee';

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const existing = await Employee.findOne({ employee_id: req.body.eomploye_id });
        if(existing) return res.status(409).json({ message: "Employee already exists" })

        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json(employee)
    } catch(error){
        res.status(500).json({ error: error.message })
    }
})

export default router;
