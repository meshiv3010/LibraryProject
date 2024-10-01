import React, { useEffect, useState } from 'react';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';

interface UserType {
  _id: string;
  name: string;
  userNumber: number;
  title?: string;
  authorName?: string;
  bookNumber?: number;
  writerNumber?: number;
  readBooks: Array<{
    _id: string;
    title: string;
    author: {
      _id: string;
      name: string;
    };
    bookNumber: number;
  }>;
}

interface UserProps {
  currentUser: UserType | null; // הוספת פרופס
}

const User = ({ currentUser }: UserProps) => {
  const [readBooks, setReadBooks] = useState<any[]>([]);
  const [users, setUsers] = useState<UserType[]>([]); // משתנה לשמירה על כל היוזרים

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const usersData = await response.json();
        setUsers(usersData); // שמירה של כל היוזרים במערך
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); // ריצה רק פעם אחת כשקונסטרקטור עולה

  useEffect(() => {
    if (currentUser) {
      setReadBooks(currentUser.readBooks || []);
    }
  }, [currentUser]); // עדכון מצבים כשמשתנה currentUser

  // נוודא שהמשתמש נטען לפני שמנסים להציג את השדות שלו
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <LeftSide 
        userId={currentUser._id} 
        selectedCategory="user" 
        readBooks={readBooks} 
        userName={currentUser.name || ''} 
      />
      <RightSide 
        users={users} // שליחת כל היוזרים ל-RightSide
        selectedCategory="user" 
      />
    </div>
  );
};

export default User;
