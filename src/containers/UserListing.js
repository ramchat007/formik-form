import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, removeUser } from '../store/slices/UserSlice';

export default function UserListing() {
    let [users, setUsers] = useState([]);
    let [roleData, setRoleData] = useState([]);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let usersNew = useSelector(state => state.users);
    let allRoles = useSelector(state => state.role);
    const fetchRoleData = async () => {
        setRoleData(allRoles)
    }

    const fetchAllUserListing = async () => {
        var fetchedData = dispatch(fetchUser(usersNew));
        setUsers(fetchedData.payload);
    }
    function handleDelete(id) {
        const confirmBtn = document.getElementById('confirmBtn');
        confirmBtn.onclick = function () {
            dispatch(removeUser(id))
            navigate("/");
        }
    }

    useEffect(() => {
        fetchAllUserListing()
        fetchRoleData()
    }, []);

    return (
        <>
            {roleData.length === 0 ? <div><h1>No Any Data. First Add Role</h1> <Link className="btn btn-primary" aria-current="page" to="/add-role">Add Role</Link></div> :
                <div>
                    <Link className="btn btn-primary" aria-current="page" to="/add-user">Add User</Link>
                    <ul className='listingWrap'>
                        {
                            users && users.map((obj) =>
                                <li className='card' key={obj.id}>
                                    <div className="card-body">
                                        <p className="card-text">{obj.username}</p>
                                        <h5 className="card-title">{obj.firstname} {obj.lastname}</h5>
                                        <h6 className="card-subtitle mb-2 text-muted">{obj.roleKey}</h6>
                                        <p className="card-text">{obj.email}</p>
                                        <Link className="btn btn-secondary" aria-current="page" to={`/edit-user/${obj.id}`}>Edit </Link>
                                        <button className='btn btn-danger ms-2' onClick={function () { handleDelete(obj.id) }} data-bs-toggle="modal" data-bs-target="#deleteUserModal">Delete</button>
                                    </div>
                                </li>)
                        }
                    </ul>
                    <div className="modal fade" id="deleteUserModal" tabIndex="-1" aria-labelledby="deleteUserLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="deleteUserLabel">You really want to delete this User?</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    ...
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" className="btn btn-primary" id="confirmBtn" data-bs-dismiss="modal">Confirm Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
