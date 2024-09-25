
type titleProps = {
    title: string
}

export default function Title(props: titleProps){
    const { title } = props

    return (
        <h1>{ title }</h1>
    )
}