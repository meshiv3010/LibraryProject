import React, { useEffect, useState } from 'react';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';
import style from './author.module.css'; // ודא שאתה מייבא את ה-CSS הנכון

const Author = () => {
  const [authors, setAuthors] = useState<any[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<any>(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await fetch('http://localhost:3000/authors');
      const authorsData = await response.json();
      setAuthors(authorsData);
    };

    fetchAuthors();
  }, []);

  // פונקציה לבחירת סופר
  const handleAuthorSelect = (author: any) => {
    console.log('Selected author:', author); // בדיקה שהנתונים נכונים, כולל ספרים
    setSelectedAuthor(author);
  };

  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        {selectedAuthor && (
          <LeftSide 
            authorName={selectedAuthor?.name} // בדוק אם השם נשלח
            authorBooks={selectedAuthor?.books} // בדוק אם הספרים נשלחים
            selectedCategory="author"
          />
        )}
      </div>

      <div className={style.rightSide}>
        <RightSide 
          authors={authors} 
          selectedCategory="author" 
          onAuthorSelect={handleAuthorSelect} 
        />
      </div>
      
    </div>
  );
};

export default Author;
