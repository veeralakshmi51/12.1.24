import { Navigate } from 'react-router-dom'
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import Q15StaffConfiguration from '../pages/staffConfiguration'
import AccessControl from '../pages/accesscontrol'
import SecretKey from '../pages/secretkey'
import Organization from '../pages/organizationDetails'
import Staff from '../pages/Staff/intex'
import StaffCreation from '../pages/Staff/staffCreation'
import PatientCreation from '../pages/Patient/patientCreation'
import Patient from '../pages/Patient/intex'
import Beacon from '../pages/beaconDevices'
import OrganizationForm from '../pages/organizationDetails/Form';
import Q15Report from '../pages/q15Report'
import BedAssign from '../pages/bedAssign'
import PatientAssign from '../pages/patientAssign'
import BedCreation from '../pages/bedAssign/bedCreation'
import PatientUpdation from '../pages/Patient/patientUpdate'
import StaffUpdation from '../pages/Staff/staffUpdate'

const SuperAdminRoutes = [ 

  { path: '/dashboard', component: <Dashboard /> },
  { path: '/access-control', component: <AccessControl /> },
  { path: '/organization-details', component: <Organization /> },
  {path:'/organization-form',component:<OrganizationForm/>},

];

const AdminRoutes = [
  { path: '/q15-staff-configuration', component: <Q15StaffConfiguration /> },
  { path: '/patient-table', component: <Patient />},
  { path: '/staff-table', component: <Staff /> },
  { path: '/Beacon-register', component: <Beacon/>},
  { path: '/staff-register', component: <StaffCreation/>},
  { path: '/patient-register', component: <PatientCreation/>},
  { path: '/q15-report', component: <Q15Report/>},
  {path:'/bed-assign', component:<BedCreation/>},
  {path:'/bed-table',component:<BedAssign/>},
  {path:'/patient-assign',component:<PatientAssign/>},
  {path:'/patient-update/:id',component:<PatientUpdation/>},
  {path:'/staff-update/:id',component:<StaffUpdation/>}

];

const publicRoutes = [
  { path: '/', exact: true, component: <Navigate to="/login" /> },
  {path: '/login', component: <Login />},
  {path: '/secret-key', component: <SecretKey />}
]

export { AdminRoutes, SuperAdminRoutes, publicRoutes }
