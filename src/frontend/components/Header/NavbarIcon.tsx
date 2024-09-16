type NavbarIconProps = {
    label: string;
    href: string; // Add href as a prop for the link URL
  };

export default function NavbarIcon(props: NavbarIconProps){
    const { label, href } = props
    
    return (
    <a href={href} className="header-button">
      {label}
    </a>
    )
}