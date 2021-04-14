import { useContext } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import React from "react";
import { AuthContext } from "./Context/AuthContextProvider";
import Login from "./components/Login/Login";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { NavLink as RouterLink } from "react-router-dom";

import Customers from "./components/Customers/Customers";
import Settings from "./components/Settings/Settings";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import PrivateRoute from "./PrivateRoute";
import logo from "./images/logo.png";
import CustomerInformation from "./components/CustomerInformation/CustomerInformation";

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink
    ref={ref}
    {...props}
    activeClassName="MuiButton-containedPrimary"
  />
));

const navBarStyle = {
  backgroundColor: "#0080ef",
};

const RouteController = () => {
  const [setAuth] = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <>
      <BrowserRouter>
        <div>
          <Navbar className="navbar-custom" style={navBarStyle} expand="lg">
            <Navbar.Brand>
              <img
                alt=""
                src={logo}
                width="60"
                height="55"
                className="d-inline-block align-top"
              />{" "}
              Customer Manager
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <NavLink
                  className="nav-link"
                  to="/"
                  exact
                  activeClassName="active"
                >
                  Customers
                </NavLink>
                <NavLink
                  className="nav-link"
                  to="/settings"
                  exact
                  activeClassName="active"
                >
                  Settings
                </NavLink>
              </Nav>
              <Navbar.Text>
                <button className="btn" onClick={logout}>
                  Logout
                </button>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
          <Container fixed="true">
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/settings" component={Settings} />
              <PrivateRoute exact path="/" component={Customers} />
              <PrivateRoute
                path="/customers/:id"
                component={CustomerInformation}
              />
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    </>
  );
};

export default RouteController;
