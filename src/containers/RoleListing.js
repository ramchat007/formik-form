import React, { useEffect, useState } from 'react';
// import crudServ from '../services/CrudService';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchRole } from '../store/slices/RoleSlice';


export default function RoleListing() {
    let dispatch = useDispatch();
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

    const fetchRoleData = async () => {
        dispatch(fetchRole(roleData))
        //     crudServ.getData(`/roledata`)
        //         .then(res => {
        //             setRoleData(res.data)
        //         }
        //         )
        //         .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchRoleData()
    }, []);

    return (
        <>
            <ul className='listingWrap'>
                {
                    roleData && roleData.map((obj) =>
                        <li className='card' key={obj.id}>
                            <div className="card-body">
                                <h5 className="card-title">{obj.roleLabel}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{obj.roleKey}</h6>
                                {/* <Link className="btn btn-secondary" aria-current="page" to={`/edit-role/${obj.id}`}>Edit </Link> */}
                            </div>
                        </li>)
                }
            </ul>
        </>
    )
}
