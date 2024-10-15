import React, { useEffect, useState } from 'react';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';
import style from './user.module.css';

const User = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3000/users');
      const usersData = await response.json();
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user: any) => {
    console.log('Selected user:', user);
    setSelectedUser(user);
  };

  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        {selectedUser && (
          <LeftSide 
            userName={selectedUser?.name} 
            userBooks={selectedUser?.readBooks} 
            selectedCategory="user"
          />
        )}
      </div>

      <div className={style.rightSide}>
        <RightSide 
          users={users} 
          selectedCategory="user" 
          onUserSelect={handleUserSelect} 
        />
      </div>
    </div>
  );
};

export default User;
