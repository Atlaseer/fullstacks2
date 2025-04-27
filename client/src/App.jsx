import Header from './Header.jsx'
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [sortKey, setSortKey] = useState('start_date');

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/project_assignments');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      setData([...json].sort((a, b) => {
        const aValue = getValue(a, sortKey);
        const bValue = getValue(b, sortKey);
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
      }));
      console.log(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getValue = (item, key) => {
    if (key === 'employee.full_name') return item.employee?.full_name || '';
    if (key === 'project.project_name') return item.project?.project_name || '';
    if (key === 'start_date') return item.start_date;
    return '';
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
          <th onClick={() => setSortKey('employee.full_name')}>Employee Name</th>
          <th onClick={() => setSortKey('project.project_name')}>Project</th>
          <th onClick={() => setSortKey('start_date')}>Start Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td>{item.employee.full_name}</td>
            <td>{item.project.project_name}</td>
            <td>{new Date(item.start_date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
