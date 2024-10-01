import React, { useEffect, useState } from 'react';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';
const Author = () => {
  const [authors, setAuthors] = useState<any[]>([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await fetch('http://localhost:3000/author');
      const authorsData = await response.json();
      setAuthors(authorsData);
    };

    fetchAuthors();
  }, []);

  return (
    <div>
      <h2>Authors</h2>
        {authors.map(author => (
          <li key={author.id}>{author.name}</li>
        ))}
    </div>
  );
};

export default Author;
