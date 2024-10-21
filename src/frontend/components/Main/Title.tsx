export type TitleType = {
    title: string
    id: string
}

export default function Title(props: TitleType) {
    const { title, id } = props


    return (
        <h2 id={id}>{ title }</h2>
    )
}