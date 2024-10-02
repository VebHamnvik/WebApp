import Todo from './Todo';
import { TodoItem } from '../types';


type TodosProps = {
    todos: TodoItem[];
    onComplete: (index: number) => void;
}


export default function Todos(props: TodosProps) {
  const { todos, onComplete } = props;

  return (
    <div className="todos">
        
        {todos.map((todo, index) => (
            <Todo
            key={index}
            title={todo.title}
            content={todo.content}
            onComplete={() => onComplete(index)}
            />
        ))}
    </div>
  );
}