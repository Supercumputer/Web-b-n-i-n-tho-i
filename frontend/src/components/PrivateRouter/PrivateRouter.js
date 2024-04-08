import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { login, alert, clearAlert } from '../../redux/athu';
import { apiGetAcount } from '../../api/service';
import Loading from '../Loading/Loading';
import { shoModel } from 'ultils/showModel';
const PrivateRouter = () => {
    const disPatch = useDispatch();
    const auth = useSelector((state) => state.auth.isAuthenticated);
    const mes = useSelector((state) => state.auth.mes);

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        callApi();
    }, []);

    useEffect(()=> {
        if(mes){
            shoModel('Opps!', mes, 'error')
            disPatch(clearAlert())
        }
    }, [mes])

    const callApi = async () => {
        try {
            const res = await apiGetAcount();

            if (res && res.userData) {
                disPatch(login(res.userData));
                setLoading(false)
            }else{
                disPatch(alert(res.messager))
                setLoading(false);
            }
            
        } catch (error) {
            console.log(error);
        }
    };

    return loading ? <Loading /> : auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
