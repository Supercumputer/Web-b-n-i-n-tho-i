import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Img from '../../../components/Img/Img';
import { useDispatch, useSelector } from 'react-redux';
import { apiDeleteCart, apiDeleteCarts, apiGetUser } from '../../../api/service';
import { useEffect, useState } from 'react';
import BtnQuantiTy from '../../../components/BtnQuantity/BtnQuantity';
import { v4 as uuidv4 } from 'uuid';
import { orderPro } from '../../../redux/order';
import { formatNumber } from 'ultils/helper';
import path from 'ultils/path';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
const cx = classNames.bind(styles);

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth.user);
    const [cart, setCart] = useState([]);
    const [checkAll, setCheckAll] = useState(false);
    const [check, setCheck] = useState([]);
    const [state, setState] = useState({
        totalMoney: 0,
        pvc: 20000,
        volcher: 11000,
        totalPayMent: 0,
    });

    useEffect(() => {
        callApi(auth._id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth]);

    useEffect(() => {
        const result = check.reduce((init, item) => {
            return init + item.price * item.quantity;
        }, 0);

        const payment = result + state.pvc - state.volcher;

        setState((pre) => ({ ...pre, totalMoney: result, totalPayMent: payment }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [check]);

    const total = (data) => {};

    const callApi = async (id) => {
        try {
            const res = await apiGetUser(id);
            if (res && res.data) {
                setCart(res.data.cart);
                total(res.data.cart);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlerDelete = async (id) => {
        try {
            const res = await apiDeleteCart(id);
            if (res && res.data) {
                setCart(res.data.cart);
                total(res.data.cart);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkAllBox = () => {
        setCheckAll(!checkAll);
        setCheck(
            checkAll
                ? []
                : cart.map((item) => ({
                      product: item.product._id,
                      price: item.product.price,
                      color: item.color,
                      size: item.size,
                      quantity: item.quantity,
                  })),
        );
    };

    const handlerCheck = (data) => {
        setCheck((pre) => {
            const checked = check.some((item) => {
                return item.product === data.product;
            });

            if (checked) {
                const newCheck = pre.filter((item) => item.product !== data.product);
                setCheckAll(false);
                return newCheck;
            } else {
                const newCheck = [...pre, data];
                if (newCheck.length === cart.length) {
                    setCheckAll(true);
                }
                return newCheck;
            }
        });
    };

    const handlerDeletes = async (e) => {
        try {
            const arr = check.map((item) => item.product);
            if (e.target.value === '1') {
                const res = await apiDeleteCarts(arr.join(','));
                if (res && res.data) {
                    setCart(res.data.cart);
                    total(res.data.cart);
                    setCheck([]);
                    setCheckAll(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlerPayment = () => {
        
        if (check.length > 0) {
            dispatch(orderPro({check, state}))
            navigate(path.checkOut);
        }
    };

    return (
        <div className={cx('container', 'mt_box')}>
            <Breadcrumbs />

            <div className={cx('box_cart', 'd-flex', 'flex-column', 'flex-xl-row')}>
                <div className={cx('boc', 'col-xl-9', 'col-12', 'pe-3')}>
                    {check.length > 0 && (
                        <div className={cx('col-12', 'mb-2')}>
                            <select
                                className="form-select col-2"
                                aria-label="Default select example"
                                onChange={handlerDeletes}
                            >
                                <option selected>Mời chọn hành động</option>
                                <option value="1">Xóa</option>
                            </select>
                        </div>
                    )}

                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <input type="checkbox" checked={checkAll} onChange={checkAllBox} />
                                </th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Clear</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.length <= 0 ? (
                                <tr>
                                    <td className="text-center" colSpan={6}>
                                        Giỏ hàng không có sản phẩm nào.
                                    </td>
                                </tr>
                            ) : (
                                cart.map((item) => {
                                    return (
                                        <tr key={uuidv4()}>
                                            <th scope="row">
                                                <input
                                                    type="checkbox"
                                                    checked={check.some((ite) => {
                                                        return ite.product === item.product._id;
                                                    })}
                                                    onChange={() =>
                                                        handlerCheck({
                                                            product: item.product._id,
                                                            price: item.product.price,
                                                            color: item.color,
                                                            size: item.size,
                                                            quantity: item.quantity,
                                                        })
                                                    }
                                                />
                                            </th>
                                            <td width="400">
                                                <Link
                                                    to={`/detail/${item.product.slug}/${item.product._id}`}
                                                    className={cx('text_link')}
                                                >
                                                    <div className={cx('box_img')}>
                                                        <Img src={item.product.image[0]} />
                                                        <p>{item.product.title}</p>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td>
                                                <span className={cx('textc')}>
                                                    {formatNumber(item.product.price)} VND
                                                </span>
                                            </td>
                                            <td>
                                                <BtnQuantiTy idSp={item.product._id} quantity={item.quantity} />
                                            </td>
                                            <td>
                                                <span className={cx('textc')}>
                                                    {formatNumber(item.quantity * item.product.price)} VND
                                                </span>
                                            </td>

                                            <td className={cx('clear')}>
                                                <i
                                                    className="fa-solid fa-xmark"
                                                    onClick={() => handlerDelete(item.product._id)}
                                                ></i>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={cx('col-xl-3', 'col-12')}>
                    <div className={cx('total_money')}>
                        <p className={cx('money')}>THÔNG TIN THANH TOÁN</p>
                        <div className={cx('box_pay')}>
                            <div className={cx('payment_item')}>
                                <p>Tổng tiền</p>
                                <p>{formatNumber(state.totalMoney)} VND</p>
                            </div>
                            <div className={cx('payment_item')}>
                                <p>Phí vận chuyển</p>
                                <p>20.000 VND</p>
                            </div>
                            <div className={cx('payment_item')}>
                                <p>Tổng Voucher giảm giá:</p>
                                <p>-11.000 VND</p>
                            </div>
                            <div className={cx('payment_item')}>
                                <p>Tổng thanh toán</p>
                                <p>{formatNumber(state.totalPayMent)} VND</p>
                            </div>

                            <button type="button" className="btn btn-primary col-12" onClick={handlerPayment}>
                                By now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
