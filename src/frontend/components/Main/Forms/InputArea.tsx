type InputAreaType = {
    id: string;
    placeholder: string;
    name: string;
    value: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputArea(props: InputAreaType) {
    const { id, placeholder, name, value, type, onChange} = props;
    return (
        <>
        <label htmlFor={name}>{placeholder}</label>
        <input
            className="formInput"
            placeholder={placeholder}
            id={id}
            name={name}
            type={type}
            value={value}
            required
            onChange={onChange}
        />
        </>
    )
}