import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Title.module.css';
import LibraryName from '../../../components/LibraryName'; // ייבוא הקומפוננטה

interface TitleProps {
  userName: string;
  favBook: string | null; // הוספת favBook
}

const Title = ({ userName, favBook }: TitleProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // חזרה לעמוד הכניסה
  };

  return (
    <div className={style.title}>
      <div className={style.leftSection}>
        <h1>שלום, {userName}</h1>
        {favBook && <h2>הספר המועדף עליך: {favBook}</h2>} {/* טקסט אם favBook לא null */}
        <button onClick={handleLogout}>התנתק</button>
      </div>
      <div className={style.rightSection}>
        <LibraryName fontSize="60px" />
      </div>
    </div>
  );
};

export default Title;
