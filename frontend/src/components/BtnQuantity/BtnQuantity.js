import classNames from 'classnames/bind';
import styles from './BtnQuantity.module.scss';
import { useState } from 'react';
import { apiAddCart } from '../../api/service';
const cx = classNames.bind(styles);

const BtnQuantiTy = ({ idSp, quantity }) => {
    const [number, setNumber] = useState(quantity);

    const handlerCart = async (number) => {
        try {
            const res = await apiAddCart({ idSp, quantity: number });
            if (res && res.status === 200) {
                console.log(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlerG = () => {
        if (!(number <= 1)) {
            setNumber((pre) => {
                handlerCart(pre - 1);
                return pre - 1;
            });
        }
    };

    const handlerT = () => {
        setNumber((pre) => {
            handlerCart(pre + 1);
            return pre + 1;
        });
    };

    return (
        <div className={cx('box_number', 'd-flex')}>
            <button onClick={handlerG}>-</button>
            <input type="hiden" value={number} />
            <button onClick={handlerT}>+</button>
        </div>
    );
};

export default BtnQuantiTy;
