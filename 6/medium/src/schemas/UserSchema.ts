import { object, string } from "yup";

export const UserSchema = object({
    Username: string().required(),
    Email: string().required(),
    Password: string().required(),
});