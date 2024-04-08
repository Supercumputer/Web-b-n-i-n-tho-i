import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import Img from '../../Img/Img';
import { logo } from '../../../assets/image';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <>
            <div className="container-fluid bg-dark mt-5">
                <div className="container d-flex justify-content-between py-3 gap-2 flex-lg-row flex-column">
                    <div className={cx('send_mail', 'd-flex', 'gap-2', 'align-items-center')}>
                        <i class="fa-regular fa-envelope"></i>
                        <p className="">Sing up to new sign</p>
                    </div>
                    <div className={cx('box_send_mail', 'd-flex', 'align-items-center')}>
                        <input type="text" placeholder="Send mmail here ..." />
                        <button className={cx('btn')}>Send mail</button>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="container d-flex justify-content-between gap-3 ">
                    <div className={cx('box_logo', 'd-flex', 'flex-column', 'py-3')}>
                        <Img src={logo} />
                        <p className="mb-1 mt-2">
                            <b>Address: </b>
                            <span className={cx('text')}>562 Wellingharm Road, Street 32, San Franicso</span>
                        </p>
                        <p className="mb-1">
                            <b>Phone: </b>
                            <span className={cx('text')}>033 897 3258</span>
                        </p>
                        <p className="mb-1">
                            <b>Hours: </b>
                            <span className={cx('text')}>10:00 - 18:00, Mon - Sad</span>
                        </p>
                        <div className='d-flex flex-sm-column justify-content-between justify-content-sm-start align-items-center align-items-sm-start'>
                            <p className={cx('text', 'mt-2', 'mb-1')}>Follow me</p>
                            <div className="d-flex align-items-center gap-3">
                                <i class="fa-brands fa-facebook-f"></i>
                                <i class="fa-brands fa-twitter"></i>
                                <i class="fa-brands fa-google"></i>
                                <i class="fa-brands fa-instagram"></i>
                            </div>
                        </div>
                    </div>
                    <div className="d-none d-sm-block">
                        <div className={cx('box_item', 'd-flex', 'flex-column')}>
                            <h3>Address</h3>
                            <p className="mb-1">About Us</p>
                            <p className="mb-1">033 897 3258</p>
                            <p className="mb-1">10:00 - 18:00, Mon - Sad</p>
                            <p className="mb-1">Follow me</p>
                        </div>
                    </div>

                    <div className="d-none d-md-block">
                        <div className={cx('box_item', 'd-flex', 'flex-column')}>
                            <h3>My Acount</h3>
                            <p className="mb-1">562 Wellingharm Road, Street 32, San Franicso</p>
                            <p className="mb-1">033 897 3258</p>
                            <p className="mb-1">10:00 - 18:00, Mon - Sad</p>
                            <p className="mb-1">Follow me</p>
                        </div>
                    </div>

                    <div className="d-none d-lg-block">
                        <div className={cx('box_item', 'd-flex', 'flex-column')}>
                            <h3>Secured Payment Gateways</h3>
                            <p className="mb-1">Mã số thuế</p>
                            <p className="mb-1">Ngày thành lập</p>
                            <p className="mb-1">Công nghệ, giáo dục, lập trình.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
