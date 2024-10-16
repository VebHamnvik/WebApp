type InputAreaType = {
    id: string;
    placeholder: string;
    name: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputArea(props: InputAreaType) {
    const { id, placeholder, name, type, onChange} = props;
    return (
        <>
        <label htmlFor={name}>{placeholder}</label>
        <input
            className="formInput"
            placeholder={placeholder}
            id={id}
            name={name}
            type={type}
            required
            onChange={onChange}
        />
        </>
    )
}