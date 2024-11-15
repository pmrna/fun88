import { useState, useEffect } from "react";
import Search from "../../assets/svg/search.svg";
import Start from "../../assets/svg/fire-start.svg";
import New from "../../assets/svg/NEW.svg";
import Slots from "../../assets/svg/jackpots.svg";
import Live from "../../assets/svg/casino-dealer.svg";
import Jackpot from "../../assets/svg/jackpots.svg";
import SectionDivider from "../ui/SectionDivider";
import { GameProvider } from "../../api/provider";
import FilterMenuIcon from "../../assets/svg/Filter";
import CloseIcon from "../../assets/svg/Close";

interface FilterBarProps {
  onCategoryChange: (category: string) => void;
  onSearch: (query: string) => void;
  selectedCategory: string | null;
  searchQuery: string;
  providers: GameProvider[];
  onProviderChange: (provider: string) => void;
  selectedProvider: string[];
}

interface FilterBarItems {
  label: string;
  icon: string;
  category: string;
}

const barItems: FilterBarItems[] = [
  { label: "SEARCH", icon: Search, category: "search" },
  { label: "START", icon: Start, category: "start" },
  { label: "NEW", icon: New, category: "new" },
  { label: "SLOTS", icon: Slots, category: "slots" },
  { label: "LIVE", icon: Live, category: "live" },
  { label: "JACKPOTS", icon: Jackpot, category: "jackpots" },
];

function FilterBar({
  onCategoryChange,
  onSearch,
  selectedCategory,
  searchQuery,
  providers,
  onProviderChange,
  selectedProvider,
}: FilterBarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleProvider = (providerName: string) => {
    onProviderChange(providerName);
  };

  // Update local search query when prop changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleItemClick = (category: string) => {
    if (category === "search") {
      setIsSearchOpen(!isSearchOpen);
    } else {
      onCategoryChange(category);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setLocalSearchQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className="bg-white w-full mt-1">
      <div className="overflow-x-auto">
        <ul className="flex flex-row items-center justify-around">
          {barItems.slice(0, 1).map((item) => (
            <li key={item.category}>
              <button
                onClick={() => handleItemClick(item.category)}
                className="flex flex-col items-center"
              >
                <img src={item.icon} alt={item.label} className="w-8 h-8" />
                <span className="text-gray-500">{item.label}</span>
              </button>
            </li>
          ))}
          <SectionDivider className="h-10 w-[2px] bg-gray-200" />
          {barItems.slice(1).map((item) => (
            <li key={item.category}>
              <button
                onClick={() => handleItemClick(item.category)}
                className={`flex flex-col items-center ${
                  selectedCategory === item.category ? "text-blue-500" : ""
                }`}
              >
                <img src={item.icon} alt={item.label} className="w-8 h-8" />
                <span className="text-gray-500">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        {isSearchOpen && (
          <div className="px-4 py-2 flex items-center gap-2 relative">
            <img
              src={Search}
              alt="Search"
              className="absolute inset-y-2/1 start-5 w-6 h-6"
            />
            <input
              name="search"
              type="text"
              value={localSearchQuery}
              onChange={handleSearchChange}
              placeholder="Search games..."
              className="block pl-8 w-full p-2 border-2 rounded-lg focus:outline-none focus:border-blue-500"
              autoFocus
            />
            <button
              onClick={() => {
                setIsCategoryOpen(!isCategoryOpen);
                setIsSearchOpen(!isSearchOpen);
              }}
              className="text-gray-500 hover:text-gray-700 p-1 border-2 rounded-lg"
            >
              <FilterMenuIcon />
            </button>
          </div>
        )}
      </div>
      {isCategoryOpen && (
        <div className="bg-white absolute h-full max-h-[550px] overflow-y-auto left-0 right-0 z-10 shadow-lg">
          <div className="w-full bg-blue-400 h-12 flex justify-between items-center px-4">
            <div className="flex items-center gap-3">
              <FilterMenuIcon color="#ffffff" />

              <span className="text-white font-normal text-lg">
                Game Provider
              </span>
              <span className="border-2 rounded-full px-3 text-white">119</span>
            </div>
            <button onClick={() => setIsCategoryOpen(false)}>
              <CloseIcon color="#ffffff" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4 w-full">
            {providers.map((provider) => (
              <button
                key={provider.id}
                onClick={() => toggleProvider(provider.name)}
              >
                <div
                  className={`items-center place-items-center bg-gray-100 rounded-lg ${
                    selectedProvider.includes(provider.name)
                      ? "border-2 border-blue-400"
                      : ""
                  } p-3`}
                >
                  <img
                    src={provider.img}
                    alt={provider.name}
                    className="w-24 h-10 object-contain"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterBar;
