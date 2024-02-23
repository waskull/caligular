import { User } from "./User"

export interface Auth {
    authenticated: boolean,
    token: string
    user: User
}