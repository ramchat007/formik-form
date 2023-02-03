import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import crudServ from '../services/CrudService';
import { useNavigate, useParams } from 'react-router-dom';
import { newUser } from '../store/slices/UserSlice';

function AddUser() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [roleData, setRoleData] = useState([]);
    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: "",
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        roleKey: ""
    });
    const { id } = useParams();
    const isAddMode = !id;

    const fetchRole = async () => {
        crudServ.getData(`/roledata`)
            .then(res => {
                setRoleData(res.data)
            }
            )
            .catch(err => console.log(err));
    }
    const fetchAllUserListing = async () => {
        if (!isAddMode) {
            crudServ.getData(`/users/${id}`)
                .then(res => {
                    let newData = res.data
                    newData.password = '';
                    newData.confirmPassword = '';
                    setFormValues(newData)
                }
                )
                .catch(err => console.log(err));
        }
    }

    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("Firstname is required"),
        lastname: Yup.string().required("Lastname is required"),
        username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(20, 'Username must not exceed 20 characters'),
        email: Yup.string().required('Email is required').email('Email is invalid'),
        roleKey: Yup.string().required("Role is required"),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(40, 'Password must not exceed 40 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
    });

    const formik = useFormik({
        initialValues: formValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (data) => {
            if (isAddMode) {
                let emailFound = false;
                const existingData = await crudServ.getData("/users")
                    .then(res => { return res.data })
                    .catch(err => console.log(err));
                existingData.filter(res => {
                    if (res.email !== data.email) {
                        emailFound = false
                    } else {
                        emailFound = true
                        console.log("Email already exists");
                        formik.errors.email = "Email already exists"
                    }
                })
                if (!emailFound) {
                    crudServ.postData("/users", data)
                        .then(res => {
                            console.log(res.data);
                            dispatch(newUser(res.data))
                            navigate("/user-listing")

                        }
                        )
                        .catch(err => console.log(err));
                }
            } else {
                crudServ.updateData(`/users/${id}`, data)
                    .then(res => {
                        console.log(res.data);
                        dispatch(newUser(res.data))
                        navigate("/user-listing")

                    }
                    )
                    .catch(err => console.log(err));
            }


        },
    });

    useEffect(() => {
        if (!isAddMode) {
            fetchAllUserListing();
        }
        fetchRole();
    }, []);

    return (
        <div className="register-form">
            <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
            <form className='row' onSubmit={formik.handleSubmit}>
                <div className="form-group col-sm-6">
                    <label>First Name</label>
                    <input
                        name="firstname"
                        type="text"
                        className={
                            'form-control' +
                            (formik.errors.firstname && formik.touched.firstname
                                ? ' is-invalid'
                                : '')
                        }
                        onChange={formik.handleChange}
                        value={formik.values.firstname}
                    />
                    <div className="invalid-feedback">
                        {formik.errors.firstname && formik.touched.firstname
                            ? formik.errors.firstname
                            : null}
                    </div>
                </div>
                <div className="form-group col-sm-6">
                    <label>Last Name</label>
                    <input
                        name="lastname"
                        type="text"
                        className={
                            'form-control' +
                            (formik.errors.lastname && formik.touched.lastname
                                ? ' is-invalid'
                                : '')
                        }
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                    />
                    <div className="invalid-feedback">
                        {formik.errors.lastname && formik.touched.lastname
                            ? formik.errors.lastname
                            : null}
                    </div>
                </div>

                <div className="form-group col-sm-6">
                    <label htmlFor="username"> Username </label>
                    <input
                        name="username"
                        type="text"
                        className={
                            'form-control' +
                            (formik.errors.username && formik.touched.username
                                ? ' is-invalid'
                                : '')
                        }
                        onChange={formik.handleChange}
                        value={formik.values.username}
                    />
                    <div className="invalid-feedback">
                        {formik.errors.username && formik.touched.username
                            ? formik.errors.username
                            : null}
                    </div>
                </div>

                <div className="form-group col-sm-6">
                    <label htmlFor="email"> Email </label>
                    <input
                        name="email"
                        type="email"
                        className={
                            'form-control' +
                            (formik.errors.email && formik.touched.email ? ' is-invalid' : '')
                        }
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <div className="invalid-feedback">
                        {formik.errors.email && formik.touched.email
                            ? formik.errors.email
                            : null}
                    </div>
                </div>
                <div className="form-group col-sm-6">
                    <label htmlFor="selectRole"> Role </label>
                    <select className='form-control'
                        id="selectRole"
                        name="roleKey"
                        value={formik.values.roleKey}
                        onChange={formik.handleChange}
                    >
                        {<option value="">Select Role</option>}
                        {
                            roleData && roleData.map((val) => {
                                return <option key={val.roleKey} value={val.roleKey}>{val.roleLabel}</option>
                            })
                        }
                    </select>
                    {/* <div className="invalid-feedback"> */}
                    {formik.errors.roleKey && formik.touched.roleKey
                        ? formik.errors.roleKey
                        : ''}
                    {/* </div> */}
                </div>

                <div className="form-group col-sm-6">
                    <label htmlFor="password"> Password </label>
                    <input
                        name="password"
                        type="password"
                        className={
                            'form-control' +
                            (formik.errors.password && formik.touched.password
                                ? ' is-invalid'
                                : '')
                        }
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <div className="invalid-feedback">
                        {formik.errors.password && formik.touched.password
                            ? formik.errors.password
                            : null}
                    </div>
                </div>

                <div className="form-group col-sm-6">
                    <label htmlFor="confirmPassword"> Confirm Password </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        className={
                            'form-control' +
                            (formik.errors.confirmPassword && formik.touched.confirmPassword
                                ? ' is-invalid'
                                : '')
                        }
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                    />
                    <div className="invalid-feedback">
                        {formik.errors.confirmPassword && formik.touched.confirmPassword
                            ? formik.errors.confirmPassword
                            : null}
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        {isAddMode ? 'Register' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddUser;
