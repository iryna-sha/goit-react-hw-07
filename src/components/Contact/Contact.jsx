import { useDispatch } from 'react-redux';
import s from './Contact.module.css';
import { deleteContact } from '../../redux/contactsOps';


const Contact = ({ id, name, number }) => {
    const dispatch = useDispatch();

    return (
        <li className={s.item}>

            <p>{name}</p>
            <p>{number}</p>
            <button onClick={() => dispatch(deleteContact(id))}>Delete</button>
        </li>
    );
};

export default Contact;