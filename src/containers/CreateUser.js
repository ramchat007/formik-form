import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage, useFormik } from 'formik';
import * as Yup from "yup";
import crudServ from '../services/CrudService';
import { setUser1 } from '../redux/actions/userAction';
import { useParams } from 'react-router-dom';

const CreateUser = () => {
    const { id } = useParams();
    const isAddMode = !id;
    let dispatch = useDispatch();
    const validationSchema = Yup.object().shape({
        firstname: Yup.string().required("Firstname is required"),
        lastname: Yup.string().required("Lastname is required"),
        username: Yup.string()
            .required("Username is required")
            .min(6, "Username must be at least 6 characters")
            .max(20, "Username must not exceed 20 characters"),
        email: Yup.string().required("Email is required").email("Email is invalid"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .max(40, "Password must not exceed 40 characters"),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
        roleKey: Yup.string().required("Lastname is required"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            role: '',
            password: "",
            confirmPassword: ""
        },
        validationSchema,
        onSubmit: async (data) => {
            console.log(JSON.stringify(data, null, 2));

            await crudServ.postData("/users", data)
                .then(res => {
                    console.log(res.data);
                    // dispatch(setUser1(res))
                }
                )
                .catch(err => console.log(err));
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

                <div className="form-group col-sm-6">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <button
                        type="button"
                        className="btn btn-warning float-right"
                        onClick={formik.handleReset}
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    )


    // return (
    //     <div className='mt-4'>
    //         <h1>Create new user</h1>
    //         <Formik
    //             initialValues={formValue}
    //             validationSchema={validationSchema}
    //             onSubmit={handleSubmit}>
    //             {({ errors, touched }) => (
    //                 <Form className='row'>
    //                     <div className='col-sm-6'>
    //                         <div className="form-group col-sm-6">
    //                             <label htmlFor="username">User Name</label>
    //                             <Field type="text" name="username" className="form-control" id="username" placeholder="User Name" value={formValue.username} onChange={handleChange} />
    //                             {errors.username && touched.username ? (
    //                                 <ErrorMessage name="username" />
    //                             ) : null}
    //                         </div>
    //                     </div>
    //                     <div className='col-sm-6'>
    //                         <div className="form-group col-sm-6">
    //                             <label htmlFor="firstname">First Name</label>
    //                             <Field type="text" name="firstname" className="form-control" id="firstname" placeholder="First Name" value={formValue.firstname} onChange={handleChange} />
    //                             {errors.firstname && touched.firstname ? (
    //                                 <ErrorMessage name="firstname" />
    //                             ) : null}
    //                         </div>
    //                     </div>
    //                     <div className='col-sm-6'>
    //                         <div className="form-group">
    //                             <label htmlFor="lastname">Last Name</label>
    //                             <Field type="text" name="lastname" className="form-control" id="lastname" placeholder="Last Name" />
    //                         </div>
    //                     </div>
    //                     <div className='col-sm-6'>
    //                         <div className="form-group">
    //                             <label htmlFor="email">Email</label>
    //                             <Field type="email" name="email" className="form-control" id="email" placeholder="Email ID" />
    //                         </div>
    //                     </div>
    //                     <div className='col-sm-6'>
    //                         <div className="form-group">
    //                             <label htmlFor="phone">Phone</label>
    //                             <Field type="text" name="phone" className="form-control" id="phone" placeholder="Mobile Number" />
    //                         </div>
    //                     </div>
    //                     <div className='col-sm-6'>
    //                         <div className="form-group">
    //                             <label htmlFor="selectRole">Role</label>
    //                             <Field as="select" className="form-control" id="selectRole" name='roleKey'>
    //                                 <option value="1">1</option>
    //                                 <option value="2">2</option>
    //                                 <option value="3">3</option>
    //                                 <option value="4">4</option>
    //                                 <option value="5">5</option>
    //                             </Field>
    //                         </div>
    //                     </div>
    //                     <div className='col-sm-6'>
    //                         <div className="form-group">
    //                             <label htmlFor="password">Password</label>
    //                             <Field type="password" name="password" className="form-control" id="password" placeholder="Enter Password" />
    //                         </div>
    //                     </div>
    //                     <div className='col-sm-6'>
    //                         <div className="form-group">
    //                             <label htmlFor="confirmPassword">Confirm Password</label>
    //                             <Field type="password" name="confirmPassword" className="form-control" id="confirmPassword" placeholder="Enter Password Again" />
    //                         </div>
    //                     </div>
    //                     <div className='col-12'>
    //                         <div className="form-group text-center">
    //                             <button type="submit" className='btn btn-secondary'>
    //                                 Submit
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </Form>
    //             )}

    //         </Formik>
    //     </div >
    // )
}
export default CreateUser;