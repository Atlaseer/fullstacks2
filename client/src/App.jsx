import Header from './Header.jsx'
import './App.css'




import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [sortKey, setSortKey] = useState('start_date');

  const fetchData = async () => {
    const res = await fetch('http://localhost:3000/api/project_assignments');
    const json = await res.json();
    setData([...json].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    }));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000); // 1 minute
    return () => clearInterval(interval);
  }, [sortKey]);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => setSortKey('employee_id.full_name')}>Employee Name</th>
          <th onClick={() => setSortKey('project_code.project_name')}>Project</th>
          <th onClick={() => setSortKey('start_date')}>Start Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td>{item.employee_id.full_name}</td>
            <td>{item.project_code.project_name}</td>
            <td>{new Date(item.start_date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
