import React, { createContext, useContext, useReducer } from 'react';
import { User } from '../types/user'; // <-- update this line in both files



const initialUsers: User[] = [];

type Action = {
  type: 'ADD_USER';
  payload: User;
};


function userReducer(users: User[], action: Action): User[] {
  switch (action.type) {
    case 'ADD_USER':
      return [...users, action.payload];
    default:
      return users;
  }
}

const UserContext = createContext<{
  users: User[];
  addUser: (user: User) => void;
}>({
  users: [],
  addUser: () => {}
});


export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, dispatch] = useReducer(userReducer, initialUsers);


  const addUser = (user: User) => {
    dispatch({ type: 'ADD_USER', payload: user });
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
