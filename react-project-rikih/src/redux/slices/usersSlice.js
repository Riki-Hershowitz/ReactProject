import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs

const initialState = {
    oneUser: {
        id: uuidv4(), // Unique ID for the user
        username: '', // Username of the user
        password: '', // Password of the user
        email: '', // Email of the user
    }, // Object to hold a single user item
    users: [], // Array to hold user items
    totalUsers: 0, // Total number of items in the users
    currentUser: "", // Object to hold the currently logged-in user
};

const usersSlice = createSlice({
    name: 'Users',
    initialState,
    reducers: {
        register(state, action) {
            const newUser = action.payload;
            const { username, password, email } = newUser;
        
            // Check if username already exists
            const existingUser = state.users.find(user => user.username === username);
            if (existingUser) {
                alert('שם המשתמש כבר קיים במערכת'); // Show alert if username exists
                return;
            }
        
            // Create a new user with a unique ID
            const newUserWithId = {
                id: uuidv4(), // Generate unique ID
                username,
                password,
                email,
            };
        
            state.users.push(newUserWithId);
            state.totalUsers += 1;
            state.currentUser = newUserWithId.username; // Set currentUser to the username
            alert('הרשמה בוצעה בהצלחה!'); // Show success alert
        },
        login(state, action) {
            const { username, password } = action.payload;
        
            // Find the user by username and password
            const user = state.users.find(user => user.username === username && user.password === password);
            if (!user) {
                alert('שם המשתמש או הסיסמה שגויים'); // Show alert if login fails
                return;
            }
        
            state.currentUser = user.username; // Set currentUser to the username
            alert('התחברת בהצלחה!'); // Show success alert
        },
        logout(state) {
            state.currentUser = null;
        },
    },
});

export const { register, login, logout } = usersSlice.actions;
export default usersSlice.reducer;