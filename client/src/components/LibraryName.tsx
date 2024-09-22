import React from 'react';
import style from './LibraryName.module.css'; // ייבוא קובץ ה-CSS

interface LibraryNameProps {
  fontSize: string;
}

const LibraryName = ({ fontSize }: LibraryNameProps) => {
  return (
    <span className={style.libraryName} style={{ fontSize }}>
      סיפריה
    </span>
  );
};

export default LibraryName;
