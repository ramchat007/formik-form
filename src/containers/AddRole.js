import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { newRole, existingRole } from '../store/slices/RoleSlice';

function AddRole() {
    let allRoles = useSelector(state => state.role);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        roleLabel: "",
        roleKey: "",
        id: ""
    });
    const { id } = useParams();
    var userId = allRoles.length;
    const isAddMode = !id;
    const fetchAllUserListing = async () => {
        allRoles = allRoles.filter(ele => ele.id == id);
        if (!isAddMode) {
            setFormValues(...allRoles)
        }
    }

    const validationSchema = Yup.object().shape({
        roleLabel: Yup.string().required("Role Label is required"),
        roleKey: Yup.string().required("Role Key is required")
    });

    const formik = useFormik({
        initialValues: formValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (data) => {
            if (isAddMode) {
                data.id = userId
                dispatch(newRole(data));
                navigate("/role-listing");
            } else {
                let newData = [...allRoles];
                const index = newData.findIndex(x => x.id == id);
                newData.splice(index, 1)
                newData.push(data);
                dispatch(existingRole(newData));
                navigate("/role-listing");
            }


        },
    });

    useEffect(() => {
        if (!isAddMode) {
            fetchAllUserListing();
        }
    }, []);

    return (
        <div className="register-form">
            <h1>{isAddMode ? 'Add Role' : 'Edit Role'}</h1>
            <form className='row' onSubmit={formik.handleSubmit}>
                <div className="form-group col-sm-6">
                    <label>Role Label</label>
                    <input
                        name="roleLabel"
                        type="text"
                        className={
                            'form-control' +
                            (formik.errors.roleLabel && formik.touched.roleLabel
                                ? ' is-invalid'
                                : '')
                        }
                        onChange={formik.handleChange}
                        value={formik.values.roleLabel}
                    />
                    <div className="invalid-feedback">
                        {formik.errors.roleLabel && formik.touched.roleLabel
                            ? formik.errors.roleLabel
                            : null}
                    </div>
                </div>
                <div className="form-group col-sm-6">
                    <label>Role Key</label>
                    <input
                        name="roleKey"
                        type="text"
                        className={
                            'form-control' +
                            (formik.errors.roleKey && formik.touched.roleKey
                                ? ' is-invalid'
                                : '')
                        }
                        onChange={formik.handleChange}
                        value={formik.values.roleKey}
                    />
                    <div className="invalid-feedback">
                        {formik.errors.roleKey && formik.touched.roleKey
                            ? formik.errors.roleKey
                            : null}
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        {isAddMode ? 'Submit' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddRole;
