const ContactSidebar = ({
  services = [],
  nameOfServiceOwner,
  phone,
}) => {
  const prices = services
    .map((service) => Number(service.price))
    .filter((price) => !Number.isNaN(price) && price > 0);

  const minPrice = prices.length ? Math.min(...prices) : 0;

  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const averagePrice = prices.length
    ? Math.round(
        prices.reduce((sum, price) => sum + price, 0) / prices.length
      )
    : 0;

  return (
    <aside>
      <div className="sticky top-6 rounded-3xl border border-[#eadfd7] bg-white p-6 shadow-lg">

        {/* Prices */}
        <div>
          <span className="text-sm text-gray-400">
            أسعار الخدمات
          </span>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                تبدأ من
              </span>

              <span className="text-xl font-bold text-[#6B3038]">
                {minPrice} ₪
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                متوسط السعر
              </span>

              <span className="text-xl font-bold text-[#6B3038]">
                {averagePrice} ₪
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                أعلى سعر
              </span>

              <span className="text-xl font-bold text-[#6B3038]">
                {maxPrice} ₪
              </span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-6 border-t border-[#f0e8e3] pt-6">
          <p className="text-sm text-gray-400">
            صاحب الخدمة
          </p>

          <p className="mt-1 text-lg font-bold text-[#2d2424]">
            {nameOfServiceOwner}
          </p>

          <p className="mt-3 text-sm text-gray-400">
            رقم التواصل
          </p>

          <p className="mt-1 text-lg font-bold text-[#6B3038]">
            {phone}
          </p>
        </div>

        {/* Contact Button */}
        <a
          href={`tel:${phone}`}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6B3038] py-4 text-sm font-bold text-white transition hover:bg-[#57262d]"
        >
          📞 اتصال بصاحب الخدمة
        </a>

        <p className="mt-5 text-center text-xs leading-6 text-gray-400">
          يمكنك التواصل مع صاحب الخدمة مباشرة للاستفسار.
        </p>

        {/* Question */}
        <div className="mt-6 rounded-2xl bg-[#f8f4f0] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              💬
            </div>

            <div>
              <p className="text-sm font-bold text-[#2d2424]">
                لديكِ سؤال؟
              </p>

              <p className="mt-1 text-xs text-gray-400">
                تواصلي مع صاحب الخدمة مباشرة.
              </p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default ContactSidebar;