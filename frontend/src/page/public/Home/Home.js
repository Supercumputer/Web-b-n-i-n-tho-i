import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { Banner1, Banner2 } from '../../../assets/image';
import Slide1 from 'components/Slide/SlideCate';
import Slide from '../../../components/Slide/Slide';
import Img from '../../../components/Img/Img';
import Product from '../../../components/Product/Product';
import Pro from '../../../components/Pros/Pro';
import { useEffect, useState } from 'react';
import { apiGetProducts } from '../../../api/service';
import { secoundsToHms } from 'ultils/helper';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

const cx = classNames.bind(styles);

const Home = () => {
    const [listPro, setListPro] = useState([]);
    const [proSale, setProSale] = useState([]);
    const [houre, setHoure] = useState(0);
    const [minute, setMinute] = useState(0);
    const [secound, setSecound] = useState(0);
    const [timeSale, setTimeSale] = useState(false);

    useEffect(() => {
        callApi();
    }, []);

    useEffect(() => {
        callApiProSale();
    }, [timeSale]);

    useEffect(() => {
        let timeId = setTimeout(() => {
            if (secound > 0) {
                setSecound((pre) => pre - 1);
            } else {
                if (minute > 0) {
                    setMinute((pre) => pre - 1);
                    setSecound(59);
                } else {
                    if (houre > 0) {
                        setHoure((pre) => pre - 1);
                        setMinute(59);
                        setSecound(59);
                    } else {
                        clearTimeout(timeId);
                        setTimeSale(!timeSale);
                    }
                }
            }
        }, 1000);

        return () => clearTimeout(timeId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [houre, minute, secound]);

    const callApi = async () => {
        try {
            const res = await apiGetProducts({ limit: 12 });

            if (res && res.data) {
                setListPro(res.data.tours);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const callApiProSale = async () => {
        try {
            const res = await apiGetProducts({ limit: 2, page: 2 });

            if (res && res.data) {
                setProSale(res.data.tours);
                const today = `${moment().format('MM/DD/YYYY')} 5:00:00`;
                const seco = new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
                const number = secoundsToHms(seco);

                setHoure(number.h);
                setMinute(number.m);
                setSecound(number.s);
            } 
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {/* Banner ads and category */}
            <div className={cx('container', 'd-flex', 'gap-2', 'col-12', 'mt_box')}>
                <div className={cx('category', 'd-flex', 'flex-column', 'd-none', 'd-lg-block')}>
                    <div className={cx('item', 'd-flex', 'align-items-center')}>
                        <i className="fa-solid fa-display"></i>
                        <Link to={'/'}>Destop computer</Link>
                    </div>
                    <div className={cx('item', 'd-flex', 'align-items-center')}>
                        <i className="fa-solid fa-mobile-screen-button"></i>
                        <Link to={'/'}>Smart Phone</Link>
                    </div>
                    <div className={cx('item', 'd-flex', 'align-items-center')}>
                        <i className="fa-solid fa-laptop"></i>
                        <Link to={'/'}>Laptop computer</Link>
                    </div>
                    <div className={cx('item', 'd-flex', 'align-items-center')}>
                        <i className="fa-solid fa-headphones"></i>
                        <Link to={'/'}>Earphone</Link>
                    </div>
                    <div className={cx('item', 'd-flex', 'align-items-center')}>
                        <i className="fa-solid fa-volume-high"></i>
                        <Link to={'/'}>Loudspeaker</Link>
                    </div>
                    <div className={cx('item', 'd-flex', 'align-items-center')}>
                        <i className="fa-solid fa-camera-retro"></i>
                        <Link to={'/'}>Camera</Link>
                    </div>
                    <div className={cx('item', 'd-flex', 'align-items-center')}>
                        <i className="fa-solid fa-tablet-screen-button"></i>
                        <Link to={'/'}>Tablet</Link>
                    </div>
                    <div className={cx('item', 'd-flex', 'align-items-center')}>
                        <i className="fa-regular fa-clock"></i>
                        <Link to={'/'}>Smart watch</Link>
                    </div>
                    <div className={cx('item', 'd-flex', 'align-items-center')}>
                        <i className="fa-regular fa-keyboard"></i>
                        <Link to={'/'}>Keyboard</Link>
                    </div>
                </div>

                <div className={cx('banners', 'd-flex', 'pt-2', 'gap-2', 'col-lg-9', 'col-12')}>
                    <div className={cx('Banner_c', 'col-xl-10', 'col-12')}>
                        <Slide />
                    </div>

                    <div className="d-none d-xl-block">
                        <div className={cx('Banner_p', 'd-flex', 'flex-column', 'gap-2')}>
                            <div className={cx('Banner_p1')}>
                                <img src={Banner2} alt="" />
                            </div>
                            <div className={cx('Banner_p1')}>
                                <img src={Banner2} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* category */}
            <div className="container mt-5">
                <h1 className={cx('text_name')}>Danh Mục</h1>
                <Slide1 />
            </div>

            {/* Ads banner */}
            <div className={cx('container', 'mt-4')}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className={cx('ads')}>
                            <Img src={Banner1} />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className={cx('ads')}>
                            <Img src={Banner1} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="container mt-4">
                <h1 className={cx('text_name')}>Sản Phẩm Nổi Bật</h1>
                <div className="row">
                    {listPro.map((item, index) => {
                        return (
                            <div key={uuidv4()} className="col-lg-3 col-xl-2 col-md-3 col-6">
                                <Product data={item} />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* AdsBanner2 */}
            <div className={cx('container', 'mt-4')}>
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <div className={cx('ads')}>
                            <Img src={Banner1} />
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-4">
                        <div className={cx('ads')}>
                            <Img src={Banner1} />
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className={cx('ads')}>
                            <Img src={Banner1} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Pro */}
            <div className="container mt-4">
                <h1 className={cx('text_name')}>Sản Phẩm Sale</h1>
                <div className="row">
                    {/* <span>{houre}</span> */}
                    {proSale.map((item) => {
                        return (
                            <div className="col-6" key={uuidv4()}>
                                <Pro data={item} houre={houre} minute={minute} second={secound} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Home;
