import { Button, BoxName } from "components";

const listBtn = [
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

const Order = () => {
  return (
    <div className="px-3 mt-3">
      <BoxName title="Quản lý đơn hàng" />

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
                  ID người dùng
                </th>

                <th className="border border-slate-300 text-left p-2">
                  Tổng tiền
                </th>

                <th className="border border-slate-300 text-left p-2">
                  Trạng thái
                </th>

                <th className="border border-slate-300 text-left p-2 w-32">
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
                <td className="border border-slate-300 p-2">200.000 đ</td>
                <td className="border border-slate-300 p-2">Đang vận chuyển</td>
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

export default Order;
