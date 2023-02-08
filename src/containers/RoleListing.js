import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchRole, removeRole } from '../store/slices/RoleSlice';


export default function RoleListing() {
    let [roleData, setRoleData] = useState([]);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let allRoles = useSelector(state => state.role);

    const fetchRoleData = async () => {
        var fetchedRole = dispatch(fetchRole(allRoles));
        setRoleData(fetchedRole.payload);
    }
    function handleDelete(id) {
        const confirmBtn = document.getElementById('confirmBtn');
        confirmBtn.onclick = function () {
            dispatch(removeRole(id))
            navigate("/role-listing");
        }
    }

    useEffect(() => {
        fetchRoleData();
    }, []);

    return (
        <>
            <Link className="btn btn-primary" aria-current="page" to="/add-role">Add Role</Link>
            <ul className='listingWrap'>
                {
                    roleData && roleData.map((obj) =>
                        <li className='card' key={obj.id}>
                            <div className="card-body">
                                <h5 className="card-title">{obj.roleLabel}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{obj.roleKey}</h6>
                                <Link className="btn btn-secondary" aria-current="page" to={`/edit-role/${obj.id}`}>Edit </Link>
                                {(roleData.length === 1) ? '' : <button className='btn btn-danger ms-2' onClick={function () { handleDelete(obj.id) }} data-bs-toggle="modal" data-bs-target="#deleteUserModal">Delete</button>}
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
