import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiGetPost, apiUpdateHeart } from 'api/service';
import Img from 'components/Img/Img';
import { useSelector } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
const cx = classNames.bind(styles);

const BlogCt = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [post, setPost] = useState({});
    const [heart, setHeart] = useState(false);
    const params = useParams();

    useEffect(() => {
        callApi();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            const isUserLiked = post.heart && post.heart.includes(user?._id);
            setHeart(isUserLiked);
        }
    }, [post, user, isAuthenticated]);

    const callApi = async () => {
        try {
            const res = await apiGetPost(params.slug);
            if (res && res.success === true) {
                setPost(res.data);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handlerUpdateheart = async (id) => {
        try {
            const res = await apiUpdateHeart(id);
            if (res && res.success === true) {
                setPost(res.data);
                setHeart(!heart);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className={cx('container', 'mt_box')}>
                <Breadcrumbs />
            </div>

            <div className={cx('container')}>
                <div className={cx('gd', 'd-flex', 'flex-column', 'col-lg-12')}>
                    <article className={cx('boxItem', 'col-12', 'col-lg-12')}>
                        <div className={cx('bom', 'flex-md-row', 'flex-column')}>
                            <Img src={post.image} alt="" />
                            <div className={cx('contex', 'd-flex', 'flex-column', 'justify-content-between', 'gap-3')}>
                                <div className={cx('box')}>
                                    <h2 className="my-3">{post.title}</h2>
                                    <p className={cx('text')}>{post.description}</p>
                                    <p>Ngày xuất bản: 18/08/2023 09:50 </p>
                                </div>
                                <div
                                    className={cx(
                                        'boxs',
                                        'd-flex',
                                        'justify-content-between',
                                        'flex-column',
                                        'flex-md-row',
                                        'gap-5',
                                    )}
                                >
                                    <div className={cx('d-flex', 'align-items-center', 'gap-3')}>
                                        <div className={cx('view', 'd-flex', 'align-items-center', 'gap-1')}>
                                            <i className="fa-regular fa-eye"></i>
                                            {post.view} view
                                        </div>
                                        <div
                                            className={cx('view', 'd-flex', 'align-items-center', 'gap-1')}
                                            onClick={() => handlerUpdateheart(post._id)}
                                        >
                                            {heart ? (
                                                <i class="fa-solid fa-heart"></i>
                                            ) : (
                                                <i className="fa-regular fa-heart"></i>
                                            )}
                                            {post.totalheart} Heart
                                        </div>
                                        <div className={cx('view', 'd-flex', 'align-items-center', 'gap-1')}>
                                            <i className="fa-regular fa-comment"></i>
                                            122 Comment
                                        </div>
                                    </div>
                                    <Link to={'/blog'} className={cx('back', 'd-flex', 'align-items-center', 'gap-2')}>
                                        <i className="fa-solid fa-arrow-left"></i>
                                        <span>BACK TO RIGHT SIDEBAR</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
};

export default BlogCt;
