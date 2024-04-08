import MainLayout from "layout/mainLayout/mainLayout"
import { Dasboad, Users, Categorys, Orders, Products } from "page"
import path from "ultils/path"

const listRouter = [
    {
        path: path.dasboad,
        component: Dasboad,
        layout: MainLayout
    },
    {
        path: path.users,
        component: Users,
        layout: MainLayout
    },
    {
        path: path.categorys,
        component: Categorys,
        layout: MainLayout
    },
    {
        path: path.orders,
        component: Orders,
        layout: MainLayout
    },
    {
        path: path.products,
        component: Products,
        layout: MainLayout
    }
]
export default listRouter