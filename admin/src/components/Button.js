const Button = ({ title, icon, bg }) => {
  return (
    <div className={`flex items-center gap-1 py-1 px-2 rounded-md font-semibold text-[#fff] cursor-pointer ${bg}`}>
      {icon}
      <span>{title}</span>
    </div>
  );
};

export default Button;
