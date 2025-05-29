import React from 'react'
import { Search, Settings, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsDarkMode, setIsSidebarCollapsed } from '@/state';
import Image from "next/image";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white px-4 py-3 shadow-md dark:bg-black"
      style={{ width: '100vw' }} // ensure full viewport width
    >
      {/* Left side: Hamburger + Logo */}
      <div className="flex items-center gap-4">
        {/* Hamburger toggle */}
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className={
            `p-2 rounded 
            ${isSidebarCollapsed 
              ? "hover:bg-gray-200 dark:hover:bg-gray-700" 
              : "bg-gray-200 dark:bg-gray-700"}`
          }
        >
          {isSidebarCollapsed ? (
            <Menu className="h-6 w-6 dark:text-white" />
          ) : (
            <X className="h-6 w-6 dark:text-white" />
          )}
        </button>

        {/* Logo */}
        <div className="text-xl font-bold text-gray-800 dark:text-white">
          <Image
            className="w-[12rem]"
            src={isDarkMode ? "/whitelogo.svg" : "/logo.svg"}
            alt="Logo"
            width={100}
            height={100}
            priority
          />
        </div>
      </div>

      {/* Right side: Search bar + Icons */}
      <div className="flex items-center gap-4">
        {/* Search (desktop) */}
        <div className="relative h-min w-[200px] hidden md:flex">
          <Search className="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 cursor-pointer dark:text-white" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          />
        </div>
        {/* Search icon (mobile) - hidden */}
        {/* <button className="flex md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Search">
          <Search className="h-6 w-6 dark:text-white" />
        </button> */}

        {/* Theme toggle */}
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? "rounded p-2 dark:hover:bg-gray-700"
              : "rounded p-2 hover:bg-gray-100"
          }
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
          )}
        </button>

        {/* Settings */}
        <Link
          href="/settings"
          className={
            isDarkMode
              ? "h-min w-min rounded p-2 dark:hover:bg-gray-700"
              : "h-min w-min rounded p-2 hover:bg-gray-100"
          }
          aria-label="Settings"
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
        </Link>

        {/* Separator */}
        <div className="hidden min-h-[2rem] w-[0.1rem] bg-gray-200 md:inline-block dark:bg-gray-700"></div>
      </div>
    </div>
  );
};

export default Navbar;
