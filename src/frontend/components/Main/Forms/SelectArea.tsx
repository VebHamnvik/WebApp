type SelectAreaProps = {
    id: string;
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
  };

export default function SelectArea(props: SelectAreaProps) {
const { id, label, name, value, onChange, options } = props;

return (
    <>
    <label htmlFor={name}>{label}</label>
    <select className="formInput" id={id} name={name} value={value} onChange={onChange}>
        <option value="">Select...</option> {}
        {options.map((option, index) => (
        <option key={index} value={option.value}>
            {option.label}
        </option>
        ))}
    </select>
    </>
);
}