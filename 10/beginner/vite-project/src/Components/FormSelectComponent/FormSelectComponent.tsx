import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { Form } from "../../types";

type FormSelectComponentProps = {
    formName: keyof Form,
    displayFormName: string,
    register: UseFormRegister<Form>,
    error?: FieldError,
    options: { value: string, label: string }[],
    onChangeCallback?: (value: string) => void
}

export const FormSelectComponent: React.FC<FormSelectComponentProps> = ({ formName, displayFormName, register, error, options, onChangeCallback }) => {
    return (
        <div className="mb-4">
            <label htmlFor={formName} className="block text-gray-700">{displayFormName}</label>
            <select id={formName} {...register(formName as keyof Form)} className="w-full px-3 py-2 border border-gray-300 rounded"
                onChange={(e) => onChangeCallback && onChangeCallback(e.target.value)}>
                <option value="">Select an option</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
}
