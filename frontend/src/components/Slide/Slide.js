import classNames from 'classnames/bind';
import styles from './Slide.module.scss';
import Img from '../Img/Img';
import { Banner1 } from '../../assets/image';

import { apiGetBanners } from '../../api/service';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { v4 as uuidv4 } from 'uuid';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const Slide = () => {
    const [banner, setBanner] = useState([]);

    useEffect(() => {
        callApi();
    }, []);

    const callApi = async () => {
        try {
            const res = await apiGetBanners();
            if (res && res.data) {
                setBanner(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className={cx('mySwiper')}
            >
                {banner.map((item, index) => {
                    return (
                        <SwiperSlide key={uuidv4()}>
                            <Img src={item.image_path} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
};

export default Slide;
