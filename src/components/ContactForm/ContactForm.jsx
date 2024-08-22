import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './ContactForm.module.css'
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

const ContactForm = () => {
    const dispatch = useDispatch();
    const initialValues = { name: '', number: '' };

    const validationSchema = Yup.object({
        name: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .max(50, 'Must be 50 characters or less')
            .required('Required'),
        number: Yup.string()
            .min(3, 'Must be at least 3 characters')
            .max(50, 'Must be 50 characters or less')
            .required('Required')
    });

    const handleSubmit = (values, { resetForm }) => {
        const newContact = { name: values.name, number: values.number }
        dispatch(addContact(newContact));
        resetForm();
    };

    return (
        <div className={s.formContainer}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <label htmlFor="name">Name
                        <Field name="name" type='search' id="name" autoComplete="name" />
                    </label>
                    <ErrorMessage name="name" component="div" className={s.error} />

                    <label htmlFor="number">Number
                        <Field name="number" type='search' id="number" autoComplete="tel" />
                    </label>
                    <ErrorMessage name="number" component="div" className={s.error} />

                    <button type="submit">Add contact</button>
                </Form>
            </Formik>
        </div>
    );
};

export default ContactForm;