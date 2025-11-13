import { useState } from "react";

const brandOptions = ["Zara", "H&M", "Pull&Bear", "Uniqlo", "Bershka"];
const categoryOptions = ["Clothes","Shoes","For Men","For Women","Tech","Home Appliances",];

export default function FilterAside() {
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [open, setOpen] = useState({
    brand: false,
    categories: false,
  });

  const emit = (partial = {}) => {
    const filters = {
      search,
      brands: selectedBrands,
      categories: selectedCategories,
      favoritesOnly,
      inStockOnly,
      minPrice,
      maxPrice,
      ...partial,
    };
    onChange?.(filters);
  };

  const toggleSection = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleItem = (section, value) => {
    const map = {
      brand: [selectedBrands, setSelectedBrands],
      categories: [selectedCategories, setSelectedCategories],
    };

    const [selected, setSelected] = map[section];
    const next = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    setSelected(next);
    emit({ [section]: next });
  };

  return (
    <aside className="w-full md:w-72 h-[calc(100vh-80px)] bg-[#e5e5e5] p-4 space-y-4 rounded-md overflow-y-auto">
      {/* Search */}
      <div className="flex items-center bg-white rounded-full px-1 py-1 shadow-sm">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            emit({ search: e.target.value });
          }}
          className="flex-1 bg-transparent outline-none text-sm"
        />
        <button
          type="button"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[#00796b] text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </button>
      </div>

      {/* Brand */}
      <FilterCard
        title="Brand"
        isOpen={open.brand}
        onToggle={() => toggleSection("brand")}
      >
        <CheckboxList
          section="brand"
          options={brandOptions}
          selected={selectedBrands}
          onToggle={toggleItem}
        />
      </FilterCard>

      {/* Categories */}
      <FilterCard
        title="Categories"
        isOpen={open.categories}
        onToggle={() => toggleSection("categories")}
      >
        <CheckboxList
          section="categories"
          options={categoryOptions}
          selected={selectedCategories}
          onToggle={toggleItem}
        />
      </FilterCard>

      {/* Favorites only */}
      <div className="bg-white rounded-lg shadow-sm px-3 py-2 flex items-center gap-2">
        <input
          id="favorites"
          type="checkbox"
          checked={favoritesOnly}
          onChange={(e) => {
            setFavoritesOnly(e.target.checked);
            emit({ favoritesOnly: e.target.checked });
          }}
          className="h-4 w-4 rounded border-gray-400"
        />
        <label
          htmlFor="favorites"
          className="text-sm text-gray-900 cursor-pointer"
        >
          Favorites only
        </label>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-lg shadow-sm p-3">
        <h3 className="text-sm font-semibold text-[#00796b] mb-2">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              emit({ minPrice: e.target.value });
            }}
            className="w-full rounded border border-gray-300 text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#00796b]"
          />
          <span className="text-xs text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              emit({ maxPrice: e.target.value });
            }}
            className="w-full rounded border border-gray-300 text-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#00796b]"
          />
        </div>
      </div>

      {/* In Stock Only */}
      <div className="bg-white rounded-lg shadow-sm px-3 py-2 flex items-center gap-2">
        <input
          id="in-stock"
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => {
            setInStockOnly(e.target.checked);
            emit({ inStockOnly: e.target.checked });
          }}
          className="h-4 w-4 rounded border-gray-400"
        />
        <label
          htmlFor="in-stock"
          className="text-sm text-gray-900 cursor-pointer"
        >
          In stock only
        </label>
      </div>
    </aside>
  );
}

function FilterCard({ title, isOpen, onToggle, children }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between bg-[#00796b] text-white px-4 py-2 text-sm font-semibold"
      >
        <span>{title}</span>
        <span
          className={`transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ⤵︎
        </span>
      </button>
      {isOpen && <div className="px-4 py-3 space-y-2">{children}</div>}
    </div>
  );
}

function CheckboxList({ section, options, selected, onToggle }) {
  return (
    <ul className="space-y-1 text-sm">
      {options.map((opt) => (
        <li key={opt} className="flex items-center gap-2">
          <input
            id={`${section}-${opt}`}
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => onToggle(section, opt)}
            className="h-4 w-4 rounded border-gray-400"
          />
          <label
            htmlFor={`${section}-${opt}`}
            className="cursor-pointer text-gray-900"
          >
            {opt}
          </label>
        </li>
      ))}
    </ul>
  );
}
