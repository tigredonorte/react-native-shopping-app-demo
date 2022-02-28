export interface AuthUserModel {
    id: string;
    name: string;
    email: string;
}

export interface ISignupModel { 
    name: string;
    email: string;
    password: string;
};
export interface ILoginModel { 
    email: string;
    password: string;
};