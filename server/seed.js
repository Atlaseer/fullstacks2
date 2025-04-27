import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Employee from './models/Employee.js';
import Project from './models/Project.js';
import ProjectAssignment from './models/ProjectAssignment.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

async function seed() {
    try{
        //console.log(process.env)
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB")

        await Employee.deleteMany({});
        await Project.deleteMany({});
        await ProjectAssignment.deleteMany({});

        const plainPasswords = ['Simon', 'Oskar', 'Alina', 'Sven', 'Joel'];
        const hashedPasswords = await Promise.all(
            plainPasswords.map(pw => bcrypt.hash(pw, 10))
        );

        const employees = await Employee.insertMany([
            { employee_id: 'E1', full_name: 'Simon Persson', email: 'simonpersson@example.com', hashed_password: hashedPasswords[0] },
            { employee_id: 'E2', full_name: 'Oskar Andersson', email: 'oskarandersson@example.com', hashed_password: hashedPasswords[1] },
            { employee_id: 'E3', full_name: 'Alina Schwarz', email: 'alinaschwarz@example.com', hashed_password: hashedPasswords[2] },
            { employee_id: 'E4', full_name: 'Sven Svensson', email: 'svensvensson@example.com', hashed_password: hashedPasswords[3] },
            { employee_id: 'E5', full_name: 'Joel Persson', email: 'joelpersson@example.com', hashed_password: hashedPasswords[4] }
        ])

        const projects =  await Project.insertMany([
            {project_code: 'P1', project_name: 'OpenAI', project_description: 'AI tools' },
            {project_code: 'P2', project_name: 'HAXOR', project_description: 'Hacking tool' },
            {project_code: 'P3', project_name: 'Support AI', project_description: 'Supportive AI' },
            {project_code: 'P4', project_name: 'Food Storm', project_description: 'Inspires foodlovers' },
            {project_code: 'P5', project_name: 'ProjectX', project_description: 'A secret project' }
        ]);

        const assignments = await ProjectAssignment.insertMany([
            { employee: employees[0].id, project: projects[0].id, start_date: new Date("2025-01-01") },
            { employee: employees[1].id, project: projects[1].id, start_date: new Date("2025-01-02") },
            { employee: employees[2].id, project: projects[2].id, start_date: new Date("2025-01-03") },
            { employee: employees[3].id, project: projects[3].id, start_date: new Date("2025-01-04") },
            { employee: employees[4].id, project: projects[4].id, start_date: new Date("2025-01-05") }
        ])

        console.log('Seed data successfully inserted');
        await mongoose.disconnect();
        process.exit();

    } catch(err){
        console.log("Error seeding data: ", err)
        process.exit(1)
    }
}

seed();
