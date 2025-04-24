const { useEffect } = require("react")
import { useState, useEffect } from "react";

function App(){
    const [message, setMessage] = useState('')

    useEffect(()=>{
        fetch('http://localhost:3000/api/message')
        .then((res) => res.json())
        .then((data) => setMessage(data.message))
    }, []);

    return(
        <div style={{ padding: 20}}>
        <p>Backend message: {message}</p>
        </div>
    )
}

export default App