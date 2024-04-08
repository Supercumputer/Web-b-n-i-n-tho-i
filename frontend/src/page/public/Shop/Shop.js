import classNames from 'classnames/bind';
import styles from './Shop.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Product from '../../../components/Product/Product';
import ReactPaginate from 'react-paginate';
import ComboxFillter from '../../../components/Tippy/TippyyBox';
import { apiGetProducts } from '../../../api/service';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
const cx = classNames.bind(styles);

const listColor = ['red', 'blue', 'green', 'black'];
const listSize = ['S', 'M', 'L', 'XL', 'XXL'];

const Shop = () => {
    const { searchValue, categoryId } = useSelector((state) => state.pro);

    const [param, setParam] = useState({});
    const [totalPages, setTotalPages] = useState();
    const [listPro, setListPro] = useState([]);
    const [price1, setPrice1] = useState();
    const [price2, setPrice2] = useState();
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);

    useEffect(() => {
        callApi({ ...param, color, size, title: searchValue || undefined, category: categoryId || undefined });
    }, [param, color, size, searchValue, categoryId]);

    const handlePageClick = (e) => {
        let page = e.selected + 1;
        setParam((pre) => ({ ...pre, page: page || undefined }));
    };

    const handlePrice = () => {
        setParam((pre) => ({ ...pre, 'price[gte]': price1 || undefined, 'price[lte]': price2 || undefined }));
    };

    const handleSort = (e) => {
        setParam((pre) => ({ ...pre, sort: e.target.value || undefined }));
    };

    const handleColor = (item) => {
        setColor((pre) => {
            const isColor = color.includes(item);
            if (isColor) {
                return color.filter((ite) => ite !== item);
            } else {
                return [...pre, item];
            }
        });
    };

    const handleSize = (item) => {
        setSize((pre) => {
            const isSize = size.includes(item);
            if (isSize) {
                return size.filter((ite) => ite !== item);
            } else {
                return [...pre, item];
            }
        });
    };

    const callApi = async (data) => {
        try {
            const res = await apiGetProducts(data);
            if (res && res.data) {
                setListPro(res.data.tours);
                setTotalPages(res.totalPages);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={cx('container', 'mt_box')}>
                <Breadcrumbs />
            </div>

            <div className={cx('container')}>
                <div className={cx('box_filter_sort', 'd-flex', 'flex-md-row', 'flex-column')}>
                    <div className={cx('box_left', 'col-9')}>
                        <p className={cx('filter_name')}>Products</p>
                        <div className={cx('box_filter')}>
                            <ComboxFillter
                                title="The highest price is 48.550.052,68 VNDDefault input value is USD"
                                conten={
                                    <div className={cx('combox')}>
                                        <div className="row">
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    value={price1}
                                                    onChange={(e) => setPrice1(e.target.value)}
                                                    onBlur={handlePrice}
                                                    className="form-control"
                                                    placeholder="From"
                                                />
                                            </div>
                                            <div className="col">
                                                <input
                                                    type="text"
                                                    value={price2}
                                                    onChange={(e) => setPrice2(e.target.value)}
                                                    onBlur={handlePrice}
                                                    className="form-control"
                                                    placeholder="To"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
                            >
                                <div className={cx('item')}>
                                    <span>Price</span>
                                    <i className="fa-solid fa-angle-down"></i>
                                </div>
                            </ComboxFillter>

                            <ComboxFillter
                                title="The highest price is selected"
                                conten={
                                    <div className={cx('combox')}>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="flexCheckDefault"
                                            />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Default checkbox
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                                id="flexCheckChecked"
                                            />
                                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                                Checked checkbox
                                            </label>
                                        </div>
                                    </div>
                                }
                            >
                                <div className={cx('item')}>
                                    <span>Capacity</span>
                                    <i className="fa-solid fa-angle-down"></i>
                                </div>
                            </ComboxFillter>

                            <ComboxFillter
                                title="The highest price is 48.550.052,68 VNDDefault input value is USD"
                                conten={
                                    <div className={cx('combox')}>
                                        {listColor.map((item, index) => {
                                            return (
                                                <div className="form-check" key={uuidv4()}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={item}
                                                        checked={color.includes(item)}
                                                        onChange={() => handleColor(item)}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        {item}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                }
                            >
                                <div className={cx('item')}>
                                    <span>Color</span>
                                    <i className="fa-solid fa-angle-down"></i>
                                </div>
                            </ComboxFillter>

                            <ComboxFillter
                                title="The highest price is 48.550.052,68 VNDDefault input value is USD"
                                conten={
                                    <div className={cx('combox')}>
                                        {listSize.map((item, index) => {
                                            return (
                                                <div className="form-check" key={uuidv4()}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={item}
                                                        checked={size.includes(item)}
                                                        onChange={() => handleSize(item)}
                                                    />
                                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                                        {item}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                }
                            >
                                <div className={cx('item')}>
                                    <span>Size</span>
                                    <i className="fa-solid fa-angle-down"></i>
                                </div>
                            </ComboxFillter>
                        </div>
                    </div>
                    <div className={cx('box_right', 'col-md-3', 'col-12')}>
                        <p className={cx('filter_name')}>Sort by</p>
                        <div className={cx('box_filter')}>
                            <select className="form-select" onChange={handleSort} aria-label="Default select example">
                                <option value="" selected>
                                    Sort theo ...
                                </option>
                                <option value="price">Price</option>
                                <option value="sold">Sold</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('container', 'mt-3')}>
                <div className="row">
                    {listPro.map((item, index) => {
                        return (
                            <div key={uuidv4()} className={cx('col-lg-3', 'col-xl-2', 'col-md-3', 'col-6')}>
                                <Product data={item} />
                            </div>
                        );
                    })}
                </div>
            </div>
            {totalPages <= 0 ? (
                <div className={cx('tecv')}>Không có sản phẩm nào.</div>
            ) : (
                <div className={cx('page')}>
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={totalPages}
                        previousLabel="< previous"
                        marginPagesDisplayed={2}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            )}
        </>
    );
};

export default Shop;
