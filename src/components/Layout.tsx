import React, {ReactNode} from 'react';
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
    children?: ReactNode;
}

const Layout: React.FC<{ children?: React.ReactNode }>  = ({ children }: LayoutProps) => {
    return (
        <div className="layout">
            <Header/>
            <main className="sm:w-full md: w-full lg:w-[90%] ml-auto mr-auto main-container">
                {children}
            </main>
            <Footer/>
        </div>
    );
}


export default Layout;