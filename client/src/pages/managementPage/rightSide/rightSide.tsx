import React from 'react';
import Card from '../card/card';

interface RightSideProps {
  users: {
    _id: string;
    name: string;
    userNumber: number;
  }[]; // Define users directly here
  selectedCategory: string;
}

const RightSide = ({ users, selectedCategory }: RightSideProps) => {
  console.log('RightSide props:', { users, selectedCategory }); // הוספת לוג

  return (
    <div>
      <h1>רשימת המשתמשים</h1>
      {users.map((user) => (
        <Card key={user._id} name={user.name} userNumber={user.userNumber.toString()} />
      ))}
    </div>
  );
};

export default RightSide;