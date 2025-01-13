import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Categories from './categories/categories';
import Title from './title/title';
import User from './user/user';
import Book from './book/book';
import Author from './author/author';
import style from './ManagementPage.module.css';
import { fetchUsers, fetchBooks, Book as BookType } from '../../api';
import {UserLogged} from '../../types'

const ManagementPage = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [activity, setActivity] = useState<string>('user');

  const { data: users = [], isLoading: usersLoading, error: usersError } = useQuery<UserLogged[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const { data: books = [], isLoading: booksLoading, error: booksError } = useQuery<BookType[], Error>({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  const currentUser = users.find((user) => user._id === userId);

  const handleCategorySelect = (category: string) => {
    setActivity(category === 'ניהול ספרים' ? 'book' : category === 'ניהול משתמשים' ? 'user' : 'author');
    console.log(`Selected activity: ${category}`);
  };

  if (usersLoading || booksLoading) return <div>Loading...</div>;
  if (usersError) return <div>Error fetching users: {usersError.message}</div>;
  if (booksError) return <div>Error fetching books: {booksError.message}</div>;
  if (!currentUser) return <div>User not found</div>;

  return (
    <div className={style.background}>
      <div className={style.container}>
        {/* הוסף תצוגה עבור הכותרת */}
        <Title userName={currentUser.name || ''} favBook={currentUser.favBook?.title || null} />
        <div className={style.activityContainer}>
          {/* יישר את האזור הפעיל והקטגוריות */}
          <div className={style.activity}>
            {activity === 'user' && <User currentUser={currentUser} />}
            {activity === 'book' && <Book books={books} currentUser={currentUser} />}
            {activity === 'author' && <Author />}
          </div>
          <Categories onCategorySelect={handleCategorySelect} />
        </div>
      </div>
    </div>
  );  
};

export default ManagementPage;
