export interface User{
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    roles?: string[];
    birthdate?: Date;
    cedula?: string;
    phone?: string;
    createdAt?:Date | string | null;
    id?: number;

}

export interface IUser{
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    roles?: string[];
    birthdate?: Date;
    cedula?: string;
    phone?: string;
    createdAt?:Date;
}

export interface IRegisterUser{
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    roles?: string[];
    birthdate?: Date;
    cedula?: string;
    phone?: string;
}
