import Title from "./Title"
import React from 'react';


type componentType = {
    title: string
}

export default function MyComponent(props: componentType) {
    const { title }  = props
    return (
        <Title title = { title} />
    )
}