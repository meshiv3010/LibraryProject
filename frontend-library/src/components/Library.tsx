import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
}

const Library: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users'); // API שלך
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
    fetchUsers();
  }, []);

  const handleLogin = () => {
    if (selectedUser) {
      console.log("Logging in user:", selectedUser);
      // לוגיקה להתחברות
    }
  };

  return (
    <div>
      <h1>סיפריה</h1>
      <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
        <option value="">בחר יוזר</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      <button onClick={handleLogin}>התחבר</button>
    </div>
  );
};

export default Library;
