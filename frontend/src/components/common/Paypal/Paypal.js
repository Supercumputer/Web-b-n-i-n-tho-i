import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { apiCreateOrder } from 'api/service';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shoModel } from 'ultils/showModel';

// This value is from the props in the UI
const style = { layout: 'vertical' };

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ currency, showSpinner, amount, payLoad, setHiden }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate()
    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options,
                currency: currency,
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency, showSpinner]);

    const callApi = async () => {
        try {
            const res = await apiCreateOrder({ ...payLoad, status: 'Đã thanh toán' });
            console.log(res);

            if (res && res.success === true) {
                setHiden(true);
                shoModel('congratulations', res.message, 'success').then(() => {
                    navigate('/')
                });
            }
        } catch (error) {}
    };

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) =>
                    actions.order
                        .create({
                            purchase_units: [{ amount: { currency_code: currency, value: amount } }],
                        })
                        .then((orderId) => orderId)
                }
                onApprove={(data, actions) =>
                    actions.order.capture().then(async (response) => {
                        if (response.status === 'COMPLETED') {
                            callApi();
                        }
                    })
                }
            />
        </>
    );
};

export default function Paypal({ amount, payLoad, setHiden }) {
    return (
        <div style={{ maxWidth: '750px', minHeight: '200px' }}>
            <PayPalScriptProvider options={{ clientId: 'test', components: 'buttons', currency: 'USD' }}>
                <ButtonWrapper
                    setHiden={setHiden}
                    payLoad={payLoad}
                    amount={amount}
                    currency="USD"
                    showSpinner={false}
                />
            </PayPalScriptProvider>
        </div>
    );
}
