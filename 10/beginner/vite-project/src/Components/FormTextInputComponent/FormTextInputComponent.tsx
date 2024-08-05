import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { Form } from "../../types";

type FormTextInputComponentProps = {
    formName: keyof Form,
    displayFormName: string,
    passwordField?: boolean,
    register: UseFormRegister<Form>,
    error?: FieldError
}

export const FormTextInputComponent: React.FC<FormTextInputComponentProps> = ({ formName, displayFormName, register, error, passwordField }) => {
    return(
        <div className="mb-4">
            <label htmlFor={formName} className="block text-gray-700">{displayFormName}</label>
            <input type={passwordField ? "password" : "text"} id={formName} {...register(formName as keyof Form)} className="w-full px-3 py-2 border border-gray-300 rounded"/>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
}