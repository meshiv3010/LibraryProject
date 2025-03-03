import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';
import style from './user.module.css';
import { fetchUsers, deleteUser, addBookToUser } from '../../../api';
import { UserLogged } from '../../../types';

interface UserProps {
  currentUser: UserLogged; // Matching data received from ManagementPage
}

const User = ({ currentUser }: UserProps) => {
  const [selectedUser, setSelectedUser] = useState<UserLogged | null>(null);
  const [userBooks, setUserBooks] = useState<any[]>(currentUser.readBooks || []);
  const queryClient = useQueryClient();

  // Fetching the list of users
  const { data: users = [], isLoading, error } = useQuery<UserLogged[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    refetchOnWindowFocus: true,
  });

  // Mutation for deleting a user
  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // Handle selecting a user
  const handleUserSelect = (user: UserLogged) => {
    setSelectedUser(user);
    setUserBooks(user.readBooks); // Update books when selecting another user
  };

  // Mutation for adding a book to the user
  const { mutate: addBookMutation } = useMutation<any, Error, { userId: string; bookId: string }>({
    mutationFn: ({ userId, bookId }) => addBookToUser(userId, bookId),
    onSuccess: (data) => {
      setUserBooks(data.readBooks); // Update user books after adding
      queryClient.invalidateQueries({ queryKey: ['users'] });
      alert('הספר נוסף בהצלחה!');
    },
    onError: (error) => {
      alert('שגיאה בהוספת הספר למשתמש.');
      console.error('Error adding book to user:', error);
    },
  });

  // Handle adding a book to the selected user
  const handleAddBookToUser = (bookId: string) => {
    if (selectedUser) {
      addBookMutation({ userId: selectedUser._id, bookId });
    }
  };

  // Handling loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users: {error.message}</div>;

  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        <LeftSide
          userName={selectedUser?.name || currentUser.name}
          userBooks={userBooks}
          favBookId={selectedUser?.favBook?._id || currentUser.favBook?._id || null}
          userId={selectedUser?._id || currentUser._id}
          loggedUserId={currentUser._id}
          selectedCategory="user"
          setUserBooks={setUserBooks} // Moving the setUserBooks function to the LeftSide component
        />
      </div>
      <div className={style.rightSide}>
        <RightSide
          users={users}
          selectedCategory="user"
          onUserSelect={handleUserSelect}
          loggedUserId={currentUser._id}
        />
      </div>
    </div>
  );
};

export default User;
