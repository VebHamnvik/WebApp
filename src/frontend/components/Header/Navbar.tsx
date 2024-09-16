import NavbarIcon from './NavbarIcon';

export default function Navbar() {
  return (
    <nav>
        <NavbarIcon label="Home" href="/" />
        <NavbarIcon label="Projects" href="/" />
        <NavbarIcon label="About" href="/" />
        <NavbarIcon label="Contact" href="/" />
    </nav>
  );
}