import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import crudServ from '../services/CrudService';
import { setUser1 } from '../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
function AddUser() {
    let dispatch = useDispatch();
    let navigate = useNavigate();
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
        initialValues: {
            firstname: "",
            lastname: "",
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            roleKey: ''
        },
        validationSchema,
        // validateOnChange: false,
        // validateOnBlur: false,
        onSubmit: async (data) => {
            // console.log(JSON.stringify(data, null, 2));
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
                        dispatch(setUser1(res.data))
                        navigate("/user-listing")
                    }
                    )
                    .catch(err => console.log(err));
            }



            // var ans_search = existingData.email.indexOf(data.email);
            // console.log(ans_search);

            // if (ans_search == -1 || ans_search === undefined) {
            //     console.log("Not Found");
            // }
            // else {
            //     alert('exist');
            // }
            // for (let element of existingData) {
            //     console.log(element.email);
            //     if (element.email === data.email) {
            //         console.log("Email already exists");
            //     } else {
            // crudServ.postData("/users", data)
            //     .then(res => {
            //         console.log(res.data);
            //         // dispatch(setUser1(res))
            //     }
            //     )
            //     .catch(err => console.log(err));
            // }
            // }
        },
    });

    return (
        <div className="register-form">
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
                        <option value="">Select Role</option>
                        <option value="Role 1">Role 1</option>
                        <option value="Role 2">Role 2</option>
                        <option value="Role 3">Role 3</option>
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
                        Register
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-warning ms-2"
                        onClick={formik.handleReset}
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddUser;
