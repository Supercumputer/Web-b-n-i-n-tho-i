import classNames from 'classnames/bind';
import styles from './PayMent.module.scss';
import Img from 'components/Img/Img';
import { payment } from 'assets/image';
import { formatNumber } from 'ultils/helper';
import Paypal from 'components/common/Paypal/Paypal';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confettis from 'components/Confetti/Confetti';

const cx = classNames.bind(styles);

const Checkout = () => {
    const navigate = useNavigate();

    const { listPro, total } = useSelector((pre) => pre.order);

    const [ address, setAddress ] = useState('');
    const [hiden, setHiden] = useState(false)

    useEffect(() => {
        if (listPro.length === 0 || Object.keys(total).length === 0) {
            navigate('/cart');
        }
    }, []);

    return (
        <div className={cx('container', 'mt_box', 'd-flex', 'flex-column', 'flex-lg-row')}>
            {hiden && <Confettis/>}
            
            <div className={cx('boc', 'col-lg-5', 'pe-3')}>
                <Img src={payment} />
            </div>
            <div className={cx('col-lg-7')}>
                <div className={cx('total_money')}>
                    <p className={cx('money')}>THÔNG TIN THANH TOÁN</p>
                    <div className={cx('box_pay')}>
                        <div className={cx('payment_item')}>
                            <p>Tổng tiền</p>
                            <p>{formatNumber(total.totalMoney)} VND</p>
                        </div>
                        <div className={cx('payment_item')}>
                            <p>Phí vận chuyển</p>
                            <p>{formatNumber(total.pvc)} VND</p>
                        </div>
                        <div className={cx('payment_item')}>
                            <p>Tổng Voucher giảm giá:</p>
                            <p>{formatNumber(total.volcher)} VND</p>
                        </div>
                        <div className={cx('payment_item')}>
                            <p>Tổng thanh toán</p>
                            <p>{formatNumber(total.totalPayMent)} VND</p>
                        </div>
                        <div class="mb-3">
                            <input
                                value={address}
                                type="text"
                                class="form-control"
                                id="formGroupExampleInput"
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Nhập vào địa chỉ vận chuyển (bắt buôc)."
                            />
                        </div>
                        {address.trim().length > 10 && (
                            <Paypal
                                payLoad={{ products: listPro, total: total.totalPayMent, address: address }}
                                setHiden={setHiden}
                                amount={Math.round(total.totalPayMent / 23500)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
