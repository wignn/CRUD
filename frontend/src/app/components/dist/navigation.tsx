"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faHome,
  faDatabase,
  faUser,
  faCog,
  faChartBar,
  faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const menuItems = [
  { icon: faDatabase, color: 'green', path: '/dashboard', label: 'Data' },
  { icon: faChartBar, color: 'green', path: '/profile', label: 'Profile' },
  { icon: faUser, color: 'blue', path: '/Login', label: 'Login' },
  { icon: faCog, color: 'red', path: '/profile/setting', label: 'Settings' },
  { icon: faArrowRightFromBracket, color: 'red', label: 'Logout', onClick: () => signOut() },
];

const IconButton = ({
  icon,
  color,
  label,
  path,
  onHover,
  onClick,
  hovered,
}:any) => (
  <div
    className="relative group"
    onMouseEnter={() => onHover(label)}
    onMouseLeave={() => onHover(null)}
    onClick={onClick}
  >
    <div
      className={`text-xl text-${color}-500 cursor-pointer bg-transparent p-2 rounded-full hover:bg-${color}-100 transition-transform duration-150 ease-in-out transform active:scale-95`}
      aria-label={label}
    >
      <FontAwesomeIcon icon={icon} />
    </div>
    {hovered === label && (
      <span
        className={`absolute right-12 top-1/2 transform -translate-y-1/2 bg-${color}-500 text-white px-2 py-1 rounded-lg transition-all duration-300`}
      >
        {label}
      </span>
    )}
  </div>
);

const PathWidget:React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const router = useRouter();

  const toggleWidget = () => setIsOpen(!isOpen);
  const goToPath = (path: string) => path && router.push(path);

  return (
    <div
      className={`right-[20px] top-1/4 bg-transparent shadow-none rounded-full p-2 transition-all duration-300 ease-in-out z-50 fixed ${
        isOpen ? 'w-16 h-16 scale-100 opacity-100' : 'w-16 h-16 scale-75 opacity-75'
      } flex flex-col items-center justify-start`}
    >
      <div
        className="text-xl text-gray-700 cursor-pointer flex items-center justify-center bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 transition-transform duration-150 ease-in-out transform active:scale-95"
        onClick={toggleWidget}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
      </div>

      {/* Icon container */}
      <div
        className={`mt-4 flex flex-col items-center space-y-4 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <IconButton
          icon={faHome}
          color="blue"
          label="Home"
          path="/"
          onHover={setHoveredIcon}
          onClick={() => goToPath('/')}
          hovered={hoveredIcon}
        />

        {/* Other icons */}
        <div className="flex flex-col items-center space-y-4">
          {menuItems.map((item) => (
            <IconButton
              key={item.label}
              {...item}
              onHover={setHoveredIcon}
              onClick={() =>
                item.path ? goToPath(item.path) : item.onClick && item.onClick()
              }
              hovered={hoveredIcon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PathWidget;
