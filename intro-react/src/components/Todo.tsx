import Button from "./Button";

type TodoProps = {
    title: string;
    content: string;
    onComplete: () => void;
}

export default function Todo(props: TodoProps) {
    const { title, content, onComplete } = props;

    return (
        <div className="todo">
          <h3>{title}</h3>
          <p>{content}</p>
          <Button text="Complete" id="complete-button" onClick={onComplete}/>
        </div>
      );


}