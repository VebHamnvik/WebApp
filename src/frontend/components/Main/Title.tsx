export type TitleType = {
    title: string
}

export default function Title(props: TitleType) {
    const { title } = props


    return (
        <article>
            <h2>{ title }</h2>
        </article>
    )
}