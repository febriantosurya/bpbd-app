import { RouterProvider } from 'react-router-dom';
import router from '../config/Routes';
import './App.css';

function App() {
  return (
    // <Routes />
    <RouterProvider router={router}/>
  );
}

export default App;