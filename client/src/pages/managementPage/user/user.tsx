import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';
import style from './user.module.css';
import { fetchUsers, deleteUser } from '../../../api';
import { UserLogged } from '../../../types';

interface UserProps {
  currentUser: UserLogged; // התאמה לנתונים המתקבלים מ-ManagementPage
}

const User = ({ currentUser }: UserProps) => {
  const [selectedUser, setSelectedUser] = useState<UserLogged | null>(null);
  const queryClient = useQueryClient();

  // Fetching the list of users
  const { data: users = [], isLoading, error } = useQuery<UserLogged[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
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
    console.log('Selected user:', user);
    setSelectedUser(user);
  };

  // Handle deleting a user
  const handleUserDelete = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  // Handling loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users: {error.message}</div>;

  return (
    <div className={style.container}>
      {/* LeftSide Component */}
      <div className={style.leftSide}>
        <LeftSide
          userName={selectedUser?.name } // שם המשתמש הנבחר או המשתמש המחובר
          userBooks={selectedUser?.readBooks } // ספרים של המשתמש הנבחר או המחובר
          favBookId={selectedUser?.favBook?._id || null} // הספר המועדף של המשתמש הנבחר או המחובר
          userId={selectedUser?._id} 
          loggedUserId={currentUser._id}
          selectedCategory="user"
        />
      </div>

      {/* RightSide Component */}
      <div className={style.rightSide}>
        <RightSide
          users={users}
          selectedCategory="user"
          onUserSelect={handleUserSelect}
          onDeleteUser={handleUserDelete}
        />
      </div>
    </div>
  );
};

export default User;
