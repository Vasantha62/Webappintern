import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://reqres.in/api/users?page=2';

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data.data;
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredEmployees.map((employee) => (
          <li key={employee.id}>
            <img src={employee.avatar} alt={employee.first_name} />
            <span>{employee.first_name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
