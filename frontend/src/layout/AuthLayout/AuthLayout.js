import classNames from 'classnames/bind';
import styles from './AuthLayout.module.scss';
import Header from 'components/common/Header/Header';
import Footer from 'components/common/footer/Footer';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { apiLogout } from '../../api/service';
import { logout } from '../../redux/athu';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(styles);

const AuthLayout = ({ children }) => {

    const navigate = useNavigate();
    const disPatch = useDispatch();
    const location = useLocation()
   
    const handlerLogout = async () => {
        try {
            const res = await apiLogout();
            if (res) {
                localStorage.removeItem('jwt');
                disPatch(logout());
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Header />
            <div className={cx('container', 'mt_box')}>
            <div className="row">
                <div className="col-3">
                    <h2 className={cx('text_name')}>Infor Acount</h2>
                    <div className={cx('box_btn')}>
                        <Link to="/acount" className={cx('cart_link')}>
                            <div className={cx('item', {'active': location.pathname === '/acount'})}>
                                <i className="fa-regular fa-user"></i>
                                <span>Cài đặt tài khoản</span>
                            </div>
                        </Link>
                        <Link to="/security" className={cx('cart_link')}>
                            <div className={cx('item', {'active': location.pathname === '/security'})}>
                                <i className="fa-solid fa-shield-halved"></i>
                                <span>Bảo mật và đăng nhập</span>
                            </div>
                        </Link>
                        <Link to="/acount" className={cx('cart_link')}>
                            <div className={cx('item', {'active': location.pathname === '/'})}>
                                <i className="fa-regular fa-comment"></i>
                                <span>Cài đặt thông báo</span>
                            </div>
                        </Link>

                        <div className={cx('item')} onClick={handlerLogout}>
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <span>Đăng xuất</span>
                        </div>
                    </div>
                </div>
                <div className="col-9">
                    {children}
                </div>
            </div>
        </div>
            <Footer />
        </div>
    );
};

export default AuthLayout;
