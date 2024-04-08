import classNames from 'classnames/bind';
import styles from './Slide.module.scss';
import Img from '../Img/Img';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { apiGetCategorys } from '../../api/service';
import { Swiper, SwiperSlide } from 'swiper/react';
import { category } from '../../redux/product';
import { useDispatch } from 'react-redux';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { v4 as uuidv4 } from 'uuid';

const cx = classNames.bind(styles);

export default function Slide1() {
    const [slidesPerView, setSlidesPerView] = useState(6);
    const [listCategory, setListCategory] = useState([]);
    const disPatch = useDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        callApi();
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const callApi = async () => {
        try {
            const res = await apiGetCategorys();
           
            if (res && res.data) {
                setListCategory(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleResize = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 1200) {
            setSlidesPerView(6);
        } else if (screenWidth >= 992) {
            setSlidesPerView(4);
        } else if (screenWidth >= 768) {
            setSlidesPerView(3);
        } else {
            setSlidesPerView(2);
        }
    };

    const handlerCate = (id) => {
        disPatch(category(id))
        navigate('/shop');
    };

    return (
        <>
            <Swiper
                slidesPerView={slidesPerView}
                spaceBetween={30}
                className="mySwiper"
                // navigation={true}
                // pagination={{
                //     clickable: true,
                // }}
                // modules={[ Pagination, Navigation]}
            >
                {listCategory.map((item, index) => {
                    return (
                        <SwiperSlide key={uuidv4()}>
                            <div className={cx('item')} onClick={() => handlerCate(item._id)}>
                                <Link className={cx('text')}>
                                    <div className={cx('b_img')}>
                                        <Img src={item.image} className={cx('image')} />
                                    </div>

                                    <p className="mb-2">{item.title}</p>
                                </Link>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
