import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../api';
import style from './LoginPage.module.css';
import LibraryName from '../../components/LibraryName';
import {UserLogged} from '../../types'


const LogIn: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>('');
  const navigate = useNavigate();

  const { data: users = [], isLoading, error } = useQuery<UserLogged[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const handleLogin = () => {
    if (selectedUser) {
      localStorage.setItem('loggedUserId', selectedUser);
      navigate('/management', { state: { userId: selectedUser } });
    }
  };

  if (isLoading) return <div>טוען...</div>;
  if (error) return <div>שגיאה בטעינת המשתמשים: {error.message}</div>;

  return (
    <div className={style.container}>
      <h1><LibraryName fontSize="100px" /></h1>
      <select onChange={(e) => setSelectedUser(e.target.value)} value={selectedUser}>
        <option value="">בחר יוזר</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
      <button onClick={handleLogin} disabled={!selectedUser}>התחבר</button>
    </div>
  );
};

export default LogIn;
