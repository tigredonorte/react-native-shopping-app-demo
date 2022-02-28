import { ThunkDispatch } from 'redux-thunk';
import env from '~environments';

import { AuthUserModel as Model, ILoginModel, ISignupModel } from './auth.model';
import { AuthState as State } from './auth.state';

export enum AuthActionType {
    Logout = 'LogoutAction',
    Login = 'LoginAction',
    Signup = 'SignupAction',
    Recover = 'RecoverAction',
    SetToken = 'SetTokenAction',
}

export interface ILogin { type: AuthActionType.Login, payload: ILoginModel }
export const LoginAction = (payload: ILoginModel) => {
    return async(dispatch: ThunkDispatch<State, any, ILogin>): Promise<void> => {
        try {
            const resp = await fetch(`${env.authServiceUrl}signInWithPassword?key=`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...payload,
                    returnSecureToken: true
                })
            });
        
            if(!resp.ok) {
                throw new Error('Unable to perform Login!');
            }
        
            const resData = await resp.json();

            console.log(resData);
            dispatch({ type: AuthActionType.Login, payload });
        } catch (error) {
            throw error;
        }
    };
}

// Action to Logout - Clear all redux states
export const logoutAction = () => {
    return {
      type: AuthActionType.Logout,
    };
};

export interface ISignup { type: AuthActionType.Signup, payload: ISignupModel};
export const SignupAction = (payload: ISignupModel) => {
    return async(dispatch: ThunkDispatch<State, any, ISignup>): Promise<void> => {
        try {
            const resp = await fetch(`${env.authServiceUrl}signUp?key=`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...payload,
                    returnSecureToken: true
                })
            });

            if(!resp.ok) {
                throw new Error('Unable to perform Signup!');
            }

            const resData = await resp.json();
            console.log(resData);

            // dispatch({ type: AuthActionType.Signup, payload });

        } catch (error) {
            throw error;
        }
    };
}

export interface IRecover { type: AuthActionType.Recover, payload: Model };
export const RecoverAction = (payload: Model) => {
    return async(dispatch: ThunkDispatch<State, any, IRecover>): Promise<void> => {
        try {
            dispatch({ type: AuthActionType.Recover, payload });
        } catch (error) {
            throw error;
        }
    };
}

export interface ISetToken { type: AuthActionType.SetToken, payload: string };
export const SetTokenAction = () => {
    return async(dispatch: ThunkDispatch<State, any, ISetToken>): Promise<void> => {
        try {
            dispatch({ type: AuthActionType.SetToken, payload: '' });
        } catch (error) {
            throw error;
        }
    };
}

