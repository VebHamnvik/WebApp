
type TitleProps = {
    title: String
    }

export default function Title(props: TitleProps) {
    const { title } = props

    return (
        <h2 className = "title">{ title }</h2>
    )

}