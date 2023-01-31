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
import CreateUser from './containers/CreateUser';
import EditUser from './containers/EditUser';
import AddUser from './containers/AddUser';

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
            <Route path="/create-user" element={<CreateUser />}></Route>
            <Route path="/edit-user/:id" element={<EditUser />}></Route>
            <Route path="/add-user" element={<AddUser />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
