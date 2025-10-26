import {List} from "antd";
import {footerPoints} from "../configData/data";
import {NavLink} from "react-router-dom";
import {FooterRoutesKey} from "../configData/Routes";

const Footer = () => {
    const handleRoute = () => {

    }


    return (
        <div>
        <div className="footerImg" style={{height: '200px'}}></div>
    <div className="footer-container">

        <div className="footer-main-container">
            <ul>
                {footerPoints.map((item:string) => {
                    return <li key={item}>
                        <NavLink  key={item+'route'} to={FooterRoutesKey[item]}>
                            {item}
                        </NavLink></li>
                })}
            </ul>
        </div>
        <div className="footer-copyright">
            <span>Copyright @2025, RunningWay</span>
        </div>
    </div>
        </div>)
}
export default Footer