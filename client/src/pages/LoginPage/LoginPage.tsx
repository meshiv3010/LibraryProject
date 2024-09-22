import React, { useEffect, useState } from 'react';
import style from './LoginPage.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ייבוא useNavigate לניווט
import LibraryName from '../../components/LibraryName';

interface User {
  _id: string;
  name: string;
}

const LogIn = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>('');
  const navigate = useNavigate(); // יצירת משתנה לניווט

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
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
      // ניתוב לעמוד ManagementPage עם ה-ID של היוזר
      navigate('/management', { state: { userId: selectedUser } });
    }
  };

  return (
    <div className={style.container}>
      <h1><LibraryName fontSize="100px" /></h1>
      <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
        <option value="">בחר יוזר</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option> // שימוש ב-_id
        ))}
      </select>
      <button onClick={handleLogin}>התחבר</button>
    </div>
  );
};

export default LogIn;
