import { lazy } from "react";

const SignUp = lazy(() => import("../components/authentication/SignUp"));

const SignIn = lazy(() => import("../components/authentication/SignIn"));

const EmailConfirmation = lazy(() =>
  import("../components/authentication/EmailConfirmation")
);

const routes = [
 
  {
    path: "/signup",
    name: "Sign Up",
    exact: true,
    element: SignUp,
    roles: [],
    isAnonymous: true,
  },
  {
    path: "/signin",
    name: "Sign In",
    exact: true,
    element: SignIn,
    roles: [],
    isAnonymous: true,
  },
 
  {
    path: "/confirm",
    name: "Email Confirmation",
    exact: false,
    element: EmailConfirmation,
    roles: [],
    isAnonymous: true,
  }
];

const errorRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: true,
  },
];

var allRoutes = [...routes, ...errorRoutes];

export default allRoutes;
