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
    <div className={style.background}>
      <div className={style.container}>
        <h1><LibraryName fontSize="150px" /></h1>
        <br />
        <br />
        <br />
        <br />
        <select
          className={style.select}
          onChange={(e) => setSelectedUser(e.target.value)}
          value={selectedUser}
        >
          <option className={style.option} value="">בחר יוזר</option>
          {users.map((user) => (
            <option key={user._id} value={user._id} className={style.option}>
              {user.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        <br />
        <button 
          onClick={handleLogin} 
          disabled={!selectedUser} 
          className={style.button}
        >
          התחבר
        </button>
      </div>
    </div>
  );
};

export default LogIn;
