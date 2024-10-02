import { useState } from "react";


export default function Counter() {
    const [ count, setCount ] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={increment}>Increment count</button>
            <button onClick={decrement}>Decrement count</button>
        </div>
    )

}