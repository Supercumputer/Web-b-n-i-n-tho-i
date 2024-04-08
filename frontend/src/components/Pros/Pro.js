import classNames from 'classnames/bind';
import styles from './Pro.module.scss';
import Img from '../Img/Img';
import { formatNumber, start } from 'ultils/helper';
import { apiAddCart } from 'api/service';
import { useDispatch } from 'react-redux';
import { cart } from '../../redux/athu';
const cx = classNames.bind(styles);

const Pro = ({ houre, minute, second, data }) => {
    const disPatch = useDispatch();

    const handlerCart = async () => {
        try {
            const res = await apiAddCart({ idSp: data._id });
            disPatch(cart(res.totalCart));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('box_item', 'd-flex', 'flex-xl-row', 'flex-column')}>
            <div className={cx('item_img', 'd-flex', 'flex-lg-row', 'flex-column', 'col-xl-7', 'col-12')}>
                <div className={cx('item_img_c', 'col-lg-9', 'pe-2')}>
                    <Img src={data.image[0]} />
                </div>

                <div className={cx('item_img_p', 'col-lg-3', 'd-flex', 'gap-2', 'flex-lg-column', 'flex-row')}>
                    <div className={cx('item_img_p1')}>
                        <Img src={data.image[0]} />
                    </div>

                    <div className={cx('item_img_p1')}>
                        <Img src={data.image[1]} />
                    </div>

                    <div className={cx('item_img_p1')}>
                        <Img src={data.image[2]} />
                    </div>
                </div>
            </div>
            <div className={cx('item_infor', 'col-xl-5', 'col-12')}>
                <h2>{data.title}</h2>
                <span className={cx('price')}>{formatNumber(data.price)} VND</span>
                <div className={cx('box_star', 'd-flex', 'gap-1', 'my-2')}>{start(3)}</div>
                <p>lorem dasd sad sadgasdgd gduaysg yduyagd sdg uasyyduasduagsduga asgduayduasduaysdasd as d ausyd</p>
                <button type="button" className="btn btn-primary" onClick={handlerCart}>
                    <i className="fa-brands fa-opencart"></i> Add to cart
                </button>
                <hr />
                <div className={cx('box_time', 'd-flex', 'gap-2')}>
                    <div className={cx('numBer', 'd-flex', 'flex-column', 'align-items-center')}>
                        <p>{houre}</p>
                        <span>Giờ</span>
                    </div>
                    <div className={cx('numBer', 'd-flex', 'flex-column', 'align-items-center')}>
                        <p>{minute}</p>
                        <span>Phút</span>
                    </div>
                    <div className={cx('numBer', 'd-flex', 'flex-column', 'align-items-center')}>
                        <p>{second}</p>
                        <span>Giây</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pro;
