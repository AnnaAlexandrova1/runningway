import {FooterRoutesKey} from "../configData/Routes";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <NavLink to="/">
                    <div className="logo">
                        <img src="/assets/logo.png" alt="logo" style={{width: "105px", height: "70px"}}/>
                    </div>
                </NavLink>
            </div>
        </header>
    )
}

export default Header;