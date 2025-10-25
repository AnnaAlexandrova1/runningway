import React, {ReactNode} from 'react';
import Header from "./Header";

interface LayoutProps {
    children?: ReactNode;
}

const Layout: React.FC<{ children?: React.ReactNode }>  = ({ children }: LayoutProps) => {
    return (
        <div className="layout">
            <Header/>
            <main className="main-container" style={{border: "1px solid orange"}}>
                {children}
            </main>
        </div>
    );
}


export default Layout;