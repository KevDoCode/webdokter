/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Admin/Index.js";
import Dashboard from "views/User/Index.js";
import Profile from "views/User/Profile.js";
import User from "views/Admin/User.js";
import Patient from "views/Admin/Patient.js";
import Appointment from "views/Admin/Appointment.js";
import Appointment1 from "views/User/Appointment.js";
import DetailAppointment from "views/User/DetailAppointments.js";
import Detail from "views/Admin/Detail";
import FormAppointment from "views/Admin/FormAppointment.js";
import Register from "views/User/Register.js";
import Login from "views/Admin/Login.js";
import Loginuser from "views/User/Login.js";
import Tables from "views/Admin/Doctor.js";
import Icons from "views/examples/Icons.js";
import Doctor from "views/Admin/Doctor.js";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-app text-success",
    component: Dashboard,
    layout: "/user",
  },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/doctor",
    name: "Doctor",
    icon: "ni ni-single-02 text-blue",
    component: Doctor,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User",
    icon: "ni ni-single-02 text-orange",
    component: User,
    layout: "/admin",
  },
  {
    path: "/patient",
    name: "Patient",
    icon: "ni ni-single-02 text-yellow",
    component: Patient,
    layout: "/admin",
  },
  {
    path: "/appoint",
    name: "Appointment",
    icon: "ni ni-bullet-list-67 text-red",
    component: Appointment,
    layout: "/admin",
  },
  {
    path: "/detail/:id",
    name: "Detail Appointment",
    icon: "ni ni-bullet-list-67 text-red",
    component: Detail,
    layout: "/admin",
  },
  {
    path: "/detailappoint",
    name: "Make Appointment",
    icon: "ni ni-bullet-list-67 text-red",
    component: FormAppointment,
    layout: "/admin",
  },
  {
    path: "/admin/login",
    name: "Registrant",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/user/login",
    name: "User Login",
    icon: "ni ni-key-25 text-info",
    component: Loginuser,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },

  {
    path: "/profile",
    name: "Profile",
    icon: "ni ni-circle-08 text-primary",
    component: Profile,
    layout: "/user",
  },
  {
    path: "/appointment",
    name: "Appointment",
    icon: "ni ni-ambulance text-red",
    component: Appointment1,
    layout: "/user",
  },
  {
    path: "/detail/:id",
    name: "Appointment",
    icon: "ni ni-bullet-list-67 text-red",
    component: DetailAppointment,
    layout: "/user",
  },
];
export default routes;
