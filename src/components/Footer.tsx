import {List} from "antd";
import {footerPoints} from "../configData/data";
import {NavLink} from "react-router-dom";
import {FooterRoutesKey} from "../configData/Routes";

const Footer = () => {
    return (
        <div>
            <div className="footer-img lg:h-[200px] md:h-[120px] h-[80px]"></div>
            <div className="footer-container flex-col-reverse md:flex-row lg:flex-row text-[15px] md:text-[16px] lg:text-[18px]">
                <div className="footer-copyright mt-5 md:mt-0 lg:mt-0">
                    <span>Copyright @2025, RunningWay</span>
                </div>

                <div className="footer-main-container">
                    <ul>
                        {footerPoints.map((item: string) => {
                            return <li key={item} className="pl-[15px] pr-[15px] md:pl-[30px] lg:pr-[40px] md:pl-[40px]">
                                <NavLink key={item + 'route'} to={FooterRoutesKey[item]}>
                                    {item}
                                </NavLink></li>
                        })}
                    </ul>
                </div>
            </div>
        </div>)
}
export default Footer