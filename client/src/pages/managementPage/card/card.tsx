import React from 'react';

interface CardProps {
  name?: string; // הפך לאופציונלי
  userNumber?: string; // הפך לאופציונלי
  title?: string; // הוסף פרופס אופציונלי
  authorName?: string; // הוסף פרופס אופציונלי
  bookNumber?: number; // הוסף פרופס אופציונלי
  writerNumber?: number; 
}

const Card = ({ name, userNumber, title, authorName, bookNumber, writerNumber }: CardProps) => {
  return (
    <div className="card">
      {userNumber && <h2>מזהה: {userNumber} שם: {name}</h2>}
      {bookNumber && <h2>מזהה: {bookNumber} שם: {title} סופר: {authorName}</h2>}
      {writerNumber && <h2>מזהה: {writerNumber} שם: {authorName}</h2>}
    </div>
  );
};

export default Card;
