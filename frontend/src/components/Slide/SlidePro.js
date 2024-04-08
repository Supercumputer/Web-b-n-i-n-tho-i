import { useState, useEffect } from 'react';
import { apiGetProducts } from '../../api/service';
import { Swiper, SwiperSlide } from 'swiper/react';
import Product from '../Product/Product';
import { v4 as uuidv4 } from 'uuid';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

export default function SlidePro({ categoryId }) {
    const [slidesPerView, setSlidesPerView] = useState(6);

    const [listPro, setListPro] = useState([]);

    useEffect(() => {
        callApi({ category: categoryId });
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const callApi = async (data) => {
        try {
            const res = await apiGetProducts(data);

            if (res && res.data) {
                setListPro(res.data.tours);
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
                {listPro.map((item, index) => {
                    return (
                        <SwiperSlide key={uuidv4()}>
                            <Product data={item} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
}
