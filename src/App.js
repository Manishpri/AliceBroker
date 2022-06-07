
import React from "react";

import { Route,  Routes,  } from "react-router";
import MainLayout from "./Component/MainLayout/MainLayout";
import ChartingApiKey from "./Pages/ChartingApiKey/ChartingApiKey";
import ContactUs from "./Pages/ContactUs";
import UserPanel from "./Pages/UserPanel/UserPanel";
import OrderHistory from "./Pages/OrderHistory/OrderHistory";
import Settings from "./Pages/Settings/Settings";
import Tutorials from "./Pages/Tutorials";
import AddNewUser from "./Pages/AddNewUser/AddNewUser";
import OpenPositions from "./Pages/OpenPostions/OpenPostions";
import ProfitLossReport from "./Pages/Settings/components/ProfitLossReport/ProfitLossReport";
import LoginModal  from "./Component/LoginModal/LoginModal";


function App() {
  // const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [loading, setLoading] = useState(true);
  // const [token, setToken] = useState(null);

  // const currentToken = useSelector((state) => state.Auth.token);

  // useEffect(() => {
  //   let search = {};
  //   console.log(window.location.search);
  //   if (window.location.search.length) {
  //       window.location.search
  //         .substring(1)
  //         .split("&")
  //         .map((a) => {
  //           let b = a.split("=");
  //           search[b[0]] = b[1];
  //         });

  //       if ("token" in search && "name" in search && "role" in search) {
  //         let { token, name, role } = search;
  //         name = name.replace(/%20/g, " ");
  //         setIsLoggedIn(true);
  //         setToken(token);
  //         localStorage.setItem("authToken", token);
  //         localStorage.setItem("name", name);
  //         navigate("/");
  //       }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (currentToken) {
  //     setToken(currentToken);
  //   }
  // }, [currentToken]);

  // useEffect(() => {
  //   window.addEventListener("storage", (ev) => {
  //     const tokenValue = localStorage.getItem("authToken");
  //     setToken(tokenValue);
  //   });
  //   const tokenValue = localStorage.getItem("authToken");
  //   setToken(tokenValue);
  // }, []);

  // useEffect(() => {
  //   if (token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  //   setLoading(false);
  // }, [token]);

  // if (loading) {
  //   return (
  //     <Spin
  //       style={{
  //         width: "100vw",
  //         height: "100vh",
  //         alignItems: "center",
  //         display: "flex",
  //         justifyContent: "center",
  //       }}
  //       size="large"
  //     />
  //   );
  // }

  return  (
    <MainLayout>
      <Routes>
      <Route path="/userpanel" element={<UserPanel/>}/>
        <Route path="/addnewuser" element={<AddNewUser/>}></Route>
        <Route path="/charting-api-key" element={<ChartingApiKey />} />
        
        <Route path="/open-positions" element={<OpenPositions />} />
        <Route path="/order-history" element={<OrderHistory />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/tutorials" element={<Tutorials/>} />
       
        <Route path="/profit-loss-report" element={<ProfitLossReport />} />
        <Route path="/" element={< LoginModal />} />
      </Routes>
    </MainLayout>
  )
  //  : (
  //   <Routes>
  //     <Route path="/" element={<Login />} />
  //   </Routes>
  // );
}

export default App;
