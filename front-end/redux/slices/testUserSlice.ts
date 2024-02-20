import {createSlice, PayloadAction} from "@reduxjs/toolkit"

export interface User {
    id: string,
    name: string,
    email: string
}

const userList: Array<User> = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john@test.com'
    }
]

export const testUserSlice = createSlice({
    name: "users",
    initialState: {
        userList
    },
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.userList.push(action.payload)
        }
    }
})