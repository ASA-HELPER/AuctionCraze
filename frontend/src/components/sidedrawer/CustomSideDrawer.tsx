import { useEffect, useState } from "react";
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
import { navbarMenuItems, ROLES } from "../../constants/common-constants";
import { RootState } from "../../store/store";
import customSideDrawerCopy from "./customSideDrawer.copy";

const CustomSideDrawer = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const handleLinkClick = () => {
    setShow(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setShow(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
              {customSideDrawerCopy.title.firstPart}
              <span className="sideDrawer__logoHighlight">
                {customSideDrawerCopy.title.secondPart}
              </span>
            </h4>
          </Link>
          <ul className="sideDrawer__menu">
            <li>
              <Link
                to={navbarMenuItems[0].path}
                className="sideDrawer__menuLink"
                onClick={handleLinkClick}
              >
                <RiAuctionFill size={20} /> {navbarMenuItems[0].label}
              </Link>
            </li>
            <li>
              <Link
                to={navbarMenuItems[1].path}
                className="sideDrawer__menuLink"
                onClick={handleLinkClick}
              >
                <MdLeaderboard size={20} /> {navbarMenuItems[1].label}
              </Link>
            </li>
            {isAuthenticated && user && user.role === ROLES[0] && (
              <>
                <li>
                  <Link
                    to={navbarMenuItems[5].path}
                    className="sideDrawer__menuLink"
                    onClick={handleLinkClick}
                  >
                    <FaFileInvoiceDollar size={20} /> {navbarMenuItems[5].label}
                  </Link>
                </li>
                <li>
                  <Link
                    to={navbarMenuItems[4].path}
                    className="sideDrawer__menuLink"
                    onClick={handleLinkClick}
                  >
                    <IoIosCreate size={20} /> {navbarMenuItems[4].label}
                  </Link>
                </li>
                <li>
                  <Link
                    to={navbarMenuItems[6].path}
                    className="sideDrawer__menuLink"
                    onClick={handleLinkClick}
                  >
                    <FaEye size={20} /> {navbarMenuItems[6].label}
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && user && user.role === ROLES[2] && (
              <li>
                <Link
                  to={navbarMenuItems[8].path}
                  className="sideDrawer__menuLink"
                  onClick={handleLinkClick}
                >
                  <MdDashboard size={20} /> {navbarMenuItems[8].label}
                </Link>
              </li>
            )}
          </ul>

          {!isAuthenticated ? (
            <div className="sideDrawer__authButtons">
              <Link
                to={navbarMenuItems[9].path}
                className="sideDrawer__login"
                onClick={handleLinkClick}
              >
                {navbarMenuItems[9].label}
              </Link>
              <Link
                to={navbarMenuItems[10].path}
                className="sideDrawer__signUp"
                onClick={handleLinkClick}
              >
                {navbarMenuItems[10].label}
              </Link>
            </div>
          ) : (
            <div className="sideDrawer__authButtons" onClick={handleLogout}>
              <button className="sideDrawer__logout">
                {customSideDrawerCopy.buttonTitle}
              </button>
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
                  <FaUserCircle size={20} /> {navbarMenuItems[7].label}
                </Link>
              </li>
            )}
            <li>
              <Link
                to={navbarMenuItems[2].path}
                className="sideDrawer__menuLink"
                onClick={handleLinkClick}
              >
                <SiGooglesearchconsole size={20} /> {navbarMenuItems[2].label}
              </Link>
            </li>
            <li>
              <Link
                to={navbarMenuItems[3].path}
                className="sideDrawer__menuLink"
                onClick={handleLinkClick}
              >
                <BsFillInfoSquareFill size={20} /> {navbarMenuItems[3].label}
              </Link>
            </li>
            <li>
              <Link
                to={navbarMenuItems[11].path}
                className="sideDrawer__menuLink"
                onClick={handleLinkClick}
              >
                <TiContacts size={20} /> {navbarMenuItems[11].label}
              </Link>
            </li>
          </ul>

          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="sideDrawer__closeIcon"
            size={20}
          />
        </div>
      </div>
    </>
  );
};

export default CustomSideDrawer;
