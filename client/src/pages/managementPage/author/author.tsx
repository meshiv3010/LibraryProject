import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAuthors } from '../../../api';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';
import style from './author.module.css';
import { Author as AuthorType} from '../../../api';

const Author: React.FC = () => {
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorType | null>(null);

  // Retrieving authors
  const { data: authors, isLoading, error } = useQuery({
    queryKey: ['authors'],
    queryFn: fetchAuthors,
  });
  
// Function to select a authors
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
            authorName={selectedAuthor?.name} // Check if the name was sent
            authorBooks={selectedAuthor?.books} //Check if the books were sent
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
