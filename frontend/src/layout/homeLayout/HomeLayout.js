import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/footer/Footer';

const HomeLayout = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default HomeLayout;
