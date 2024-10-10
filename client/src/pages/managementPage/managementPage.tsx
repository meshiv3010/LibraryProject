import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Categories from './categories/categories';
import Title from './title/title';
import User from './user/user';
import Book from './book/book';
import Author from './author/author';
import style from './ManagementPage.module.css';

const ManagementPage = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const [activity, setActivity] = useState<string>('user'); // ברירת מחדל ל-'user'
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const usersData = await response.json();
        const foundUser = usersData.find((user: any) => user._id === userId);
        console.log('Fetched users data:', usersData); // לוג של הנתונים שנמצאו
        console.log('Found user:', foundUser); // לוג של המשתמש שנמצא
        setCurrentUser(foundUser);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [userId]);

  // נוודא שהמשתמש נטען לפני שמנסים להציג את השדות שלו
  if (!currentUser) {
    return <div>Loading...</div>; // הודעה שהמידע נטען
  }

  const handleCategorySelect = (category: string) => {
    setActivity(category === 'ניהול ספרים' ? 'book' : category === 'ניהול משתמשים' ? 'user' : 'author');
    console.log(`Selected activity: ${category}`);
  };

  return (
    <div className={style.container}>
      <div>
        <Title 
          userName={currentUser.name || ''}
          favBook={currentUser.favBook?.title || null}
        />     
      </div>
      <div>
        <Categories onCategorySelect={handleCategorySelect} />
      </div>
      <div>
        {activity === 'user' && <User currentUser={currentUser} />} {/* הוספת User */}
        {activity === 'book' && <Book />} {/* הוספת Book */}
        {activity === 'author' && <Author />} {/* הוספת Author */}
      </div>
    </div>
  );
};

export default ManagementPage;