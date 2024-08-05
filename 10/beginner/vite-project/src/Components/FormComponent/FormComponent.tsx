import { SubmitHandler, useForm } from "react-hook-form";
import { ValidationError } from "yup";
import { formSchema } from "../../schemas/formSchema";
import { FormTextInputComponent } from "..";
import { FormSelectComponent } from "..";
import { Country, City } from "country-state-city";
import { useState } from "react";
import { Form } from "../../types";

export const FormComponent = () => {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<Form>();
    const [cityOptions, setCityOptions] = useState<{ value: string, label: string }[]>([]);

    const handleChangeCountry = (newCountryCode: string) => {
        const cities = City.getCitiesOfCountry(newCountryCode)?.map(city => ({
            value: city.name,
            label: city.name
        }));
        if(cities){
            setCityOptions(cities);
        }
    };

    const submit: SubmitHandler<Form> = async data => {
        try {
            await formSchema.validate(data, { abortEarly: false });
            alert("Form submitted")
        } catch (e) {
            if (e instanceof ValidationError) {
                e.inner.forEach((error) => {
                    setError(error.path as keyof Form, { type: "manual", message: error.message });
                });
            }
        }
    };

    const countryOptions = Country.getAllCountries().map(c => ({ value: c.isoCode, label: c.name }));

    return (
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded">
            <h1 className="text-2xl font-bold mb-6">User Registration</h1>
            <form onSubmit={handleSubmit(submit)}>
                <FormTextInputComponent formName="name" displayFormName="Name" register={register} error={errors.name} />
                <FormTextInputComponent formName="lastName" displayFormName="Last Name" register={register} error={errors.lastName} />
                <FormTextInputComponent formName="email" displayFormName="Email Address" register={register} error={errors.email} />
                <FormTextInputComponent formName="password" displayFormName="Password" passwordField register={register} error={errors.password} />
                <FormTextInputComponent formName="repeatPassword" displayFormName="Confirm Password" passwordField register={register} error={errors.repeatPassword} />
                <div className="mb-4">
                    <label htmlFor="dob" className="block text-gray-700">Date of Birth</label>
                    <input type="date" id="dob" {...register('dob')} className="w-full px-3 py-2 border border-gray-300 rounded"/>
                    {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>}
                </div>
                <FormSelectComponent formName="country" displayFormName="Country" register={register} error={errors.country} options={countryOptions} onChangeCallback={handleChangeCountry} />
                <FormSelectComponent formName="city" displayFormName="City" register={register} error={errors.city} options={cityOptions} />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
            </form>
        </div>
    );
};
