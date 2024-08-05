type SelectComponentProps = {
    value: string | string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    label: string;
    multiple?: boolean;
};

export const SelectComponent: React.FC<SelectComponentProps> = ({ value, onChange, options, label, multiple = false }) => {
    return (
        <div className="mb-4">
            <label className="mr-2">{label}:</label>
            <select multiple={multiple} value={value} onChange={onChange} className="border p-2 w-full">
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};