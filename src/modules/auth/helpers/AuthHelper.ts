import React, { createContext } from 'react';

export interface AuthUser {
    username: string;
    password: string;
}

export interface AuthState {
    isLoading: boolean;
    isSignout: boolean;
    userToken?: string;
}

interface AuthActionType {
    type: string;
    token: string;
}

export const AuthContext = createContext<{ 
    logout: () => void, 
    login: (data: AuthUser) => Promise<any>, 
    signup: (data: AuthUser) => Promise<any>, 
}>({
    logout: () => new Promise((res) => res(null)), 
    login: (data: AuthUser) => new Promise((res) => res(null)),
    signup: (data: AuthUser) => new Promise((res) => res(null)),
});

export const AuthControlState = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...state,
                userToken: action.token,
                isLoading: false,
            };
        case 'SIGN_IN':
            return {
                ...state,
                isSignout: false,
                userToken: action.token,
            };
        case 'SIGN_OUT':
            return {
                ...state,
                isSignout: true,
                userToken: undefined,
            };
    }
    return state;
};

export const AuthInitialState: AuthState = {
    isLoading: true,
    isSignout: false,
    userToken: undefined,
}