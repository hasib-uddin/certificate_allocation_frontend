import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import AddRecipient from './pages/AddRecipient';
import DisplayCourse from './pages/DisplayCourse';
import DisplayRecipient from './pages/DisplayRecipient';

function App() {
  return (
    <>
    <Layout>
     <Routes>

     <Route path="/" element={<Home />} />
     <Route path="/add_recipient" element={<AddRecipient />} />
     <Route path="/display_course" element={<DisplayCourse />} />
     <Route path="/display_recipient" element={<DisplayRecipient />} />



     </Routes>
    </Layout>
    </>
  );
}

export default App;
