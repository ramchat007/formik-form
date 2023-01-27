import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import crud from '../services/CrudService';
import { Link } from 'react-router-dom';

export default function UserListing() {
    let [users, setUsers] = useState([]);
    // let usersNew = useSelector(state => state.allUsers.users);
    // console.log(usersNew);

    const fetchAllUserListing = async () => {
        crud.getData('/users')
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
                // dispatch(setUser1(response.data))
            })
            .catch(err => console.log(err));
    }
    const handleClick = (id) => {
        console.log(id);
        crud.deleteData(`/users/${id}`)
    }

    useEffect(() => {
        fetchAllUserListing();
    }, []);

    return (
        <>
            <Link className="btn btn-primary" aria-current="page" to="/create-user">Add User</Link>
            <ul className='listingWrap'>
                {
                    users && users.map(obj =>
                        <li className='card' key={obj.username}>
                            <div className="card-body">
                                <h5 className="card-title">{obj.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{obj.roleKey}</h6>
                                <p className="card-text">{obj.email}</p>
                                <p className="card-text">{obj.mobile}</p>
                                <button className='btn btn-secondary' onClick={function () { handleClick(obj.id) }}>Edit</button>
                                <button className='btn btn-danger ms-2' onClick={function () { handleClick(obj.id) }}>Delete</button>
                            </div>
                        </li>)
                }
            </ul>
        </>
    )
}
