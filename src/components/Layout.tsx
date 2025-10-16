import React, {ReactNode} from 'react';
import Header from "./Header";

interface LayoutProps {
    children?: ReactNode;
}

const Layout: React.FC<{ children?: React.ReactNode }>  = ({ children }: LayoutProps) => {
    return (
        <div className="layout">
            <Header/>
            <main className="main-container">
                {children}
            </main>
        </div>
    );
}


export default Layout;