import React, { useEffect, useState } from 'react';
import crud from '../services/CrudService';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../store/slices/UserSlice';

export default function UserListing() {
    let [users, setUsers] = useState([]);
    let dispatch = useDispatch();
    // let usersNew = useSelector(state => state.allUsers.users);
    // console.log(typeof users);
    // console.log(users);
    // console.log(typeof usersNew);
    // console.log(usersNew);

    const fetchAllUserListing = async () => {
        crud.getData('/users')
            .then(response => {
                setUsers(response.data);
                dispatch(fetchUser(response.data))
                // console.log(response.data);
                // console.log(typeof response.data);
            })
            .catch(err => console.log(err));
    }
    function handleDelete(id) {
        // console.log(id);
        crud.deleteData(`/users/${id}`);
    }

    useEffect(() => {
        fetchAllUserListing()
    }, []);

    return (
        <>
            <Link className="btn btn-primary" aria-current="page" to="/add-user">Add User</Link>
            <ul className='listingWrap'>
                {
                    users && users.map((obj) =>
                        <li className='card' key={obj.id}>
                            <div className="card-body">
                                <h5 className="card-title">{obj.firstname} {obj.lastname}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{obj.roleKey}</h6>
                                <p className="card-text">{obj.email}</p>
                                <p className="card-text">{obj.phone}</p>
                                <Link className="btn btn-secondary" aria-current="page" to={`/add-user/${obj.id}`}>Edit </Link>
                                <button className='btn btn-danger ms-2' onClick={function () { handleDelete(obj.id) }}>Delete</button>
                            </div>
                        </li>)
                }
            </ul>
        </>
    )
}
