type FooterTextProps = {
    text: string;
  }

export default function FooterText(props: FooterTextProps){
    const { text } = props

    return (
        <p>{ text }</p>
    )
}