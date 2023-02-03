import React, { useEffect, useState } from 'react';
import crudServ from '../services/CrudService';
import { Link } from 'react-router-dom';

export default function RoleListing() {
    let [roleData, setRoleData] = useState([]);

    const fetchRole = async () => {
        crudServ.getData(`/roledata`)
            .then(res => {
                setRoleData(res.data)
            }
            )
            .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchRole()
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
