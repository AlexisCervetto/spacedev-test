import Starter from '../views/starter/starter.jsx';
import Movements from '../views/movements/movements.jsx';
// ui components
import EditMovement from '../views/movements/editmovement.jsx';
import AddMovement from '../views/movements/addmovement.jsx';

var ThemeRoutes = [
  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    icon: 'ti-loop', 
    component: Starter 
  },
  { 
    path: '/movements', 
    name: 'All movements', 
    icon: 'mdi mdi-view-list', 
    component: Movements
  },
  {
    path: '/editmovement/:id',
    name: 'Edit Movement',
    icon: 'mdi mdi-view-list',
    childRoute: true,
    component: EditMovement
  },
  {
    path: '/addmovement',
    name: 'Add Movement',
    icon: 'mdi mdi-view-list',
    childRoute: true,
    component: AddMovement
  },
  { path: '/', pathTo: '/dashboard', name: 'Dashboard', redirect: true }
];
export default ThemeRoutes;
