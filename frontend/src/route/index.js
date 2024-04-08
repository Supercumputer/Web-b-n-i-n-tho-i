import HomeLayout from 'layout/homeLayout/HomeLayout';
import { Home, Shop, Login, Register, Detail, About } from 'page/public';
import { Cart, Auth, Security } from 'page/member';
import path from 'ultils/path';
import AuthLayout from 'layout/AuthLayout/AuthLayout';
import Contac from 'page/public/Contac/Contac';
import Blog from 'page/public/Blog/Blog';
import BlogCt from 'page/public/Blog/BlogCt';
import Checkout from 'page/member/PayMent/PayMent';

const publicRouter = [
    {
        path: path.home,
        component: Home,
        layout: HomeLayout,
    },
    {
        path: path.shop,
        component: Shop,
        layout: HomeLayout,
    },

    {
        path: path.login,
        component: Login,
    },
    {
        path: path.register,
        component: Register,
    },
    {
        path: path.contac,
        component: Contac,
        layout: HomeLayout,
    },
    {
        path: path.blog,
        component: Blog,
        layout: HomeLayout,
    },
    {
        path: `${path.blogCt}/:slug`,
        component: BlogCt,
        layout: HomeLayout,
    },
    {
        path: path.about,
        component: About,
        layout: HomeLayout,
    },
    {
        path: `${path.detail}/:slug/:id`,
        component: Detail,
        layout: HomeLayout,
    },
];

const privateRouter = [
    {
        path: '/acount',
        component: Auth,
        layout: AuthLayout,
    },
    {
        path: '/security',
        component: Security,
        layout: AuthLayout,
    },
    {
        path: '/cart',
        component: Cart,
        layout: HomeLayout,
    },
    {
        path: path.checkOut,
        component: Checkout,
        layout: HomeLayout,
    },
];

export { publicRouter, privateRouter };
