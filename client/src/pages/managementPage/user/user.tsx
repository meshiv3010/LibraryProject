import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import LeftSide from '../leftSide/leftSide';
import RightSide from '../rightSide/rightSide';
import style from './user.module.css';
import { fetchUsers, deleteUser, User as UserType } from '../../../api';

interface UserProps {
  currentUser: UserType;
}

const User: React.FC<UserProps> = ({ currentUser }) => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, error } = useQuery<UserType[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => deleteUser(userId), // פונקציה לקבלת userId
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); // תיקון טיפוס invalidateQueries
    },
  });

  const handleUserSelect = (user: UserType) => {
    console.log('Selected user:', user);
    setSelectedUser(user);
  };

  const handleUserDelete = (userId: string) => {
    deleteUserMutation.mutate(userId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching users: {error.message}</div>;

  return (
    <div className={style.container}>
      <div className={style.leftSide}>
        {selectedUser && (
          <LeftSide 
            userName={selectedUser.name} 
            userBooks={selectedUser.readBooks} 
            selectedCategory="user"
          />
        )}
      </div>
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
