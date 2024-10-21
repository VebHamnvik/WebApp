import type { PropsWithChildren } from "react";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";

type LayoutProps = PropsWithChildren;

export default function Layout(props: LayoutProps) {
    const { children } = props;

    return (
        <>
        <Header />
        <main className="layout">{children}</main>
        <Footer />
        </>
      );
}