import { object, string, ref, date } from "yup"

export const formSchema = object({
    name: string().required('Name is required'),
    lastName: string().required('Last name is required'),
    email: string().email('Invalid email format').required('Email is required'),
    password: string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    repeatPassword: string()
        .oneOf([ref('password')], 'Passwords must match')
        .required('Repeat password is required'),
    dob: date().transform((value, originalValue) => originalValue === "" ? null : value).required('Date of birth is required'),
    country: string().required('Country is required'),
    city: string().required('City is required'),
});