import BWithUs from "@/pages/static/BWithUs";
import Terms from "@/pages/static/Terms";
import About from "@/pages/static/About";
import Help from "@/pages/static/Help";
import Contact from "@/pages/static/Contact";

export default [
  {
    path: "/business-with-us",
    name: "BWithUs",
    component: BWithUs
  },
  {
    path: "/terms",
    name: "terms",
    component: Terms
  },  
  {
    path: "/about",
    name: "about",
    component: About
  },
  {
    path: "/help",
    name: "help",
    component: Help
  },
  {
    path: "/contact",
    name: "contact",
    component: Help
  },
];
