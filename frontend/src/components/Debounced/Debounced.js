import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../../redux/product';

const Debounced = (value, time) => {
    const disPatch = useDispatch();

    useEffect(() => {
        let id = setTimeout(() => {
            disPatch(search(value));
        }, time);
        
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

};

export default Debounced;
