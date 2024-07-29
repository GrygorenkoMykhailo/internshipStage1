import { useRef, useState } from "react";

type CountryData = {
    country: string,
    cities: string[],
}

const locationData: CountryData[] = [
    {
        country: 'USA',
        cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']
    },
    {
        country: 'Canada',
        cities: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa']
    },
    {
        country: 'UK',
        cities: ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow']
    },
    {
        country: 'Australia',
        cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide']
    },
    {
        country: 'Germany',
        cities: ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt']
    }
];

export const FormComponent = () => {
    const [selectedCountryIndex, setSelectedCountryIndex] = useState<number | null>(null);
    const [errors, setErrors] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
        country: "",
        city: ""
    });
    
    const nameRef = useRef<HTMLInputElement | null>(null);
    const lastNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
    const dobRef = useRef<HTMLInputElement | null>(null);
    const countryRef = useRef<HTMLSelectElement | null>(null);
    const cityRef = useRef<HTMLSelectElement | null>(null);

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const index = event.target.selectedIndex - 1;
        setSelectedCountryIndex(index);
    };

    const validateForm = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault(); 

        let isValid = true;
        const newErrors = {
            name: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            dob: "",
            country: "",
            city: ""
        };

        const name = nameRef.current?.value || "";
        const namePattern = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]{2,}$/;
        if (!namePattern.test(name)) {
            newErrors.name = "Name must contain at least 1 uppercase character, 1 lowercase character, and be at least 2 characters long, no special characters allowed.";
            isValid = false;
        }

        const lastName = lastNameRef.current?.value || "";
        if (!namePattern.test(lastName)) {
            newErrors.lastName = "Last Name must contain at least 1 uppercase character, 1 lowercase character, and be at least 2 characters long, no special characters allowed.";
            isValid = false;
        }

        const email = emailRef.current?.value || "";

        const generalEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const providers = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];

        if(!generalEmailPattern.test(email)){
            newErrors.email = "Incorrect email format";
            isValid = false;
        }else{
            let emailProviderIsCorrect: boolean = false;
            providers.forEach(p => {
                if(!emailProviderIsCorrect){
                    if(email.endsWith(p)){
                        emailProviderIsCorrect = true;
                    }
                }
            })

            if(!emailProviderIsCorrect){
                newErrors.email = "Incorrect email provider, should be one of" + providers.join(' ') ;
                isValid = false;
            }
        }

        const password = passwordRef.current?.value || "";
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!passwordPattern.test(password)) {
            newErrors.password = "Password must be at least 8 characters long and include 1 uppercase character, 1 lowercase character, 1 number, and 1 special character.";
            isValid = false;
        }

        const confirmPassword = confirmPasswordRef.current?.value || "";
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Confirm Password must match the Password.";
            isValid = false;
        }

        const dob = dobRef.current?.value || "";
        if (!dob || new Date(dob) > new Date()) {
            newErrors.dob = "Date of Birth must be a valid date and cannot be in the future.";
            isValid = false;
        }

        const country = countryRef.current?.value || "";
        if (!country) {
            newErrors.country = "Country is required.";
            isValid = false;
        }

        const city = cityRef.current?.value || "";
        if (!city) {
            newErrors.city = "City is required.";
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            alert("Form is valid!");
        }
    };

    const selectedCities = selectedCountryIndex !== null 
        ? locationData[selectedCountryIndex].cities 
        : [];

    return (
        <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded">
            <h1 className="text-2xl font-bold mb-6">User Registration</h1>
            <form>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        ref={nameRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded" 
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                    <input 
                        type="text" 
                        id="lastName" 
                        ref={lastNameRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded"  
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        ref={emailRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded" 
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        ref={passwordRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded"  
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        ref={confirmPasswordRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded" 
                     />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="dob" className="block text-gray-700">Date of Birth</label>
                    <input 
                        type="date" 
                        id="dob" 
                        ref={dobRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded" 
                        max={new Date().toISOString().split("T")[0]}
                    />
                    {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="country" className="block text-gray-700">Country</label>
                    <select 
                        id="country" 
                        ref={countryRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded" 
                        onChange={handleCountryChange}
                    >
                        <option value="">Select a country</option>
                        {locationData.map((loc, index) => (
                            <option key={loc.country} value={index}>
                                {loc.country}
                            </option>
                        ))}
                    </select>
                    {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="city" className="block text-gray-700">City</label>
                    <select 
                        id="city" 
                        ref={cityRef}
                        className="w-full px-3 py-2 border border-gray-300 rounded" 
                    >
                        <option value="">Select a city</option>
                        {selectedCities.map(city => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <button 
                    type="submit" 
                    onClick={validateForm}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};
