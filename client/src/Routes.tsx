import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import urls from "./constants/routes.json";
// import Login from "./pages/authentication/login.tsx";
// import Services from "./pages/customers/services.tsx";
// import ServiceProviderHome from "./pages/serviceProviders/dashboard.tsx";
// import BookingDetailsPage from "./pages/serviceProviders/BookingDetails.tsx";
// // import ServiceProviderDashboard from "./pages/serviceProviders/dashboard";
// // import BookingProvider from "./pages/serviceProviders/bookings.tsx";
import NotFound from "./pages/pageNotFound/index.tsx";
// import ProfilePage from "./pages/customers/profile.tsx"
// import PartnerBooking from "./pages/customers/partnerbooking";
// import ServicesProviders from "./pages/customers/service-providers.tsx";
// import PaymentGateway from "./pages/customers/payment-gateway.tsx";
// import { getUserData } from "./services/api/authAPIs.ts";
// import SuccessPage from "./pages/customers/payment-success.tsx";
// import FailurePage from "./pages/customers/payment-failure.tsx";
import CustomerHome from "./pages/customers/landing.tsx";
import Recommendation from "./pages/customers/recommendation.tsx";
// import ShareDetails from "./pages/customers/shareDetails.tsx";
// import ShareBookingHistory from "./pages/customers/shareBookingHistory.tsx";


// import BookingHistory from "./pages/customers/bookinghistory.tsx";
function AppRouter(): JSX.Element {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  // useEffect(() => {
    
  // const token = localStorage.getItem("AUTH_ACCESS_TOKEN");
  //   const validateToken = async () => {
  //     if (!token) {
  //       navigate(urls.LOGIN); // No token, redirect to login
  //       return;
  //     }

  //     try {
  //       await getUserData(); // Validate token
  //       // Token is valid; continue without navigation change
  //     } catch (error) {
  //       console.log("Token validation failed:", error);
  //       localStorage.removeItem("AUTH_ACCESS_TOKEN"); // Clear invalid token
  //       if (pathname !== urls.LOGIN) {
  //         navigate(urls.LOGIN); // Redirect only if not already on login page
  //       }
  //     }
  //   };

  //   validateToken();
  // }, [pathname, navigate]);

  return (
    <Routes>
      {/* <Route path={urls.LOGIN} element={<Login />} /> */}
      {/* <Route path={urls.LANDING} element={<Navigate to={urls.LOGIN} replace />} /> */}
      <Route path={urls.LANDING} element={<CustomerHome />} />
      <Route path={urls.RECOMMENDATION} element={<Recommendation />} />
      {/* <Route path={urls.SERVICES} element={<Services />} />
      <Route path={urls.SERVICES_PROVIDERS} element={<ServicesProviders />} />
      <Route path={urls.SERVICE_PROVIDER_DASHBOARD} element={<ServiceProviderHome />} />
      <Route path={urls.BOOKING_DETAILS} element={<BookingDetailsPage />} />
      <Route path={urls.PARTNER_BOOKING} element={<PartnerBooking />} />
      <Route path={urls.PAYMENT_GATEWAY} element={<PaymentGateway/>}/>
      <Route path={urls.PAYMENT_SUCCESS}  element={<SuccessPage />} />
      <Route path={urls.PAYMENT_FAILURE} element={<FailurePage />} />
      <Route path={`${urls.BOOKING_DETAILS}/:seletedBookingId`} element={<BookingDetailsPage />} />
      <Route path={urls.PROFILE} element={< ProfilePage/>} />
      <Route path={urls.SHARE_BOOKING_HISTORY} element={<ShareBookingHistory />} />
      <Route path={urls.BOOKING_HISTORY} element={<BookingHistory/>} />
      <Route path={urls.SHARE_DETAILS} element={<ShareDetails/>} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
