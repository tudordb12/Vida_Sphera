
import Dashboard from "layouts/dashboard";
import Home from "layouts/home";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Assistant from "layouts/assistant";
import NewsFeed from "layouts/feed";


import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill, BsNewspaper } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { MdAssistant } from "react-icons/md";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Your Feed",
    key: "feed",
    route: "/feed",
    icon: <BsNewspaper size="15px" color="inherit" />,
    component: NewsFeed,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Assistant",
    key: "assistant",
    route: "/assistant",
    icon: <MdAssistant size="15px" color="inherit" />,
    component: Assistant,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: SignUp,
    noCollapse: true,
  },
  { type: "title", title: "HOMEPAGE", key: "homepage" },
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <IoHome size="15px" color="inherit" />,
    component: Home,
    noCollapse: true,
  },
 
];

export default routes;
