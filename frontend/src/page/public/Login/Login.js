import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { apiLogin } from '../../../api/service';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../redux/athu';
import path from 'ultils/path';
import { shoModel } from 'ultils/showModel';

const cx = classNames.bind(styles);

function isEmail(value) {
    let regex = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    return regex.test(value);
}

function isPassWord(value) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    return regex.test(value);
}

const Login = () => {
    const valid = {
        isValidEmail: false,
        isValidPass: false,
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [validation, setValidation] = useState(valid);
    const auth = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        if (auth) {
            navigate(path.home);
        }
    }, []);

    const handlerLogin = () => {
        setValidation(valid);

        if (!email || !password) {
            setValidation((pre) => ({ ...pre, isValidEmail: true, isValidPass: true }));
        } else if (!isEmail(email)) {
            setValidation((pre) => ({ ...pre, isValidEmail: true }));
        } else if (!isPassWord(password)) {
            setValidation((pre) => ({ ...pre, isValidPass: true }));
        } else {
            callApi({ email, password });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    const callApi = useCallback(
        async (data) => {
            try {
                const res = await apiLogin(data);

                if (res && res.userData && res.success) {
                    dispatch(login(res.userData));
                    localStorage.setItem('jwt', res.accessToken);
                    shoModel('congratulations', res.message, 'success');
                    navigate(path.home);
                } else {
                    shoModel('Opps!', res.message, 'warning');
                }
            } catch (error) {
                shoModel('Opps!', error.message, 'error', true);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [validation, email, password],
    );

    return (
        <div className={cx('box_form')}>
            <form className={cx('col-xl-3', 'col-sm-7', 'col-md-5', 'col-10', 'box')}>
                <h2>Login</h2>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">
                        Email address
                    </label>
                    <input
                        value={email}
                        type="email"
                        className={cx('form-control', { 'is-invalid': validation.isValidEmail })}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">
                        Password
                    </label>
                    <input
                        value={password}
                        type="password"
                        className={cx('form-control', { 'is-invalid': validation.isValidPass })}
                        onChange={(e) => setPassWord(e.target.value)}
                    />
                </div>

                <button type="button" className="btn btn-primary col-12" onClick={handlerLogin}>
                    Login
                </button>
                <Link to={path.register}>Register</Link>
            </form>
        </div>
    );
};

export default Login;
