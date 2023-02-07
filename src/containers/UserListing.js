import React, { useEffect, useState } from 'react';
// import crud from '../services/CrudService';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, removeUser } from '../store/slices/UserSlice';
import { fetchRole } from '../store/slices/RoleSlice';

export default function UserListing() {
    let [users, setUsers] = useState([]);
    let [roleData, setRoleData] = useState([
        {
            "id": 1,
            "roleLabel": "Role 1",
            "roleKey": "role1"
        },
        {
            "id": 2,
            "roleLabel": "Role 2",
            "roleKey": "role2"
        },
        {
            "id": 3,
            "roleLabel": "Role 3",
            "roleKey": "role3"
        },
        {
            "id": 4,
            "roleLabel": "Role 4",
            "roleKey": "role4"
        }
    ]);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let usersNew = useSelector(state => state.users);
    // console.log(usersNew);
    const fetchRoleData = async () => {
        dispatch(fetchRole(roleData));
    }

    const fetchAllUserListing = async () => {
        var fetchedData = dispatch(fetchUser(usersNew))
        // console.log(fetchedData);
        setUsers(fetchedData.payload)
        // console.log(users);
        // crud.getData('/users')
        //     .then(response => {
        //         // console.log(response.data);
        //         setUsers(response.data);
        //         dispatch(fetchUser(response.data))
        //     })
        //     .catch(err => console.log(err));
    }
    function handleDelete(id) {
        // console.log(id);
        const confirmBtn = document.getElementById('confirmBtn');
        confirmBtn.onclick = function () {
            //     crud.deleteData(`/users/${id}`);
            // fetchAllUserListing();
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
                                <Link className="btn btn-secondary" aria-current="page" to={`/add-user/${obj.id}`}>Edit </Link>
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
        </>
    )
}
