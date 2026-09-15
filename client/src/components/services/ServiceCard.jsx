import { Link } from "react-router-dom";

const ServiceCard = ({ icon, title, description, link }) => {
  return (
    <Link
      to={link}
      className="group rounded-2xl border border-[#eadfd7] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f8eee7] text-2xl">
        {icon}
      </div>

      <h3 className="mb-2 text-xl font-semibold text-[#2d2424]">
        {title}
      </h3>

      <p className="mb-5 text-sm leading-7 text-gray-500">
        {description}
      </p>

      <span className="text-sm font-semibold text-[#6B3038] transition group-hover:mr-1">
        اكتشفي المزيد ←
      </span>
    </Link>
  );
};

export default ServiceCard;