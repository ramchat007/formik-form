import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import crudServ from '../services/CrudService';
import { setUser1 } from '../redux/actions/userAction';

const CreateUser = () => {
    let dispatch = useDispatch();
    const CreateUserSchema = Yup.object({
        fullname: Yup.string()
            .min(2, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Please enter your Full Name'),
        email: Yup.string()
            .email('Invalid email')
            .required('Please enter your Email'),
        password: Yup.string().min(6).required('Please enter your password'),
        cpassword: Yup.string().required().oneOf([Yup.ref("password"), null], "'Password not matched'")
    });

    const handleSubmit = (values) => {
        console.log(values);
        var { userName, fullname, email, mobile, roleKey, password } = values
        var rec = {
            "name": fullname,
            "email": email,
            "username": userName,
            "mobile": mobile,
            "roleKey": roleKey,
            "password": password
        }
        crudServ.postData("/users", rec)
            .then(res => {
                console.log(res)
                dispatch(setUser1(res.data))
            }
                )
            .catch(err => console.log(err));
    }
    return (
        <div className='mt-4'>
            <h1>Create new user</h1>
            <Formik
                initialValues={{ userName: "", fullname: "", email: "", mobile: "", roleKey: "", password: "", cpassword: "" }}
                onSubmit={handleSubmit}>
                {({ values, errors, touched }) => (
                    <Form className='row'>
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <label htmlFor="userName">User Name</label>
                                <Field type="text" name="userName" className="form-control" id="userName" placeholder="User Name" />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className="form-group">
                                <label htmlFor="FullName">Full Name</label>
                                <Field type="text" name="fullname" className="form-control" id="FullName" placeholder="Full Name" />
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
                                <label htmlFor="mobile">Mobile</label>
                                <Field type="number" name="mobile" className="form-control" id="mobile" placeholder="Mobile Number" />
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
export default CreateUser;