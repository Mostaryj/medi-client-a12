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
import AllUsers from "../pages/Dashboard/Admin/AllUsers";

import Manage from "../pages/Dashboard/Seller/Manage";
import Ask from "../pages/Dashboard/Seller/Ask";
import Ad from "../pages/Dashboard/Admin/Ad";
import ManageCategory from "../pages/Dashboard/Admin/ManageCategory";

import CheckOutPayment from "../pages/Dashboard/payment/CheckOutPayment";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import Invoice from "../pages/Dashboard/payment/Invoice";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory";



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
       {
        path: '/payment',
        element: <CheckOutPayment></CheckOutPayment>
     },
     {
      path: '/invoice',
      element: <Invoice></Invoice>
     }
      ]
    },
    {
      path: `/dashboard`,
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      errorElement: <Error></Error>,
      children: [
      {
         index: true,
         element: <DashboardHome></DashboardHome>
      },
      

      //  admin route
      // {
      //   path: '/dashboard/adminHome',
      //   element: <AdminHome></AdminHome>
      // },
      {
        path: '/dashboard/allUsers',
        element: <AllUsers></AllUsers>

      },
      {
          path: '/dashboard/ad',
          element:<Ad></Ad>
      },
      {
         path: '/dashboard/manageCategory/:category',
         element: <ManageCategory></ManageCategory>,
         
      },
      //seller
      // {
      //   path: '/dashboard/sellerHome',
      //   element: <SellerHome></SellerHome>
      // },
      {
        path: '/dashboard/manageProducts',
        element: <Manage></Manage>
      },
      {
         path: '/dashboard/ask',
         element: <Ask></Ask>
      },

      //user
      { path: '/dashboard/cart',
        element: <Cart></Cart>
       },
     
      {
        
          path: '/dashboard/paymentHistory',
          element: <PaymentHistory></PaymentHistory>
        
      },

      ]
    }
  ]);