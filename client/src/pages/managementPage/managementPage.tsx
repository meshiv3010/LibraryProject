import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Categories from './categories/categories';
import Title from './title/title';
import User from './user/user';
import Book from './book/book';
import Author from './author/author';
import style from './ManagementPage.module.css';
import { fetchUsers, User as UserType } from '../../api';

const ManagementPage = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [activity, setActivity] = useState<string>('user');

  const { data: users = [], isLoading, error } = useQuery<UserType[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const currentUser = users.find((user) => user._id === userId);

  const handleCategorySelect = (category: string) => {
    setActivity(category === 'ניהול ספרים' ? 'book' : category === 'ניהול משתמשים' ? 'user' : 'author');
    console.log(`Selected activity: ${category}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users: {error.message}</div>;
  if (!currentUser) return <div>User not found</div>;

  return (
    <div className={style.container}>
      <Title userName={currentUser.name || ''} favBook={currentUser.favBook?.title || null} />
      <div className={style.activityContainer}>
        <div className={style.activity}>
          {activity === 'user' && <User currentUser={currentUser} />}
          {activity === 'book' && <Book />}
          {activity === 'author' && <Author />}
        </div>
        <Categories onCategorySelect={handleCategorySelect} />
      </div>
    </div>
  );
};

export default ManagementPage;
