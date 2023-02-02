import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import crudServ from '../services/CrudService';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditUser = () => {
    const [formValues, setFormValues] = useState({});
    let usersNew = useSelector(state => state.allUsers.users);
    const { id } = useParams();
    const isAddMode = !id;

    const initialValues = {
        username: "",
        name: {
            firstname: "",
            lastname: ""
        },
        email: "",
        phone: "",
        role: '',
        password: "",
        cPassword: ''
    };

    const fetchAllUserListing = async () => {
        setFormValues(usersNew);
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        role: Yup.string()
            .required('Role is required'),
        password: Yup.string()
            .concat(isAddMode ? Yup.string().required('Password is required') : null)
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password || isAddMode) return schema.required('Confirm Password is required');
            })
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    const handleSubmit = (values) => {
        console.log(values);
        var { username, firstname, lastname, email, phone, roleKey, password } = values
        var rec = {
            "name": { firstname, lastname },
            "email": email,
            "username": username,
            "phone": phone,
            "roleKey": roleKey,
            "password": password
        }
        crudServ.updateData(`/users/${id}`, rec)
            .then(res => {
                console.log(res)
            }
            )
            .catch(err => console.log(err));
    }


    useEffect(() => {
        if (!isAddMode) {
            fetchAllUserListing();
            // crudServ.getData(`/users/${id}`)
            //     .then(res => {
            //         // console.log(res.data.name)
            //         setFormValues(res.data)
            //     }
            //     )
            //     .catch(err => console.log(err));
        }
    }, []);
    return (
        <div className='mt-4'>
            <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
            <Formik
                initialValues={formValues || initialValues} validationSchema={validationSchema}
                onSubmit={handleSubmit} enableReinitialize>
                {({ errors, touched }) => (
                    <Form className='row'>
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <label htmlFor="username">User Name</label>
                                <Field type="text" name="username" className="form-control" id="username" placeholder="User Name" />
                                {errors.username && touched.username ? (
                                    <ErrorMessage name="username" />
                                ) : null}

                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <label htmlFor="firstname">First Name</label>
                                <Field type="text" name="name.firstname" className="form-control" id="firstname" placeholder="First Name" />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <label htmlFor="lastname">Last Name</label>
                                <Field type="text" name="name.lastname" className="form-control" id="lastname" placeholder="Last Name" />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field type="email" name="email" className="form-control" id="email" placeholder="Email ID" />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <Field type="text" name="phone" className="form-control" id="phone" placeholder="Mobile Number" />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <label htmlFor="selectRole">Role</label>
                                <Field as="select" className="form-control" id="selectRole" name='roleKey'>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Field>
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field type="password" name="password" className="form-control" id="password" placeholder="Enter Password" />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <label htmlFor="cpassword">Confirm Password</label>
                                <Field type="password" name="cpassword" className="form-control" id="cpassword" placeholder="Enter Password Again" />
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className="form-group text-center">
                                <button type="submit" className='btn btn-secondary'>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </Form>
                )}

            </Formik>
        </div >
    )
}
export default EditUser;