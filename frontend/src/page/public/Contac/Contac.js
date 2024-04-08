/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import styles from './Contac.module.scss';
import { Link } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';

const cx = classNames.bind(styles);

const Contac = () => {
    return (
        <>
            <div className={cx('container', 'mt_box')}>
                <Breadcrumbs />
            </div>

            <div className={cx('container')}>
                <div className={cx('maps')}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7446.827675637936!2d105.72646734016688!3d21.056127334895965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454570374c5e3%3A0xdeb4689fca01b0ff!2zTmjhu5VuLCBNaW5oIEtoYWksIFThu6sgTGnDqm0sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1704293168197!5m2!1svi!2s"
                        width="100%"
                        height="450"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </>
    );
};

export default Contac;
