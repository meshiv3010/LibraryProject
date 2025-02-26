import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAuthors } from '../../../api';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';
import style from './author.module.css';
import { Author as AuthorType} from '../../../api';

const Author: React.FC = () => {
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorType | null>(null);

  // שימוש ב-React Query לשליפת סופרים
  const { data: authors, isLoading, error } = useQuery({
    queryKey: ['authors'],
    queryFn: fetchAuthors,
  });
  
  // פונקציה לבחירת סופר
  const handleAuthorSelect = (author: AuthorType) => {
    setSelectedAuthor(author);
  };

  if (isLoading) return <p>Loading authors...</p>;
  if (error) return <p>Error loading authors</p>;

  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        {selectedAuthor ? (
          <LeftSide 
            authorName={selectedAuthor?.name} // בדוק אם השם נשלח
            authorBooks={selectedAuthor?.books} // בדוק אם הספרים נשלחים
            selectedCategory="author"
          />
        ) : (
          <h2 style={{ textAlign: 'right', fontSize: '30px' ,fontFamily: 'Arial'}}>בחר סופר</h2>
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
