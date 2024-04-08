import { NavLink } from "react-router-dom";
import path from "ultils/path";
const MainLayout = ({ children }) => {
  return (
    <div className="flex w-full">
      <div className="bg-[#001C41] w-56 h-screen py-5 px-4">
        <div className="flex flex-col justify-center items-center border-b-2 border-[#fff]">
          <div className="rounded-full overflow-hidden w-28 h-28 border-solid border-4 border-[#fff]">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtVo44H-n692rckAV1j7wYV5_JqUhdY_Dnsw&usqp=CAU"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-[#fff] font-semibold">Hồ Quang</h2>
          <p className="text-[#fff] mb-3">Chào mừng bạn trở lại</p>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex items-center bg-yellow-500 p-3 rounded-md gap-4 text-[#001C41]">
            <i className="fa-brands fa-opencart font-semibold"></i>
            <span className="text-sm font-semibold">POST Bán hàng</span>
          </div>

          <NavLink
            to={`/${path.dasboad}`}
            className={({ isActive }) =>
              `flex p-3 items-center rounded-md gap-4 text-sm ${
                isActive
                  ? "bg-[#C5DEFD] text-[#001C41] font-semibold"
                  : "bg-transparent text-[#fff] hover:bg-[#C5DEFD] hover:text-[#001C41] hover:font-semibold"
              }`
            }
          >
            <i className="fa-solid fa-chart-simple"></i>
            <span className="">Bảng điều khiển</span>
          </NavLink>

          <NavLink
            to="/kk"
            className={({ isActive }) =>
              `flex p-3 items-center rounded-md gap-4 text-sm ${
                isActive
                  ? "bg-[#C5DEFD] text-[#001C41] font-semibold"
                  : "bg-transparent text-[#fff] hover:bg-[#C5DEFD] hover:text-[#001C41] hover:font-semibold"
              }`
            }
          >
            <i className="fa-solid fa-list-check"></i>
            <span className="">Quản lý nhân viên</span>
          </NavLink>

          <NavLink
            to={`/${path.users}`}
            className={({ isActive }) =>
              `flex p-3 items-center rounded-md gap-4 text-sm ${
                isActive
                  ? "bg-[#C5DEFD] text-[#001C41] font-semibold"
                  : "bg-transparent text-[#fff] hover:bg-[#C5DEFD] hover:text-[#001C41] hover:font-semibold"
              }`
            }
          >
            <i className="fa-solid fa-user-plus"></i>
            <span className="">Quản lý khách hàng</span>
          </NavLink>

          <NavLink
            to={`/${path.orders}`}
            className={({ isActive }) =>
              `flex p-3 items-center rounded-md gap-4 text-sm ${
                isActive
                  ? "bg-[#C5DEFD] text-[#001C41] font-semibold"
                  : "bg-transparent text-[#fff] hover:bg-[#C5DEFD] hover:text-[#001C41] hover:font-semibold"
              }`
            }
          >
            <i className="fa-solid fa-file-medical"></i>
            <span className="">Quản lý đơn hàng</span>
          </NavLink>

          <NavLink
            to={`/${path.products}`}
            className={({ isActive }) =>
              `flex p-3 items-center rounded-md gap-4 text-sm ${
                isActive
                  ? "bg-[#C5DEFD] text-[#001C41] font-semibold"
                  : "bg-transparent text-[#fff] hover:bg-[#C5DEFD] hover:text-[#001C41] hover:font-semibold"
              }`
            }
          >
            <i className="fa-solid fa-file-medical"></i>
            <span className="">Quản lý hàng hóa</span>
          </NavLink>

          <NavLink
            to={`/${path.categorys}`}
            className={({ isActive }) =>
              `flex p-3 items-center rounded-md gap-4 text-sm ${
                isActive
                  ? "bg-[#C5DEFD] text-[#001C41] font-semibold"
                  : "bg-transparent text-[#fff] hover:bg-[#C5DEFD] hover:text-[#001C41] hover:font-semibold"
              }`
            }
          >
            <i className="fa-solid fa-layer-group"></i>
            <span className="">Quản lý danh mục</span>
          </NavLink>

          <NavLink
            to="/f"
            className={({ isActive }) =>
              `flex p-3 items-center rounded-md gap-4 text-sm ${
                isActive
                  ? "bg-[#C5DEFD] text-[#001C41] font-semibold"
                  : "bg-transparent text-[#fff] hover:bg-[#C5DEFD] hover:text-[#001C41] hover:font-semibold"
              }`
            }
          >
            <i className="fa-solid fa-gear"></i>
            <span className="">Setting</span>
          </NavLink>
        </div>
      </div>
      <div className="flex-1 bg-[#e8e7e7]">
        <div className="h-12 text-[#fff] bg-[#001C41] flex flex-row-reverse items-center pr-3">
          <i className="fa-solid fa-right-from-bracket"></i>
        </div>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
