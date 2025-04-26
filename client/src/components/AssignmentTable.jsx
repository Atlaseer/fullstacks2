import React, {useEffect, useState } from "react";

const AssignmentTable = () =>{
    const[assignments, setAssignments] = useState([]);
    const[sortKey, setSortKey] = useState('start_date')
    const[sortOrder, setSortOrder] = useState('asc')

    const fetchAssignments = async() =>{
        const res = await fetch('http://localhost:3000/api/project_assignments')
        const data = await res.json();
        setAssignments(data.slice(-5)); //Latest 5
    }
};

useEffect(() =>{
    fetchAssignments();
    const interval = setInterval(fetchAssignments, 6000)
    return () => clearInterval(interval);
}, [])
