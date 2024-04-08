import {useState} from 'react'
import {imgEr} from '../../assets/image'

const Img = ({src, ...prop}) => {
    const [img, setImg] = useState('');

    const handlerError = () => {
        setImg(imgEr)
    } 

    return (
        <img src={img || src} alt="" onError={handlerError} {...prop}/>
    )
}

export default Img