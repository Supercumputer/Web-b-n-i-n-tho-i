import classNames from 'classnames/bind';
import styles from './Security.module.scss';
import Img from '../../../components/Img/Img';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { apiUpdateUser } from 'api/service';
import { shoModel } from 'ultils/showModel';
const cx = classNames.bind(styles);

const Security = () => {
    const auth = useSelector((state) => state.auth.user);

    const [state, setState] = useState({
        lastName: auth.lastName,
        firstName: auth.firstName,
        email: auth.email,
        userName: auth.userName,
        phone: auth.phone,
        avata: auth.avata,
    });

    const [image, setImage] = useState({preview: auth.avata});

    useEffect(()=>{
        return () => image && URL.revokeObjectURL(image.preview);
    // eslint-disable-next-line no-use-before-define
    }, [image])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
    };
    
    const updateUser = async () => {
        try {
            const formData = new FormData();

            // eslint-disable-next-line no-unused-expressions
            formData.append('lastName', state.lastName),
            formData.append('firstName', state.firstName),
            formData.append('email', state.email),
            formData.append('userName', state.userName),
            formData.append('phone', state.phone),
            formData.append('image', image);
            
            const res = await apiUpdateUser(formData)
            if(res && res.data && res.success === true){
                shoModel('congratulations', res.message, 'success');
            }else{
                shoModel('Opps!', res.message, 'warning');

            }
        } catch (error) {
            console.log(error)
        }
    } 

    return (
        <div className={cx('box_infor', 'd-flex')}>
            <div className={cx('box_text', 'col-9')}>
                <h2 className={cx('text_name')}>Thông tin cá nhân</h2>
                <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>

                <div className="row mt-3">
                    <div className={cx('col', 'text_input', 'd-flex', 'flex-column')}>
                        <b>Họ</b>
                        <input
                            type="text"
                            value={state.lastName}
                            onChange={(e) => setState((pre) => ({ ...pre, lastName: e.target.value }))}
                        />
                    </div>

                    <div className={cx('col', 'text_input', 'd-flex', 'flex-column')}>
                        <b>Tên</b>
                        <input
                            type="text"
                            value={state.firstName}
                            onChange={(e) => setState((pre) => ({ ...pre, firstName: e.target.value }))}
                        />
                    </div>
                </div>

                <div className={cx('text_input', 'd-flex', 'flex-column')}>
                    <b>Email</b>
                    <input
                        type="email"
                        value={state.email}
                        onChange={(e) => setState((pre) => ({ ...pre, email: e.target.value }))}
                    />
                </div>

                <div className={cx('text_input', 'd-flex', 'flex-column')}>
                    <b>User Name</b>
                    <input
                        type="text"
                        value={state.userName}
                        onChange={(e) => setState((pre) => ({ ...pre, userName: e.target.value }))}
                    />
                </div>

                <div className={cx('text_input', 'd-flex', 'flex-column')}>
                    <b>Số điện thoại</b>
                    <input
                        type="text"
                        value={state.phone}
                        onChange={(e) => setState((pre) => ({ ...pre, phone: e.target.value }))}
                    />
                </div>
                <button type="button" className="btn btn-primary mt-4" onClick={updateUser}>
                    Update infor
                </button>
            </div>
            <div className={cx('box_avata', 'col-3')}>
                <div className={cx('avata')}>
                    <Img src={image.preview} />
                </div>
                <input id="fileInput" name="image" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
                <label htmlFor="fileInput" className="form-label">
                    <b>Avata</b>
                </label>
            </div>
        </div>
    );
};

export default Security;
