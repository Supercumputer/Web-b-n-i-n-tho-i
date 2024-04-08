import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { logo } from '../../../assets/image';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import StringContent from '../../Tippy/TippyTitle';
import { useEffect, useState } from 'react';
import Img from '../../Img/Img';
import { useSelector } from 'react-redux';
import { apiGetProducts } from '../../../api/service';
import Debounced from '../../Debounced/Debounced';
import { v4 as uuidv4 } from 'uuid';
const cx = classNames.bind(styles);

const Header = () => {
    const totalCart = useSelector((state) => state.auth.totalCart);
    const auth = useSelector((state) => state.auth.user);
    const searchs = useSelector((state) => state.pro.searchValue);
    const [check, setcheck] = useState(false);
    const [search, setSearch] = useState('');
    const [listSearch, setListSearch] = useState([]);
    const navigate = useNavigate();
    const handlerMenu = () => {
        setcheck(!check);
    };

    Debounced(search, 1000);

    useEffect(() => {
        if (search.trim() === '') {
            setListSearch([]);
        } else {
            callApi({ title: searchs, limit: 5 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchs]);

    const callApi = async (data) => {
        try {
            const res = await apiGetProducts(data);
            if (res && res.data) {
                setListSearch(res.data.tours);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlerSearch = () => {
        navigate('/shop');
    };

    return (
        <div className={cx('header_box')}>
            <div className="container-fluid bg-dark">
                <div className="container d-flex text-white justify-content-between align-items-center">
                    <p className="mb-0">Wellcome {auth?.userName ? auth.userName : ''} to SmartTL store</p>
                    <div className="box_icon_header d-flex justify-content-between align-items-center gap-3 py-1">
                        <i class="fa-brands fa-facebook-f"></i>
                        <i class="fa-brands fa-twitter"></i>
                        <i class="fa-brands fa-google"></i>
                        <i class="fa-brands fa-instagram"></i>
                        <p className={cx('language', 'mb-0', 'd-lg-block', 'd-none')}>English</p>
                    </div>
                </div>
            </div>

            <div className="container-fluid py-2 ">
                <div className="container d-flex justify-content-between align-items-center gap-3">
                    <div className={cx('logo')}>
                        <img src={logo} alt="" />
                    </div>
                    <div className={cx('box_serach_t', 'col-5', 'd-md-block', 'd-none')}>
                        <div className={cx('box_search')}>
                            <i class="fa-solid fa-magnifying-glass d-md-block d-none"></i>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setListSearch([]);
                                    }, 150);
                                }}
                                className="d-md-block d-none col-10"
                                name="search"
                                placeholder="Tìm kiếm tại đây"
                            />
                            <button className="d-md-block d-none" type="button" onClick={handlerSearch}>
                                Search
                            </button>
                        </div>
                        {listSearch.length > 0 && (
                            <div className={cx('box_result')}>
                                {listSearch.map((item) => {
                                    return (
                                        <Link key={uuidv4()}
                                            to={`/detail/${item.slug}/${item._id}`}
                                            className={cx('text_s', 'd-flex', 'gap-2')}
                                        >
                                            <div className={cx('box_img')}>
                                                <Img src={item.image[0]} />
                                            </div>
                                            <div className={cx('box_title')}>
                                                <p>{item.title}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className={cx('hotline', 'd-flex', 'align-items-center', 'gap-2')}>
                        <i class="fa-solid fa-headphones-simple d-none d-xl-block"></i>
                        <div className={cx('phone_number', 'd-none', 'd-xl-block')}>
                            <p className="mb-0">Free hotline</p>
                            <p className="mb-0">0338973258</p>
                        </div>
                    </div>
                    <div className={cx('box_acount_cart', 'd-flex', 'align-items-center', 'gap-3')}>
                        <i onClick={handlerMenu} className={cx('fa-solid', 'fa-bars', 'icon_menu')}></i>
                        <Link to="/acount" className={cx('cart_link')}>
                            <div className="account d-flex flex-md-column flex-row align-items-center gap-2 gap-lg-0">
                                <i class="fa-solid fa-user"></i>
                                <p className="mb-0 d-none d-lg-block">My Acount</p>
                            </div>
                        </Link>
                        <Link to="/cart" className={cx('cart_link')}>
                            <div className="cart d-flex flex-md-column flex-row align-items-center gap-2 gap-lg-0 position-relative">
                                <i class="fa-solid fa-cart-shopping"></i>
                                <p className="mb-0 d-none d-lg-block">My Cart</p>
                                {totalCart !== 0 && (
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        {totalCart}
                                        <span class="visually-hidden">unread messages</span>
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className={cx('container-fluid', 'border-top', 'border-bottom')}>
                <div className="container d-flex justify-content-between">
                    <div className="box_menu d-flex justify-content-xl-between justify-content-center align-items-center">
                        <div className="box d-none d-md-block">
                            <div className={cx('box_category', 'd-flex', 'align-items-center', 'gap-5')}>
                                <div className={cx('category', 'd-flex', 'align-items-center', 'gap-2')}>
                                    <i class="fa-solid fa-bars"></i>
                                    <p className="mb-0 me-5 me-md-0">CATEGORY</p>
                                </div>
                                <i class="fa-solid fa-caret-down ms-lg-5"></i>
                            </div>
                        </div>

                        <div className={cx('menu')}>
                            <ul className={cx({ check: check })}>
                                <li>
                                    <StringContent title="HOME">
                                        <NavLink
                                            to="/"
                                            className={(isActive) => cx('text_menu', { active: isActive.isActive })}
                                            onClick={() => setcheck(!check)}
                                        >
                                            HOME
                                        </NavLink>
                                    </StringContent>
                                </li>
                                <li>
                                    <StringContent title="SHOP">
                                        <NavLink
                                            to="/shop"
                                            className={(isActive) => cx('text_menu', { active: isActive.isActive })}
                                            onClick={() => setcheck(!check)}
                                        >
                                            SHOP
                                        </NavLink>
                                    </StringContent>
                                </li>
                                <li>
                                    <StringContent title="CONTAC US">
                                        <NavLink
                                            to="/contac"
                                            className={(isActive) => cx('text_menu', { active: isActive.isActive })}
                                            onClick={() => setcheck(!check)}
                                        >
                                            CONTACT US
                                        </NavLink>
                                    </StringContent>
                                </li>
                                <li>
                                    <StringContent title="ABOUT US">
                                        <NavLink
                                            to="/about"
                                            className={(isActive) => cx('text_menu', { active: isActive.isActive })}
                                            onClick={() => setcheck(!check)}
                                        >
                                            ABOUT US
                                        </NavLink>
                                    </StringContent>
                                </li>
                                <li>
                                    <StringContent title="BLOG">
                                        <NavLink
                                            to="/blog"
                                            className={(isActive) => cx('text_menu', { active: isActive.isActive })}
                                            onClick={() => setcheck(!check)}
                                        >
                                            BLOG
                                        </NavLink>
                                    </StringContent>
                                </li>
                                <li>
                                    <div className={cx('container-input')}>
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className={cx('input')}
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                        <i
                                            className={cx('fa-solid', 'fa-magnifying-glass')}
                                            onClick={() => {
                                                setcheck(!check);
                                                handlerSearch();
                                            }}
                                        ></i>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={cx('text_sale', 'd-flex', 'gap-2', 'align-items-center')}>
                        <i class="fa-regular fa-lightbulb d-none d-xl-block"></i>
                        <span className="d-none d-xl-block">Iphon 15 sale off 30% duy nhất hôm nay</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
