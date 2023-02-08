import React from 'react';
import Header from "./containers/Header";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import Home from './containers/Home';
import UserListing from './containers/UserListing';
import RoleListing from './containers/RoleListing';
import AddUser from './containers/AddUser';
import AddRole from './containers/AddRole';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/user-listing" element={<UserListing />}></Route>
            <Route path="/role-listing" element={<RoleListing />}></Route>
            <Route path="/edit-user/:id" element={<AddUser />}></Route>
            <Route path="/add-user" element={<AddUser />}></Route>
            <Route path="/add-role" element={<AddRole />}></Route>
            <Route path="/edit-role/:id" element={<AddRole />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
