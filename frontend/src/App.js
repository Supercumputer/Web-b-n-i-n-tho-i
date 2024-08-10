import { Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { publicRouter, privateRouter } from './route';
import PrivateRouter from './components/PrivateRouter/PrivateRouter';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { apiGetAcount } from 'api/service';
import { login } from './redux/athu';
import { v4 as uuidv4 } from 'uuid';

function App() {
    const disPatch = useDispatch();

    useEffect(() => {
        callApi();
    }, []);

    const callApi = async () => {
        try {
            const res = await apiGetAcount();

            if (res && res.userData) {
                disPatch(login(res.userData));
            }
        } catch (error) {
            toast.error(error)
        }
    };
    
    return (
        <div className="App">
            <Router>
                <Routes>
                    {publicRouter.map((item, index) => {
                        let Layout;
                        const Component = item.component;
                        if (item.layout) {
                            Layout = item.layout;
                        } else {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={uuidv4()}
                                path={item.path}
                                element={
                                    <Layout>
                                        <Component />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    <Route path="/" element={<PrivateRouter />}>
                        {privateRouter.map((item, index) => {
                            let Layout;
                            const Component = item.component;
                            if (item.layout) {
                                Layout = item.layout;
                            } else {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={uuidv4()}
                                    path={item.path}
                                    element={
                                        <Layout>
                                            <Component />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Route>
                </Routes>
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default App;
