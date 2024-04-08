import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import { useParams } from 'react-router-dom';
import Img from 'components/Img/Img';
import { useEffect, useState } from 'react';
import { apiGetProduct, apiAddCart, apiComment } from 'api/service';
import SlidePro from 'components/Slide/SlidePro';
import Loading from 'components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { cart } from '../../../redux/athu';
import { start, formatNumber } from 'ultils/helper';
import { v4 as uuidv4 } from 'uuid';

const cx = classNames.bind(styles);

const listSize = ['S', 'L', 'M', 'Xl', 'XXL'];
const listColor = ['Red', 'Blue', 'Gray', 'Black'];

const Detail = () => {
    const { id } = useParams();
    const auth = useSelector((state) => state.auth.user);

    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState();
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [quantity, setQuantiTy] = useState(1);
    const [img, setImg] = useState('');

    const disPatch = useDispatch();

    useEffect(() => {
        callApi(id);
    }, [id]);

    const callApi = async (id) => {
        try {
            setLoading(true);
            const res = await apiGetProduct(id);

            if (res && res.data) {
                setProduct(res.data);
                setImg(res.data.image[0]);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlerCart = async () => {
        try {
            const res = await apiAddCart({
                idSp: id,
                size: size || undefined,
                color: color || undefined,
                quantity: quantity,
            });
            disPatch(cart(res.totalCart));
            setSize('');
            setColor('');
            setQuantiTy(1);
        } catch (error) {
            console.log(error);
        }
    };

    const handlerComment = async () => {
        try {
            if (comment.trim() === '') {
                return;
            }
            const res = await apiComment({ comment, id, start: 5 });
            if (res && res.sucess === true) {
                callApi(id);
                setComment('');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className={cx('backGr', 'mt_box')}>
                    <div className={cx('container', 'pt-3')}>
                        <div className={cx('box_bg', 'd-flex', 'flex-lg-row', 'flex-column')}>
                            <div className={cx('col-lg-6', 'col-12')}>
                                <div className={cx('imgs', 'd-flex', 'flex-column', 'gap-2')}>
                                    <div className={cx('img_c', 'col-lg-12')}>
                                        <Img src={img || product.image[0]} />
                                    </div>
                                    <div className={cx('box_img_p', 'd-flex', 'gap-2', 'col-lg-12')}>
                                        {product.image.map((item) => {
                                            return (
                                                <div
                                                    key={uuidv4()}
                                                    className={cx('img_p')}
                                                    onClick={() => setImg(item)}
                                                >
                                                    <Img src={item} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-lg-6', 'col-12')}>
                                <div className={cx('box_infor')}>
                                    <h1 className={cx('text_name')}>{product?.title}</h1>
                                    <ul>
                                        <li className={cx('cll')}>{start(3)}</li>
                                        <li>41 Đánh Giá</li>
                                        <li>{product.sold} Đã Bán</li>
                                    </ul>

                                    <div className={cx('box_price')}>
                                        <s className={cx('price_old')}>{formatNumber(product.price)} VND</s>
                                        <p className={cx('price_new')}>
                                            {formatNumber(product.price - (product.price * 10) / 100)} VND
                                        </p>
                                    </div>

                                    <div className={cx('box_size', 'd-flex', 'align-items-center', 'gap-4', 'my-3')}>
                                        <p className="mb-0">Size: </p>
                                        <div className={cx('list_size')}>
                                            {listSize.map((item) => {
                                                return (
                                                    <div
                                                        key={uuidv4()}
                                                        className={cx('list_1', { active: item === size })}
                                                        onClick={() => setSize(item)}
                                                    >
                                                        <span>{item}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className={cx('box_size', 'd-flex', 'align-items-center', 'gap-4', 'my-3')}>
                                        <p className="mb-0">Color: </p>
                                        <div className={cx('list_size')}>
                                            {listColor.map((item) => {
                                                return (
                                                    <button
                                                        key={uuidv4()}
                                                        type="button"
                                                        className={cx('butn', { primary: item === color })}
                                                        onClick={() => setColor(item)}
                                                    >
                                                        <span>{item}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <p>Mã Giảm Giá Của Shop: ko</p>
                                    <div className={cx('box_quantity', 'd-flex', 'align-items-center', 'gap-3')}>
                                        <p className="mb-0">Số lượng: </p>
                                        <div className={cx('box_number', 'd-flex')}>
                                            <button onClick={() => setQuantiTy(quantity - 1)}>-</button>
                                            <input type="hiden" value={quantity} min={1} />
                                            <button onClick={() => setQuantiTy(quantity + 1)}>+</button>
                                        </div>
                                        <p className="mb-0">{product?.quantity} sản phẩm có sẵn</p>
                                    </div>
                                    <div className={cx('box_btn', 'mt-4', 'd-flex', 'gap-3')}>
                                        <button
                                            type="button"
                                            onClick={handlerCart}
                                            className="btn btn-outline-danger py-3 px-5"
                                        >
                                            <i className="fa-brands fa-opencart"></i> Add to cart
                                        </button>
                                        <button type="button" className="btn btn-primary py-3 px-5">
                                            By Now
                                        </button>
                                    </div>
                                    <div className={cx('box_btn', 'mt-4', 'd-flex', 'gap-5')}>
                                        <div className={cx('list_ic')}>
                                            <i className="fa-regular fa-heart"></i>
                                            <p>WISHLIST</p>
                                        </div>

                                        <div className={cx('list_ic')}>
                                            <i className="fa-regular fa-share-from-square"></i>
                                            <p>SHARE</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mt-3">
                        <div className={cx('box_pro')}>
                            <h1 className={cx('text_name')}>Popular category</h1>
                            <div className="row">
                                <SlidePro categoryId={product?.category} />
                            </div>
                        </div>
                    </div>

                    <div className="container mt-3">
                        <div className={cx('box_pro')}>
                            <h1 className={cx('text_title')}>CHI TIẾT SẢN PHẨM</h1>
                            <div className={cx('box_detail', 'ps-3')}>
                                <div className="d-flex align-items-center">
                                    <p>Danh muc: </p>
                                    <p className={cx('value')}>Shoppe</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p>Bộ sản phẩm: </p>
                                    <p className={cx('value')}>Không</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p>Loại bàn phím: </p>
                                    <p className={cx('value')}>Bàn phím cơ</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p>Hạn bảo hành: </p>
                                    <p className={cx('value')}>6 tháng</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p>Loại bảo hành: </p>
                                    <p className={cx('value')}>Bảo hành nhà cung cấp</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p>Game chuyên dụng: </p>
                                    <p className={cx('value')}>Có</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p>Kho hàng: </p>
                                    <p className={cx('value')}>21164</p>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p>Gửi từ: </p>
                                    <p className={cx('value')}>TP. Hồ Chí Minh</p>
                                </div>
                            </div>

                            <h1 className={cx('text_title')}>CHI TIẾT SẢN PHẨM</h1>
                            <div className={cx('box_detail', 'ps-3')}>
                                <p>
                                    Digital Mall đảm bảo: <br />
                                    - Hình ảnh sản phẩm giống 100%. <br />
                                    - Chất lượng sản phẩm tốt 100%. <br />
                                    - Sản phẩm được kiểm tra kĩ càng, nghiêm ngặt trước khi giao hàng. <br />
                                    - Sản phẩm luôn có sẵn trong kho hàng. <br />
                                    - Hoàn tiền ngay nếu sản phẩm không giống với mô tả. <br />
                                    - Đổi trả ngay theo quy định nếu bất kì lí do gì khiến bạn không hài lòng. <br />-
                                    Giao hàng toàn quốc. Còn chần chờ gì nữa, hãy nhanh tay đặt mua cho mình những sản
                                    phẩm này về tủ đồ của mình nhé!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="container mt-3">
                        <div className={cx('box_pro')}>
                            <h1 className={cx('text_name')}>ĐÁNH GIÁ SẢN PHẨM</h1>
                            {auth && product.ratings.length > 0 && (
                                <div className={cx('box_start', 'd-flex', 'flex-lg-row', 'flex-column')}>
                                    <div className={cx('rating_total')}>
                                        <p className={cx('mb-0')}>
                                            <span>4.6</span> trên 5
                                        </p>
                                        <div className={cx('d-flex', 'gap-1', 'my-2')}>{start(4)}</div>
                                    </div>
                                    <div className={cx('star', 'd-flex', 'gap-3', 'align-items-center')}>
                                        <button className={cx('btn_Start')}>Tất cả</button>
                                        <button className={cx('btn_Start')}>5 sao</button>
                                        <button className={cx('btn_Start')}>4 sao</button>
                                        <button className={cx('btn_Start')}>3 sao</button>
                                        <button className={cx('btn_Start')}>2 sao</button>
                                        <button className={cx('btn_Start')}>1 sao</button>
                                    </div>
                                </div>
                            )}

                            {auth && (
                                <div className={cx('comment_block', 'd-flex', 'gap-3', 'mt-3', 'mb-4')}>
                                    <div className={cx('user_avata')}>
                                        <Img src={auth.avata} />
                                    </div>
                                    <div className={cx('cccm', 'd-flex', 'align-items-center')}>
                                        <input
                                            type="text"
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            className={cx('input_comment')}
                                            placeholder="Write coment here ..."
                                        />
                                        <i className="fa-regular fa-paper-plane" onClick={handlerComment}></i>
                                    </div>
                                </div>
                            )}

                            <div className={cx('comments', 'mt-3')}>
                                {product.ratings.map((item) => {
                                    return (
                                        <div key={uuidv4()} className={cx('items', 'd-flex', 'gap-3')}>
                                            <div className={cx('user_avata')}>
                                                <Img src={item.postedBy.avata} />
                                            </div>
                                            <div className={cx('rating_start')}>
                                                <p className={cx('user_name')}>
                                                    {item.postedBy.lastName + ' ' + item.postedBy.firstName}
                                                </p>
                                                <div className={cx('d-flex', 'gap-1', 'my-2')}>{start(item.start)}</div>
                                                <p>{item.createdAt}</p>
                                                <p className={cx('rating_text')}>{item.comment}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Detail;
