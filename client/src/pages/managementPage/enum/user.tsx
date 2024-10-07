import React, { useEffect, useState } from 'react';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';

interface UserType {
  _id: string;
  name: string;
  userNumber: number;
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
  const [readBooks, setReadBooks] = useState<UserType['readBooks']>([]);
  const [users, setUsers] = useState<UserType[]>([]); // משתנה לשמירה על כל היוזרים
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null); // הוספת מצב למשתמש הנבחר

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
      setReadBooks(currentUser.readBooks || []); // הגדר את הספרים של המשתמש המחובר
    }
  }, [currentUser]); // עדכון מצבים כשמשתנה currentUser

  const handleUserSelect = (user: UserType) => {
    setSelectedUser(user); // עדכון המשתמש הנבחר
    setReadBooks(user.readBooks || []); // עדכון הספרים של המשתמש הנבחר
  };

  // נוודא שהמשתמש נטען לפני שמנסים להציג את השדות שלו
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <LeftSide 
        userId={selectedUser ? selectedUser._id : currentUser._id} 
        selectedCategory="user" // עדכון הקטגוריה
        readBooks={readBooks} 
        userName={selectedUser ? selectedUser.name : currentUser.name} 
      />
      <RightSide 
        users={users} // שליחת כל היוזרים ל-RightSide
        selectedCategory="user" // העברת הקטגוריה
        onUserSelect={handleUserSelect} // העברת הפונקציה לבחירת משתמש
      />
    </div>
  );
};

export default User;
