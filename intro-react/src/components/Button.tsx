
type ButtonProps = {
    text: String,
    id: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button(props: ButtonProps) {
    const { text, id, onClick } = props
    return (
        <button className={id} onClick={onClick}>
          {text}
        </button>
      );
}