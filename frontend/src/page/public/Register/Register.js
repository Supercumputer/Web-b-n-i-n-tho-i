import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { apiRegister } from '../../../api/service';
import { shoModel } from 'ultils/showModel';
import path from 'ultils/path';
const cx = classNames.bind(styles);

function isEmail(value) {
    let regex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    return regex.test(value);
}

function isPassWord(value) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(value);
}

function isPhoneNumber(value) {
    let regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    return regex.test(value);
}

const Register = () => {
    const navigate = useNavigate();

    const valid = {
        isValidFirstName: false,
        isValidLastName: false,
        isValidEmail: false,
        isValidPassWord: false,
        isValidPhone: false,
        isValidPassWord1: false,
        isValidDate: false,
        isValidSex: false,
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [sex, setSex] = useState('');
    const [validation, setValidation] = useState(valid);

    const callApi = async (data) => {
        try {
            const res = await apiRegister(data);
            if (res && res.success === true) {
                shoModel('congratulations', res.message, 'success');
                navigate(path.login);
            } else {
                shoModel('Opps!', res.message, 'warning');
            }
        } catch (error) {
            shoModel('Opps!', error.message, 'error', true);
        }
    };

    const handlerRegister = () => {
        setValidation(valid);

        if (firstName.trim() === '') {
            setValidation((vali) => ({ ...vali, isValidFirstName: true }));
            return;
        }

        if (lastName.trim() === '') {
            setValidation((vali) => ({ ...vali, isValidLastName: true }));
            return;
        }

        if (email.trim() === '') {
            setValidation((vali) => ({ ...vali, isValidEmail: true }));
            return;
        } else if (!isEmail(email)) {
            setValidation((vali) => ({ ...vali, isValidEmail: true }));
            return;
        }

        if (phone === '') {
            setValidation((vali) => ({ ...vali, isValidPhone: true }));
            return;
        } else if (!isPhoneNumber(phone)) {
            setValidation((vali) => ({ ...vali, isValidPhone: true }));
            return;
        }

        if (password.trim() === '') {
            setValidation((vali) => ({ ...vali, isValidPassWord: true }));
            return;
        } else if (!isPassWord(password)) {
            setValidation((vali) => ({ ...vali, isValidPassWord: true }));
            return;
        }

        if (date === '') {
            setValidation((vali) => ({ ...vali, isValidDate: true }));
            return;
        }

        if (sex === '') {
            setValidation((vali) => ({ ...vali, isValidSex: true }));
            return;
        }

        callApi({ firstName, lastName, email, password, date, phone, sex });
    };

    return (
        <div className={cx('box_form')}>
            <form className={cx('row', 'g-3', 'col-xl-4', 'col-sm-9', 'col-md-6', 'col-10', 'box')}>
                <h2>Register</h2>
                <div className={cx('col-md-6')}>
                    <label for="inputEmail4" className={cx('form-label')}>
                        First name
                    </label>
                    <input
                        type="text"
                        value={firstName}
                        className={cx('form-control', { 'is-invalid': validation.isValidFirstName })}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className={cx('col-md-6')}>
                    <label for="inputPassword4" className={cx('form-label')}>
                        Last name
                    </label>
                    <input
                        type="text"
                        value={lastName}
                        className={cx('form-control', { 'is-invalid': validation.isValidLastName })}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className={cx('col-12')}>
                    <label for="inputAddress" className={cx('form-label')}>
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        className={cx('form-control', { 'is-invalid': validation.isValidEmail })}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={cx('col-12')}>
                    <label for="inputAddress2" className={cx('form-label')}>
                        Phone Nummber
                    </label>
                    <input
                        value={phone}
                        type="text"
                        className={cx('form-control', { 'is-invalid': validation.isValidPhone })}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className={cx('col-12')}>
                    <label for="inputAddress2" className={cx('form-label')}>
                        Password
                    </label>
                    <input
                        value={password}
                        type="password"
                        className={cx('form-control', { 'is-invalid': validation.isValidPassWord })}
                        onChange={(e) => setPassWord(e.target.value)}
                    />
                </div>
                <div className={cx('col-md-6')}>
                    <label for="inputCity" className={cx('form-label')}>
                        Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        className={cx('form-control', { 'is-invalid': validation.isValidDate })}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className={cx('col-md-6')}>
                    <label for="inputState" className={cx('form-label')}>
                        Sex
                    </label>
                    <select
                        id="inputState"
                        className={cx('form-select', { 'is-invalid': validation.isValidSex })}
                        onChange={(e) => setSex(e.target.value)}
                        defaultValue=""
                    >
                        <option selected value="">
                            Giới tính
                        </option>
                        <option>Nam</option>
                        <option>Nữ</option>
                        <option>Khác</option>
                    </select>
                </div>

                <div className={cx('col-12', 'mt-4')}>
                    <button type="button" onClick={handlerRegister} className={cx('btn', 'btn-primary', 'col-12')}>
                        Register
                    </button>
                </div>
                <Link to={path.login}>Login</Link>
            </form>
        </div>
    );
};

export default Register;
