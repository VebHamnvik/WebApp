import Title from "./Title";

type NavbarProps = {
    title: String,
    text: String
}


export default function Navbar(props: NavbarProps ) {
    const { title, text } = props
    return (
        <nav className="navbar">
          <Title title={title}/>
          <div className="navbar-text">{text}</div>
        </nav>
      );
}