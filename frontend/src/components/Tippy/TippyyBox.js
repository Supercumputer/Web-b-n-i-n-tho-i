import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Tippy.module.scss';
const cx = classNames.bind(styles);

const ComboxFillter = ({ title, conten, children }) => (
    <Tippy
        trigger="click"
        hideOnClick={true}
        interactive={true}
        placement="bottom-start"
      
        render={(attrs) => (
            <div className={cx('boxs')} tabIndex="-1" {...attrs}>
                <div className={cx('fillter_change')}>
                    <p>{title}</p>
                    {conten}
                </div>
            </div>
        )}
    >
        {children}
    </Tippy>
);

export default ComboxFillter;
