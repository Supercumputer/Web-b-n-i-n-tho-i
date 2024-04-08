import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Img from '../Img/Img';
import { Link } from 'react-router-dom';
import { formatNumber, start } from 'ultils/helper';
const cx = classNames.bind(styles);

const Product = ({data}) => {
    return (
        <div className={cx('item')}>
            <Link to={`/detail/${data.slug}/${data._id}`}>
                <div className={cx('box_img')}>
                    <Img src={data.image[0]} />
                </div>
                <h2>{data?.title}</h2>
                <div className={cx('box_star', 'd-flex', 'gap-1')}>
                    {start(3)}
                </div>
                <p className={cx('price')}>{formatNumber(data.price)} VND</p>
            </Link>
        </div>
    );
};

export default Product;
