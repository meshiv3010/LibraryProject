import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Title.module.css';
import LibraryName from '../../../components/LibraryName';
import { RiLogoutBoxLine } from "react-icons/ri";


interface TitleProps {
  userName: string;
  favBook: string | null;
}

const Title = ({ userName, favBook }: TitleProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // חזרה לעמוד הכניסה
  };

  return (
    <div className={style.title}>
      <div className={style.leftSection}>
        <h1>שלום,</h1>
        <h2>{userName}</h2>
        {favBook && <h3>הספר המועדף עליך: {favBook}</h3>}
        <RiLogoutBoxLine 
          onClick={handleLogout} 
          className="logoutIcon" 
          size={30} /* גודל האייקון */
        />
        </div>
      <div className={style.rightSection}>
        <LibraryName fontSize="70px" />
      </div>
    </div>
  );
};

export default Title;
