import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import logger from "sabio-debug";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Dropdown,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import DotBadge from "../../dashboard/navbars/utils/DotBadge";
import Logo from "assets/images/brand/logo/logo.svg";
import NotificationList from "../../dashboard/navbars/utils/Notification";
import NavDropdownMain from "layouts/marketing/navbars/NavDropdownMain";
import userService from "services/userService";
import swal from "sweetalert2";
import allRoutes from "../../../routes/securedRoutes";
import allPublicRoutes from "../../../routes/publicRoutes";
import { v4 as uuid } from "uuid";

const _logger = logger.extend("NavbarDefault");

const NavbarDefault = (props, headerstyle) => {
  const user = props.loggedInUser;
  _logger("Current user", user);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const onLoginClick = () => {
    navigate("/signin");
  };

  const onRegisterClick = () => {
    navigate("/signup");
  };

  const onLogoutClick = () => {
    userService.logoutUser().then(onLogoutUserSuccess).catch(onLogoutUserFail);
  };

  const onLogoutUserSuccess = (response) => {
    _logger("logoutUser Success", response);
    swal
      .fire({
        icon: "success",
        title: "Sign Out Successful!",
        confirmButtonText: "Close",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/", { state: { type: "LOGOUT" } });
        }
      });
  };

  const onLogoutUserFail = (error) => {
    _logger("logoutUser error", error);
    swal.fire({
      title: "Logout Unsuccessful",
      icon: "error",
      confirmButtonText: "OK",
    });
  };
  /*        PRIVATE USER ROUTES*/
  function createPrivateUserRoutes(userRoutesArray) {
    let checkUser = props;
    var formattedNavItem = {};
    if (!userRoutesArray.roles) {
      formattedNavItem = {
        id: uuid(),
        menuitem: userRoutesArray.name,
        link: userRoutesArray.path,
      };
      if (userRoutesArray.children) {
        if (userRoutesArray.children.roles) {
          for (let i = 0; i < checkUser.loggedInUser.roles.length; i++) {
            if (
              userRoutesArray.children.roles.includes(
                checkUser.loggedInUser.roles[i]
              )
            ) {
              formattedNavItem.children = {
                id: uuid(),
                menuitem: userRoutesArray.children.name,
                link: userRoutesArray.children.path,
              };
            }
          }
        }
      }
    } else {
      for (let i = 0; i < checkUser.loggedInUser.roles.length; i++) {
        if (userRoutesArray.roles.includes(checkUser.loggedInUser.roles[i])) {
          formattedNavItem = {
            id: uuid(),
            menuitem: userRoutesArray.name,
            link: userRoutesArray.path,
          };
        }
      }
    }
    return formattedNavItem;
  }

  /*  PUBLIC USER ROUTES*/

  function createPublicUserRoutes(userRoutesArray) {
    var formattedNavItem = {};
    formattedNavItem = {
      id: uuid(),
      menuitem: userRoutesArray.name,
      link: userRoutesArray.path,
    };
    if (userRoutesArray.children) {
      formattedNavItem.children = {
        id: uuid(),
        menuitem: userRoutesArray.children.name,
        link: userRoutesArray.children.path,
      };
    }
    return formattedNavItem;
  }

  function filterEmpty(ele) {
    return Object.keys(ele).length !== 0;
  }

  let userFilteredRoutes = allRoutes.map(createPrivateUserRoutes);
  let userFilteredRoutes2 = [];
  let publicFilteredRoutes = allPublicRoutes.map(createPublicUserRoutes);
  userFilteredRoutes2[0] = {
    id: uuid(),
    menuitem: "Public",
    link: "#",
    children: publicFilteredRoutes,
  };
  userFilteredRoutes2[1] = {
    id: uuid(),
    menuitem: "User",
    link: "#",
    children: userFilteredRoutes.filter(filterEmpty),
  };

  const [expandedMenu, setExpandedMenu] = useState(false);

  const QuickMenu = () => {
    return (
      <Fragment>
        <Dropdown
          as={Nav.Item}
          className={`${isDesktop || isLaptop ? "mt-2 me-0" : "mt-2 me-2"}`}
        >
          <Dropdown.Toggle
            as={Nav.Link}
            bsprefix="dt"
            className="text-dark icon-notifications me-lg-1  btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted"
            id="dropdownNotification"
          >
            <i className="fe fe-bell"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu
            show={isDesktop ? true : false}
            className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end mt-4 py-0"
            aria-labelledby="dropdownNotification"
            align="end"
          >
            <div className="border-bottom px-3 pt-3 pb-3 d-flex justify-content-between align-items-end">
              <span className="h4 mb-0">Notifications</span>
              <Link to="# " className="text-muted">
                <span className="align-middle">
                  <i className="fe fe-settings me-1"></i>
                </span>
              </Link>
            </div>
            <SimpleBar style={{ maxHeight: "300px" }}>
              <ListGroup variant="flush">
                {NotificationList.map(function (item, index) {
                  return (
                    <ListGroup.Item
                      className={index === 0 ? "bg-light" : ""}
                      key={index}
                    >
                      <Row>
                        <Col>
                          <Link className="text-body" to="#">
                            <div className="d-flex">
                              <Image
                                src={item.image}
                                alt=""
                                className="avatar-md rounded-circle"
                              />
                              <div className="ms-3">
                                <h5 className="fw-bold mb-1">{item.sender}</h5>
                                <p className="mb-3">{item.message}</p>
                                <span className="fs-6 text-muted">
                                  <span>
                                    <span className="fe fe-thumbs-up text-success me-1"></span>
                                    {item.date}
                                  </span>
                                  <span className="ms-1">{item.time}</span>
                                </span>
                              </div>
                            </div>
                          </Link>
                        </Col>
                        <Col className="col-auto text-center me-2">
                          <OverlayTrigger
                            key="top"
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-top">Mark as unread</Tooltip>
                            }
                          >
                            <Link to="#">
                              <DotBadge bg="secondary"></DotBadge>
                            </Link>
                          </OverlayTrigger>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </SimpleBar>
            <div className="border-top px-3 pt-3 pb-3">
              <Link
                to="/authentication/notifications"
                className="text-link fw-semi-bold"
              >
                See all Notifications
              </Link>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle
            as={Nav.Link}
            bsprefix="dt"
            className="rounded-circle border-bottom-0"
            id="dropdownUser"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image
                alt="avatar"
                src={user.avatarUrl}
                className="rounded-circle"
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            show={isDesktop ? true : false}
            className="dashboard-dropdown dropdown-menu-end mt-4 py-0"
            aria-labelledby="dropdownUser"
            align="end"
          >
            <Dropdown.Item className="mt-3">
              <div className="d-flex">
                <div className="avatar avatar-md avatar-indicators avatar-online">
                  <Image
                    alt="avatar"
                    src={user.avatarUrl}
                    className="rounded-circle"
                  />
                </div>
                <div className="ms-3 lh-1">
                  <h5 className="mb-1">
                    {user.firstName} {user.lastName}
                  </h5>
                  <p className="mb-0 text-muted">{user.email}</p>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="2">
              <i className="fe fe-user me-2"></i> Profile
            </Dropdown.Item>
            <Dropdown.Item eventKey="3">
              <i className="fe fe-star me-2"></i> Subscription
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fe fe-settings me-2"></i> Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Link bsprefix="btn" className="btn" onClick={onLogoutClick}>
              Log Out
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );
  };
  return (
    <Fragment>
      <Navbar
        onToggle={(collapsed) => setExpandedMenu(collapsed)}
        expanded={expandedMenu}
        expand="lg"
        className={`${user.isLoggedIn ? "bg-white" : ""} navbar p-2    ${
          headerstyle === "dark" ? "navbar-dark bg-dark" : "navbar-default py-2"
        }
        `}
      >
        <Container fluid className="px-0 ps-2">
          <Navbar.Brand as={Link} to="/">
            <Image src={Logo} alt="" />
          </Navbar.Brand>
          <div
            className={`navbar-nav navbar-right-wrap ms-auto d-lg-none nav-top-wrap ${
              user.isLoggedIn
                ? isDesktop || isLaptop
                  ? "d-none"
                  : "d-flex"
                : "d-none"
            }`}
          >
            <QuickMenu />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="icon-bar top-bar mt-0"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              {userFilteredRoutes2.map((item, index) => {
                if (item.children === undefined) {
                  return (
                    <Nav.Link key={index} as={Link} to={item.link}>
                      {item.menuitem}
                    </Nav.Link>
                  );
                } else {
                  return (
                    <NavDropdownMain
                      item={item}
                      key={index}
                      onClick={(value) => setExpandedMenu(value)}
                    />
                  );
                }
              })}
              <NavDropdown
                title="..."
                id="basic-nav-dropdown"
                bsprefix="no-dropdown-arrow d-block nav-link fs-3 lh-1 pt-0"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/dashboard/documentation"
                  className="py-2 px-3"
                >
                  <div className="d-flex align-items-center">
                    <i className="fe fe-file-text fs-3 text-primary"></i>
                    <div className="ms-3 lh-3">
                      <h5 className="mb-0">Documentations</h5>
                      <p className="mb-0 fs-6">Browse the all documentation</p>
                    </div>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/dashboard/changelog"
                  className="py-2 px-3"
                >
                  <div className="d-flex align-items-center">
                    <i className="fe fe-layers fs-3 text-primary"></i>
                    <div className="ms-3 lh-3">
                      <h5 className="mb-0">
                        Changelog{" "}
                        <span className="text-primary ms-1">v1.4.0</span>
                      </h5>
                      <p className="mb-0 fs-6">See what&apos;s new</p>
                    </div>
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Form className="mt-3 mt-lg-0 ms-lg-3 d-flex align-items-center">
              <span className="position-absolute ps-3 search-icon">
                <i className="fe fe-search"></i>
              </span>
              <Form.Control
                type="Search"
                id="formSearch"
                className="ps-6"
                placeholder="Search Courses"
              />
            </Form>
            {/* Right side quick / shortcut menu  */}

            <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
              <span
                className={`ms-auto mt-3 mt-lg-0  ${
                  user.isLoggedIn ? "d-none" : ""
                }`}
              >
                <Link
                  to="/signup"
                  bsprefix="btn"
                  className="btn btn-primary shadow-sm me-2"
                  onClick={onRegisterClick}
                >
                  Register
                </Link>
                <Link
                  to="/signin"
                  bsprefix="btn"
                  className="btn btn-primary shadow-sm me-2"
                  onClick={onLoginClick}
                >
                  Log In
                </Link>
              </span>

              <span
                className={`${
                  user.isLoggedIn
                    ? isDesktop || isLaptop
                      ? "d-flex"
                      : "d-none"
                    : "d-none"
                }`}
              >
                <QuickMenu />
              </span>
            </Nav>
            {/* end of right side quick / shortcut menu  */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

NavbarDefault.defaultProps = {
  headerstyle: "navbar-default",
};

NavbarDefault.propTypes = {
  loggedInUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
};

export default NavbarDefault;
