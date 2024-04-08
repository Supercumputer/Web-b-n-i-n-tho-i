/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import styles from './PostSpay.module.scss';
import { Link } from 'react-router-dom';
import path from 'ultils/path';

const cx = classNames.bind(styles);

const PostSpay = ({ data }) => {
    return (
        <article className={cx('boxItem', 'col-12', 'col-lg-12')}>
            <div className={cx('bom', 'd-flex','flex-md-row', 'flex-column')}>
                <div className={cx('box_img', 'col-md-3', 'col-12')}>
                    <img src={data.image} alt="" />
                </div>

                <div className={cx('col-md-9', 'col-12', 'contex', 'd-flex', 'flex-column', 'justify-content-between', 'gap-3')}>
                    <div className={cx('box')}>
                        <p>18/08/2023 09:50 </p>
                        <h2>{data.title}</h2>
                        <p className={cx('itemd')}>{data.description}</p>
                    </div>
                    <div className={cx('box', 'd-flex', 'justify-content-between')}>
                        <div className={cx('d-flex', 'align-items-center', 'gap-3')}>
                            <div className={cx('view', 'd-flex', 'align-items-center', 'gap-1')}>
                                <i className="fa-regular fa-eye"></i>
                                {data.view} view
                            </div>
                            <div className={cx('view', 'd-flex', 'align-items-center', 'gap-1')}>
                                <i className="fa-regular fa-heart"></i>
                                {data.totalheart} Heart
                            </div>
                            <div className={cx('view', 'd-flex', 'align-items-center', 'gap-1')}>
                                <i className="fa-regular fa-comment"></i>
                                122 Comment
                            </div>
                        </div>
                        <Link 
                            to={`${path.blogCt}/${data.slug}`}
                            className={cx(
                                'seeMore',
                                'd-flex',
                                'align-items-center',
                                'gap-1',
                                'd-lg-block',
                                'd-md-none',
                            )}
                        >
                            <span>Read more </span>
                            <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PostSpay;
