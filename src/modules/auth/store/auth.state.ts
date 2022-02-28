import { AuthUserModel } from './auth.model';

export const AuthStateName = 'Auth';

export interface AuthState {
    token?: string,
    user?: AuthUserModel
};

export interface AuthFullState {
    [AuthStateName]: AuthState;
}

export const authInitialState: AuthState = {
    token: undefined,
    user: undefined,
}
