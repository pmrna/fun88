import React from "react";
import Sports from "../../assets/svg/SPORTS.svg";
import Favorites from "../../assets/svg/FAVE.svg";
import Invite from "../../assets/svg/INVITE.svg";
import Casino from "../../assets/svg/LIVE.svg";
import Cashier from "../../assets/svg/wallet.svg";

interface BottomNavItem {
  label: string;
  icon: string;
  altText: string;
}

const navItems: BottomNavItem[] = [
  { label: "SPORTS", icon: Sports, altText: "Sports" },
  { label: "FAVORITES", icon: Favorites, altText: "Favorites" },
  { label: "INVITE", icon: Invite, altText: "Invite" },
  { label: "CASINO LIVE", icon: Casino, altText: "Casino Live" },
  { label: "CASHIER", icon: Cashier, altText: "Cashier" },
];

const BottomNavBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-sm border-t border-gray-200">
      <ul className="flex justify-around p-3">
        {navItems.map((item, index) => (
          <li key={index} className="flex flex-col items-center">
            <a href="#" className="flex flex-col items-center">
              <img src={item.icon} alt={item.altText} className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavBar;
