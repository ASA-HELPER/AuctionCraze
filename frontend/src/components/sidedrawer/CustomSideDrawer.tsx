import { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { TiContacts } from "react-icons/ti";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./customSideDrawer-styles.scss";
import { logout } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../hooks/storeHooks";
import { ROUTES } from "../../constants/route-constants";
import { navbarMenuItems } from "../../constants/common-constants";

const CustomSideDrawer = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, user } = useSelector((state: any) => state.user);

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLinkClick = () => {
    setShow(false);
  };

  return (
    <>
      <div onClick={() => setShow(!show)} className="sideDrawer__hamburger">
        <GiHamburgerMenu />
      </div>
      <div
        className={`sideDrawer__container ${show ? "sideDrawer__open" : ""}`}
      >
        <div className="sideDrawer__content">
          <Link to={ROUTES.HOME} onClick={handleLinkClick}>
            <h4 className="sideDrawer__logo">
              Auction<span className="sideDrawer__logoHighlight">Craze</span>
            </h4>
          </Link>
          <ul className="sideDrawer__menu">
            <li>
              <Link
                to={navbarMenuItems[0].path}
                className="sideDrawer__menuLink"
                onClick={handleLinkClick}
              >
                <RiAuctionFill /> {navbarMenuItems[0].label}
              </Link>
            </li>
            <li>
              <Link
                to={navbarMenuItems[1].path}
                className="sideDrawer__menuLink"
                onClick={handleLinkClick}
              >
                <MdLeaderboard /> {navbarMenuItems[1].label}
              </Link>
            </li>
            {isAuthenticated && user && user.role === "Auctioneer" && (
              <>
                <li>
                  <Link
                    to={navbarMenuItems[5].path}
                    className="sideDrawer__menuLink"
                    onClick={handleLinkClick}
                  >
                    <FaFileInvoiceDollar /> {navbarMenuItems[5].label}
                  </Link>
                </li>
                <li>
                  <Link
                    to={navbarMenuItems[4].path}
                    className="sideDrawer__menuLink"
                    onClick={handleLinkClick}
                  >
                    <IoIosCreate /> {navbarMenuItems[4].label}
                  </Link>
                </li>
                <li>
                  <Link
                    to={navbarMenuItems[6].path}
                    className="sideDrawer__menuLink"
                    onClick={handleLinkClick}
                  >
                    <FaEye /> {navbarMenuItems[6].label}
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && user && user.role === "Admin" && (
              <li>
                <Link
                  to={navbarMenuItems[8].path}
                  className="sideDrawer__menuLink"
                  onClick={handleLinkClick}
                >
                  <MdDashboard /> {navbarMenuItems[8].label}
                </Link>
              </li>
            )}
          </ul>

          {!isAuthenticated ? (
            <div className="sideDrawer__authButtons">
              <Link
                to={navbarMenuItems[9].path}
                className="sideDrawer__signUp"
                onClick={handleLinkClick}
              >
                {navbarMenuItems[9].label}
              </Link>
              <Link
                to={navbarMenuItems[10].path}
                className="sideDrawer__login"
                onClick={handleLinkClick}
              >
                {navbarMenuItems[10].label}
              </Link>
            </div>
          ) : (
            <div className="sideDrawer__authButtons" onClick={handleLogout}>
              <button className="sideDrawer__logout">Logout</button>
            </div>
          )}

          <hr className="sideDrawer__divider" />

          <ul className="sideDrawer__menu">
            {isAuthenticated && (
              <li>
                <Link
                  to={navbarMenuItems[7].path}
                  className="sideDrawer__menuLink"
                  onClick={handleLinkClick}
                >
                  <FaUserCircle /> {navbarMenuItems[7].label}
                </Link>
              </li>
            )}
            <li>
              <Link
                to={navbarMenuItems[2].path}
                className="sideDrawer__menuLink"
                onClick={handleLinkClick}
              >
                <SiGooglesearchconsole /> {navbarMenuItems[2].label}
              </Link>
            </li>
            <li>
              <Link
                to={navbarMenuItems[3].path}
                className="sideDrawer__menuLink"
                onClick={handleLinkClick}
              >
                <BsFillInfoSquareFill /> {navbarMenuItems[3].label}
              </Link>
            </li>
            <li>
              <Link
                to={navbarMenuItems[11].path}
                className="sideDrawer__menuLink"
                onClick={handleLinkClick}
              >
                <TiContacts /> {navbarMenuItems[11].label}
              </Link>
            </li>
          </ul>

          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="sideDrawer__closeIcon"
          />
        </div>
      </div>
    </>
  );
};

export default CustomSideDrawer;
