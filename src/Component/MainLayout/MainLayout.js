import React, { useEffect, useState } from "react";
import {
  Avatar,
  BackTop,
  Badge,
  Button,
  Divider,
  Dropdown,
  Layout,
  Menu,
  message,
  Popover,
} from "antd";
import {
  HiOutlineSwitchVertical,
  HiChip,
  HiCursorClick,
  HiAcademicCap,
  HiShoppingBag,
  HiPlay,
  HiPhone,
  HiCog,
  HiHome,
  HiBell,
  HiOutlineMenu,
  HiArrowUp,
  HiArrowDown,
  HiOutlineLogout,
} from "react-icons/hi";
import "./MainLayout.scss";
import dematadeDarkLogo from "../../Assets/Images/dematade-dark-logo.png";
import DLogo from "../../Assets/Images/D.svg";

import avatarImage from "../../Assets/Images/avatar.png";
import { useLocation, useNavigate } from "react-router";
import LoginModal from "../LoginModal/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { getBrokerLoginStatus } from "../../Redux/Actions/BrokerActions";
import { getOpenPositions } from "../../Redux/Actions/positionsActions";
import Package from "../../../package.json";
import {HiCurrencyRupee} from 'react-icons/hi'
const { Header, Content, Sider, Footer } = Layout;

function MainLayout(props) {
  // let dealerName = userData.data.user.name
  const [collapsed, setCollpsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const dispatch = useDispatch();
  const [positionsData, setPositionsData] = useState([]);
  const [overviewAmount, setOverviewAmount] = useState(0);
  const positions = useSelector((state) => state.Positions.positions);
  const userName = useSelector((state) => state.Auth.userName);
  const nameFromStorge = localStorage.getItem("name");
  const [activeKey, setActiveKey] = useState("");
  const userId = localStorage.getItem('userId');
  const brokerName = localStorage.getItem('userName');

  
  

  

  useEffect(() => {
    dispatch(getOpenPositions());
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/userpanel":
        setActiveKey("userpanel");
        break;
      case "/open-positions":
        setActiveKey("Open Positions");
        break;
      case "/charting-api-key":
        setActiveKey("Charting Api Key");
        break;
    
      case "/strategic":
        setActiveKey("Strategic");
        break;
      case "/order-history":
        setActiveKey("Order History");
        break;
      case "/profit-loss-report":
        setActiveKey("Profit Loss Report");
        break;
        case "/tutorials":
          setActiveKey("Tutorials");
          break;
      case "/contact-us":
        setActiveKey("Contact Us");
        break;
      // case "/settings":
      //   setActiveKey("Settings");
      //   break;
      default:
        setActiveKey("Home");
    }
  }, [location.pathname]);

  useEffect(() => {
    setPositionsData(positions || []);
  }, [positions]);

  useEffect(() => {
    if (positionsData?.length) {
      const sum = positionsData?.reduce(
        (partialSum, a) => partialSum + a?.MtoM,
        0
      );
      setOverviewAmount(sum);
    }
  }, [positionsData]);


  const NotificationContent = (
    <div className="notification-content-wrap">
      {[1, 2, 3, 4, 5, 6]?.map((item) => (
        <>
          <div className="single-noti-wrap">
            <span className="notification-title">Notification Title</span>
            <span className="noti-content">
              This is a sample notification. This is a sample notification.
            </span>
            <div className="noti-footer-wrap">
              <span className="noti-time">05:42 PM</span>
              <span className="view-noti">View Now</span>
            </div>
          </div>
          <Divider />
        </>
      ))}
    </div>
  );

  const notificationTitle = (
    <div className="notification-title-wrap">
      <span className="noti-text">Notifications</span>
      <span className="clear-text">Clear All</span>
    </div>
  );

  return (
    <Layout className="main-layout">
      <Sider
        collapsible
        collapsed={collapsed}
        collapsedWidth={80}
        trigger={null}
        width={255}
        className="site-layout-background"
      >
        {collapsed ? (
          <div className="d-logo-wrap">
            <img className="d-logo" src={DLogo} alt="" />
          </div>
        ) : (
          <div className="logo-wrap">
            <img src={dematadeDarkLogo} alt="" />
          </div>
        )}
        <Menu
          mode="inline"
          selectedKeys={[activeKey]}
          // defaultSelectedKeys={["Home"]}
          style={{ borderRight: 0 }}
        >
          <Menu.Item
            onClick={() => navigate("/userpanel")}
            key={"userpanel"}
            icon={<HiHome />}
          >
           User Panel
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/open-positions")}
            key={"Open Positions"}
            icon={<HiOutlineSwitchVertical/>}
          >
           Open Position
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/charting-api-key")}
            key={"Charting Api Key"}
            icon={<HiChip />}
          >
            Charting Api Key
          </Menu.Item>
          {/* <Menu.Item
            onClick={() => navigate("/onetouch-trading")}
            key={"One Touch Trading"}
            icon={<HiCursorClick />}
          >
            One Touch Trading
          </Menu.Item> */}
          <Menu.Item
            onClick={() => navigate("/order-history")}
            key={"Order History"}
            icon={<HiShoppingBag />}
          >
            Order History
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/profit-loss-report")}
            key={"Profit Loss Report"}
            icon={<HiCurrencyRupee />}
          >
            Profit & Loss Report
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("/tutorials")}
            key={"Tutorials"}
            icon={<HiPlay/>}
          >
            Tutorials
          </Menu.Item>
          {/* <Divider className="side-menu-divider" /> */}
         
          <Menu.Item
            onClick={() => navigate("/contact-us")}
            key={"Contact Us"}
            icon={<HiPhone />}
          >
            Contact Us
          </Menu.Item>
          {/* <Menu.Item
            onClick={() => navigate("/settings")}
            key={"Settings"}
            icon={<HiCog />}
          >
            Settings
          </Menu.Item> */}
          {/* <Menu.Item
            key={"app-version"}
          >
            Version: v{Package.version}
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout>
        <Header className="header">
          {/* <div className="dashboard-top-panel">
            <div className="left-section">
             
            </div>
            <div className="header-right">
              <Popover
                content={NotificationContent}
                title={notificationTitle}
                trigger="click"
                placement="bottom"
                className="notification-popover"
              >
                <Badge dot offset={[-5, 5]}>
                  <HiBell size={24} color="#012BFE" />
                </Badge>
              </Popover>
              <span className="username">
                {userName || nameFromStorge || "John Doe"}
              </span>
              <Dropdown
                arrow={true}
                trigger={["click"]}
                overlay={
                  <Menu>
                    <Menu.Item
                      onClick={() => {
                        window.localStorage.clear();
                        window.location.href = "https://www.dematadesolution.com/";
                      }}
                      key="1"
                      icon={<HiOutlineLogout />}
                    >
                      Logout
                    </Menu.Item>
                  </Menu>
                }
              >
                <Avatar style={{ cursor: "pointer" }} src={avatarImage} />
              </Dropdown>
            </div>
          </div> */}

          <div className="dashboard-top-panel">
            <div className="left-section">
            <HiOutlineMenu style={{width:"28px" ,height:"28px"}}
                onClick={() => setCollpsed(!collapsed)}
                className="burger-menu-icon"
              />
              <span className="label">NIFTY NFO</span>
              <HiArrowUp className="arrow-up" />
              <div className="value success">
                <span>123456789.OO</span>
              </div>
              <span className="label">NIFTY NFO</span>
              <HiArrowDown className="arrow-down" />
              <div className="value error">
                <span>123456789.OO</span>
              </div>
              <span className="label">Overview</span>
              {overviewAmount < 0 ? (
                <div className="value error">
                  <span>{overviewAmount}</span>
                </div>
              ) : (
                <div className="value success">
                  <span>+{overviewAmount}</span>
                </div>
              )}
            </div>
            <div className="left-section">
              <Popover
                content={NotificationContent}
                title={notificationTitle}
                trigger="click"
                placement="bottom"
                className="notification-popover"
              >
                <Badge dot offset={[-5, 5]} >
                  <HiBell size={24} color="#012BFE" />
                </Badge>
              </Popover>
              <span className="username" style={{marginLeft:'22px'}}>
                {brokerName}
              </span>
              <Dropdown
                arrow={true}
                trigger={["click"]}
                overlay={
                  <Menu>
                    <Menu.Item
                      onClick={() => {
                        window.localStorage.clear();
                        navigate("/")
                      }}
                      key="1"
                      icon={<HiOutlineLogout />}
                    >
                      Logout
                    </Menu.Item>
                  </Menu>
                }
              >
                <Avatar style={{ cursor: "pointer",marginLeft:'24px' }} src={avatarImage} />
              </Dropdown>
            </div>
          </div>
        </Header>

        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright ©2021 All rights reserved by @ De-Madate-Trading-Solutions
          Privacy Policy DeMatade 2022
        </Footer>
        <BackTop />
      </Layout>
    </Layout>
  );
}

export default MainLayout;
