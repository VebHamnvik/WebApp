type TextAreaType = {
    id: string;
    placeholder: string;
    name: string;
    value: string;
    rows?: number;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea(props: TextAreaType) {
    const { id, placeholder, name, value, rows = 4, onChange} = props;
    return (
        <>
        <label htmlFor={name}>{placeholder}</label>
        <textarea
            className="formInput"
            id={id}
            name={name}
            placeholder={placeholder}
            rows={rows}
            value={value}
            onChange={onChange}
        />
        </>
    )
}