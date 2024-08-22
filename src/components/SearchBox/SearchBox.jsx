import { useDispatch } from 'react-redux';
import s from './SearchBox.module.css'
import { changeFilter } from '../../redux/contactsSlice';

const SearchBox = () => {
    const dispatch = useDispatch();

    return (
        <div className={s.searchBox}>
            <label htmlFor="search">
                Find contacts by name
                <input id="search"
                    name="search"
                    type="search"
                    placeholder="Search..."
                    autoComplete="off"
                    onChange={e => dispatch(changeFilter(e.target.value))} />
            </label>
        </div>
    );
};

export default SearchBox;