import classNames from 'classnames/bind';
import styles from './Auth.module.scss';
import Img from '../../../components/Img/Img';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Athu = () => {

    const auth = useSelector((state) => state.auth.user);

    return (
        <div className={cx('box_infor', 'd-flex')}>
            <div className={cx('box_text', 'col-9')}>
                <h2 className={cx('text_name')}>Thông tin cá nhân</h2>
                <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                <div className={cx('text_input', 'd-flex', 'flex-column')}>
                    <b>Họ Tên</b>
                    <p>{`${auth.lastName} ${auth.firstName}`}</p>
                </div>

                <div className={cx('text_input', 'd-flex', 'flex-column')}>
                    <b>Email</b>
                    <p>{auth.email}</p>
                </div>
                <div className={cx('text_input', 'd-flex', 'flex-column')}>
                    <b>User Name</b>
                    <p>{auth.userName}</p>
                </div>
                <div className={cx('text_input', 'd-flex', 'flex-column')}>
                    <b>Số điện thoại</b>
                    <p>{auth.phone}</p>
                </div>
            </div>
            <div className={cx('box_avata', 'col-3')}>
                <div className={cx('avata')}>
                <Img src={auth.avata} />
                </div>
                <b>Avata</b>
            </div>
        </div>
    );
};

export default Athu;
