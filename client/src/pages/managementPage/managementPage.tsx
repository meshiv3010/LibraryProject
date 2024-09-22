import React from 'react';
import { useLocation } from 'react-router-dom'; // ייבוא useLocation כדי לגשת ל-state שהעברנו
import Categories from './categories/categories';
import LeftSide from './leftSide/leftSide';
import RightSide from './rightSide/rightSide';
import Title from './title/title';
import style from './ManagementPage.module.css'; // קובץ CSS למטרות עיצוב

const ManagementPage = () => {
  const location = useLocation();
  const { userId } = location.state || {}; // שליפת ה-ID מה-state שהועבר מ-LogIn

  return (
    <div className={style.container}>
      <h1>User ID: {userId}</h1> {/* הצגת ה-ID של המשתמש */}
      <div className={style.leftSide}>
        <LeftSide />
      </div>
      <div className={style.rightSide}>
        <RightSide />
      </div>
      <div className={style.categories}>
        <Categories />
      </div>
      <div className={style.title}>
        <Title />
      </div>
    </div>
  );
};

export default ManagementPage;
