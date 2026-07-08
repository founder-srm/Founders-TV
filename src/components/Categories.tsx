const categories = [
  {
    id: 1,
    name: "Football",
    icon: "⚽",
  },
  {
    id: 2,
    name: "Highlights",
    icon: "🎥",
  },
  {
    id: 3,
    name: "Photography",
    icon: "📸",
  },
  {
    id: 4,
    name: "Events",
    icon: "🏆",
  },
];

export default function Categories() {
  return (
    <section className="bg-[#0b0b0b] py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white">
            Categories
          </h2>

          <div className="mt-3 h-1 w-20 rounded-full bg-[#ff3131]" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer rounded-2xl bg-[#1a1a1a] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:bg-[#ff3131]"
            >
              <div className="text-5xl transition-transform duration-300 group-hover:scale-125">
                {category.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-white">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}