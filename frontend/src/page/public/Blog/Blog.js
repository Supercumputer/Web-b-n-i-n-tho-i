/* eslint-disable jsx-a11y/iframe-has-title */
import classNames from 'classnames/bind';
import styles from './Blog.module.scss';
import { Link } from 'react-router-dom';
import PostSpay from 'components/PostSpay/PostSpay';
import { v4 as uuidv4 } from 'uuid';
import { apiGetPosts } from 'api/service';
import { useEffect, useState } from 'react';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
const cx = classNames.bind(styles);

const Blog = () => {
    const [listPost, setListPost] = useState([]);

    useEffect(() => {
        callApi();
    }, []);

    const callApi = async () => {
        try {
            const res = await apiGetPosts();
            console.log(res);
            if (res && res.success === true) {
                setListPost(res.data);
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
                    {listPost.map((item) => {
                        return <PostSpay key={uuidv4()} data={item} />;
                    })}
                </div>
            </div>
        </>
    );
};

export default Blog;
