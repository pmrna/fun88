import React from "react";
import Menu from "../../assets/svg/3BAR.svg";
import Brand from "../../assets/logo/F1M5_Logo.webp";
import Wallet from "../../assets/svg/wallet.svg";
import Profile from "../../assets/svg/userhead.svg";
import SmallSectionDivider from "../ui/SectionDivider";

// Define the type for the navigation item
interface NavItem {
  icon: string;
  altText: string;
  label?: string;
}

const leftItems: NavItem[] = [
  { icon: Menu, altText: "Menu Icon" },
  { icon: Brand, altText: "F1M5 Logo" },
];

const rightItems: NavItem[] = [
  { icon: Wallet, altText: "Wallet Icon" },
  { icon: Profile, altText: "Profile Icon" },
];

const TopNavBar: React.FC = () => {
  return (
    <header className="w-full h-14 border-b border-gray-200 shadow-sm">
      <div className="w-full max-w-[81.25rem] h-full mx-auto flex items-center justify-between px-3">
        {/* Left section: Menu and Logo */}
        <div className="flex justify-start gap-3">
          {leftItems.map((item, index) => (
            <img
              key={index}
              src={item.icon}
              alt={item.altText}
              className="h-4"
            />
          ))}
        </div>

        {/* Right section: Wallet, Balance, Divider, and Profile */}
        <div className="flex justify-end gap-2 items-center">
          {rightItems.slice(0, 1).map((item, index) => (
            <img
              key={index}
              src={item.icon}
              alt={item.altText}
              className="h-6" // adjust the size as needed
            />
          ))}
          <span className="text-blue-400 font-semibold">$1990.6</span>
          <SmallSectionDivider />
          {rightItems.slice(1).map((item, index) => (
            <img
              key={index}
              src={item.icon}
              alt={item.altText}
              className="h-6" // adjust the size as needed
            />
          ))}
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
