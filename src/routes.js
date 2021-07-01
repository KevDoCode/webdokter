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
import Profile from "views/examples/Profile.js";
import User from "views/Admin/User.js";
import Patient from "views/Admin/Patient.js";
import Appointment from "views/Admin/Appointment.js";
import FormAppointment from "views/Admin/FormAppointment.js";
import Register from "views/examples/Register.js";
import Login from "views/Admin/Login.js";
import Tables from "views/Admin/Doctor.js";
import Icons from "views/examples/Icons.js";
import Doctor from "views/Admin/Doctor.js";
var routes = [
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
    icon: "ni ni-planet text-blue",
    component: Doctor,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User",
    icon: "ni ni-pin-3 text-orange",
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
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
