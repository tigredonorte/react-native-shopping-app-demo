export enum AuthRoutes {
    Login = "Login",
    Signup = "Signup",
    Recover = "Recover",
}

export type AuthStackType = {
    [AuthRoutes.Login]: undefined;
    [AuthRoutes.Signup]: undefined;
    [AuthRoutes.Recover]: undefined;
};