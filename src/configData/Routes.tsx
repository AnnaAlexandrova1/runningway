import React from "react";
import {IObjecLiteral, IRouteElement} from "../interfaces/interfaces";
import DrowRaceResult from "../pages/DrowRaceResult/DrowRaceResult";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import {footerPoints} from "./data";

// @ts-ignore
export const RoutesList: IRouteElement[]  = [
    {
        path: "/",
        component: <DrowRaceResult />,
        // protected_route: true,
    },
    {
        path: "/about",
        component: <AboutUs />,
        // protected_route: true,
    },
    {
        path: "/contact",
        component: <ContactUs />,
        // protected_route: true,
    },
    ]

export const FooterRoutesKey: IObjecLiteral = {
    ['О нас']: "/about",
    ['Пожелания и предложения']: "/contact"
}