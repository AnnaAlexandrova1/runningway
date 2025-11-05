import {FooterRoutesKey} from "../configData/Routes";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <div className="header-container sm:w-full md:w-full lg:min-w-[1200px] lg:w-[70%] ml-auto mr-auto">
                <NavLink to="/">
                    <div>
                        <img src="/assets/logo.png" alt="logo" style={{width: "105px", height: "70px", marginLeft: "10px"}} />
                    </div>
                </NavLink>
            </div>
        </header>
    )
}

export default Header;