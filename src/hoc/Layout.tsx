import Footer from "@/components/Footer/Footer";
import {DefaultContainer} from "@/hoc/Wrappers/DefaultContainer";
import {Wrapper} from "@/hoc/Wrappers/Wrapper";
import {PropsWithChildren} from "react";
import Header from "@/components/Header/Header";

export default function Layout({ children }: PropsWithChildren) {
    return (<DefaultContainer>
        <Wrapper>
            <Header/>
            <main>{children}</main>
            <Footer />
        </Wrapper>
    </DefaultContainer>)
}