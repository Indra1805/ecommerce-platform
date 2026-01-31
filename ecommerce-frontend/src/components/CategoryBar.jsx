export default function CategoryBar({ categories, active, onChange }) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-6 overflow-x-auto py-4 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onChange(cat)}
              className={`flex-shrink-0 text-sm font-medium pb-2 border-b-2 transition cursor-pointer
                ${
                  active === cat
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-700 hover:text-gray-900"
                }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
