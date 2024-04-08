import instance from './axios';

export const apiLogin = (data) => {
    return instance.post('/api/athu/login', data);
};

export const apiLogout = () => {
    return instance.post('/api/athu/logout');
};

export const apiRegister = (data) => {
    return instance.post('/api/athu/register', data);
};

export const apiGetAcount = () => {
    return instance.get('/api/user/getAcount');
};

export const apiGetCategorys = () => {
    return instance.get('/api/category/getcategorys')
}

export const apiGetBanners = () => {
    return instance.get('/api/banner/getbanners')
}

export const apiGetProducts = (data) => {
    return instance.get('/api/product/getproducts', {params: data})
}

export const apiGetProduct = (id) => {
    return instance.get(`/api/product/getproduct/${id}`)
}

export const apiGetUser= (id) => {
    return instance.get(`/api/user/getuser/${id}`)
}

export const apiAddCart = (data) => {
    return instance.put("/api/user/updatecart/", data)
}

export const apiDeleteCart = (id) => {
    return instance.delete(`/api/user/deletecart/${id}`)
}

export const apiDeleteCarts = (id) => {
    return instance.delete(`/api/user/deletecarts/${id}`)
}

export const apiRefreshToken = () => {
    return instance.get(`/api/user/refreshtoken`)
}

export const apiComment = (data) => {
    return instance.post('/api/product/ratingproduct', data)
}

export const apiUpdateUser = (data) => {
    return instance.put('/api/user/updateuser', data)
}

export const apiGetPosts = () => {
    return instance.get('/api/post/getposts')
}

export const apiGetPost = (slug) => {
    return instance.get(`/api/post/getpost/${slug}`)
}

export const apiUpdateHeart = (id) => {
    return instance.put(`/api/post/updateheart/${id}`)
}

export const apiCreateOrder = (data) => {
    return instance.post("/api/order/createorder/", data)
}
