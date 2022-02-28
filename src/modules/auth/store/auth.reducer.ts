import { GenericReducer } from '~utils/reduxUtilities';

import { AuthActionType, ILogin, IRecover, ISignup } from './auth.action';
import { authInitialState, AuthState } from './auth.state';

export const OrdersReducer = GenericReducer<AuthState, any>(authInitialState, {
    [AuthActionType.Logout]: (state) => (authInitialState),
    [AuthActionType.Login]: (state, action: ILogin) => ({
        ...state,
        user: action.payload
    }),
    [AuthActionType.Signup]: (state, action: ISignup) => ({
        ...state,
        orders: action.payload,
    }),
    [AuthActionType.Recover]: (state, action: IRecover) => ({
        ...state,
        orders: action.payload,
    }),
});
