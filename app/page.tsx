import { Analytics } from "@vercel/analytics/react";

import { Home } from "./components/home";

import { getServerSideConfig } from "./config/server";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

const serverConfig = getServerSideConfig();

export default async function App() {
  return (
    <>
      {/* <Router> */}
        <Home />
        {serverConfig?.isVercel && <Analytics />}
      {/* </Router> */}
    </>
  );
}
