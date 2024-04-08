import { Button, BoxName } from "components";

const listBtn = [
  {
    title: "Tạo mới nhân viên",
    icon: <i className="fa-solid fa-file"></i>,
    bg: "bg-green-500",
  },
  {
    title: "Tài liệu",
    icon: <i className="fa-solid fa-file"></i>,
    bg: "bg-red-500",
  },
  {
    title: "Xuất file PDF",
    icon: <i className="fa-solid fa-file"></i>,
    bg: "bg-yellow-500",
  },
  {
    title: "Xuất file Excel",
    icon: <i className="fa-solid fa-file"></i>,
    bg: "bg-green-500",
  },
];

const Dasboad = () => {
  return (
    <div className="px-3 mt-3">
      <BoxName title="Quản lý người dùng" />

      <div className="bg-[#fff] rounded-sm">
        <div className="flex items-center gap-2 mx-2 py-2 border-b-2 bo">
          {listBtn.map((item, index) => {
            return <Button title={item.title} icon={item.icon} bg={item.bg} />;
          })}
        </div>
        <div className="mx-2 py-2">
          <div className="flex justify-between items-center">
            <div>Hiện [12] muc.</div>
            <form
              method="post"
              action=""
              className="flex items-center gap-2 border-2 p-2 rounded-md"
            >
              <span>Tìm kiếm</span>{" "}
              <input type="text" className="bg-gray-300" />
            </form>
          </div>

          <table className="border-collapse border border-slate-400 w-full mt-3">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-slate-300 p-2">
                  <input type="checkbox" />
                </th>
                <th className="border border-slate-300 text-left p-2">
                  ID nhân viên
                </th>
                <th className="border border-slate-300 text-left p-2">
                  Họ và tên
                </th>
                <th className="border border-slate-300 w-30">Ảnh thẻ</th>
                <th className="border border-slate-300 text-left p-2">
                  Địa chỉ
                </th>
                <th className="border border-slate-300 text-left p-2">
                  Ngày sinh
                </th>
                <th className="border border-slate-300 text-left p-2">
                  Giới tính
                </th>
                <th className="border border-slate-300 text-left p-2">SDT</th>
                <th className="border border-slate-300 text-left p-2">
                  Chức vụ
                </th>
                <th className="border border-slate-300 text-left p-2 w-24">
                  Tính năng
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 text-center">
                  <input type="checkbox" />
                </td>
                <td className="border border-slate-300 p-2">PH46600</td>
                <td className="border border-slate-300 p-2">Hồ Văn Quang</td>
                <td className="border border-slate-300 p-2">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtVo44H-n692rckAV1j7wYV5_JqUhdY_Dnsw&usqp=CAU"
                    alt=""
                    className="w-16"
                  />
                </td>
                <td className="border border-slate-300 p-2">
                  Tu hoàng, nam từ liêm, Hà nội
                </td>
                <td className="border border-slate-300 p-2">26/05/2003</td>
                <td className="border border-slate-300 p-2">Nam</td>
                <td className="border border-slate-300 p-2">0338973258</td>
                <td className="border border-slate-300 p-2">Quản lý</td>
                <td className="border border-slate-300 p-2">
                  <i class="fa-regular fa-trash-can p-2 bg-red-200 rounded-md text-red-700 mr-2 cursor-pointer"></i>
                  <i class="fa-regular fa-pen-to-square p-2 bg-yellow-200 rounded-md text-yellow-700 cursor-pointer"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dasboad;
