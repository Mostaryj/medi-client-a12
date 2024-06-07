import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Error from "../Error/Error";
import CategoryCard from "../pages/Home/Home/CategoryCard/CategoryCard";
import CategoryDetails from "../pages/Home/Home/CategoryCard/CategoryDetails";
import Shop from "../components/Shop/Shop";
import Discount from "../pages/Home/Home/Discount/Discount";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "../pages/UpdateProfile/UpdateProfile";
import Dashboard from "../LayOut/Dashboard";
import Cart from "../pages/Dashboard/User/Cart";



 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error></Error>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
      
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: "/signUp",
          element: <SignUp></SignUp>,
        },
        {
          path: '/updateProfile',
          element:<UpdateProfile></UpdateProfile>
        },
        {
          path: '/categoryCard',
          element: <CategoryCard></CategoryCard>
       },
       {
         path: '/categoryDetails/:category',
         element: <PrivateRoute><CategoryDetails></CategoryDetails></PrivateRoute>,
       },
       {
        path: '/discount/:discount',
        element: <Discount></Discount>,
      },
       {
        path:'/shop',
        element: <Shop></Shop>
       },
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard></Dashboard>,
      children: [
       { path: '/dashboard/cart',
        element: <Cart></Cart>
       }

      ]
    }
  ]);