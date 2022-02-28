import { GenericReducer } from '~utils/reduxUtilities';

import { AuthActionType, ILogin, IRecover, ISignup } from './auth.action';
import { authInitialState, AuthState } from './auth.state';

export const AuthReducer = GenericReducer<AuthState, any>(authInitialState, {
    [AuthActionType.Logout]: (state) => (authInitialState),
    [AuthActionType.Signup]: (state, action: ISignup) => ({
        ...state
    }),
    [AuthActionType.Recover]: (state, action: IRecover) => ({
        ...state
    }),
    [AuthActionType.Login]: (state, action: ILogin) => ({
        ...state
    }),
});
