import classNames from 'classnames/bind';
import styles from './About.module.scss';

const cx = classNames.bind(styles);

const About = () => {
    return (
        <div className={cx('container', 'mt_box')}>
            <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Thông báo!</h4>
                <p>
                    Chúng tôi xin thông báo với sự phấn khích rằng trang web của chúng tôi đang trải qua quá trình phát
                    triển và sẽ sớm có thêm những tính năng mới độc đáo để cải thiện trải nghiệm của người dùng. <br />
                    Trong quá trình này, có một trang đặc biệt đang được phát triển để mang lại trải nghiệm tốt nhất cho
                    bạn. Đây có thể là nơi bạn sẽ tìm thấy những tính năng mới, giao diện người dùng cải tiến, và các
                    cập nhật quan trọng khác.
                    <br />
                    Chúng tôi xin chân thành cảm ơn sự kiên nhẫn và ủng hộ của quý khách trong thời gian chờ đợi này.
                    Đừng ngần ngại liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc ý kiến đóng góp nào. <br />
                    Chúng tôi rất mong được chia sẻ những cải tiến mới này với bạn và hy vọng rằng chúng sẽ mang lại
                    trải nghiệm trực tuyến tuyệt vời nhất. 
                </p>
                <hr />
                <p className="mb-0">Xin cảm ơn và hẹn gặp bạn trên trang web của chúng tôi!.</p>
            </div>
        </div>
    );
};

export default About;
