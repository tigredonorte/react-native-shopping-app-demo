import { ThunkDispatch } from 'redux-thunk';
import env from '~environments';

import { AuthUserModel as Model } from './auth.model';
import { AuthState as State } from './auth.state';

enum ActionType {
    Logout = 'LogoutAction',
    Login = 'LoginAction',
    Signup = 'SignupAction',
    Recover = 'RecoverAction',
    SetToken = 'SetTokenAction',
}
export { ActionType as AuthActionType }

export interface ISetToken { type: ActionType.SetToken, payload: string };
export const SetTokenAction = (payload: string) => {
    return async(dispatch: ThunkDispatch<State, any, ISetToken>): Promise<void> => {
        try {
            dispatch({ type: ActionType.SetToken, payload });
        } catch (error) {
            throw error;
        }
    };
}


export interface ILogin { type: ActionType.Login, payload: Model }
export const LoginAction = (payload: Model) => {
    return async(dispatch: ThunkDispatch<State, any, ILogin>): Promise<void> => {
        try {
            dispatch({ type: ActionType.Login, payload });
        } catch (error) {
            throw error;
        }
    };
}

// Action to Logout - Clear all redux states
export const logoutAction = () => {
    return {
      type: ActionType.Logout,
    };
};

export interface ISignup { type: ActionType.Signup, payload: Model };
export const SignupAction = (payload: Model) => {
    return async(dispatch: ThunkDispatch<State, any, ISignup>): Promise<void> => {
        try {
            dispatch({ type: ActionType.Signup, payload });
        } catch (error) {
            throw error;
        }
    };
}

export interface IRecover { type: ActionType.Recover, payload: Model };
export const RecoverAction = (payload: Model) => {
    return async(dispatch: ThunkDispatch<State, any, IRecover>): Promise<void> => {
        try {
            dispatch({ type: ActionType.Recover, payload });
        } catch (error) {
            throw error;
        }
    };
}
