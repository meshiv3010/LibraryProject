import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Categories from './categories/categories';
import LeftSide from './leftSide/leftSide';
import RightSide from './rightSide/rightSide';
import Title from './title/title';
import style from './ManagementPage.module.css';

const ManagementPage = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [users, setUsers] = useState<any[]>([]); // Use any[] or an inline interface here
  const [selectedCategory, setSelectedCategory] = useState<string>('ניהול משתמשים'); // Default

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('http://localhost:3000/users');
      const usersData = await response.json();
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    console.log(`Selected category: ${category}`);
  };

  const currentUser = users.find(user => user._id === userId);
  const readBooks = currentUser?.readBooks || [];

  return (
    <div className={style.container}>
      <div>
        <Title 
          userName={currentUser?.name || ''} 
          favBook={currentUser?.favBook?.title || null} 
        />     
      </div>
      <div>
        <LeftSide 
          userId={userId} 
          selectedCategory={selectedCategory} 
          readBooks={readBooks} 
          userName={currentUser?.name || ''} 
        />
      </div>
      <div>
        <RightSide 
          users={users} // Passing the users array
          selectedCategory={selectedCategory} 
        />
      </div>
      <div>
        <Categories onCategorySelect={handleCategorySelect} />
      </div>
    </div>
  );
};

export default ManagementPage;
