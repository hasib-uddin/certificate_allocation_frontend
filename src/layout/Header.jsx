/** @format */

import React, { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Icon from "../img/logo.png"


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const user = "";
  const logOutHandler = () => {
    localStorage.removeItem("assign_token");
  };


  return (
    <>
    
      <Disclosure
        as="nav"
        className={`border-b-[1px] border-[#0091b4] 
           bg-[#fff] text-black
          `}
      >
        {({ open }) => (
          <>
            <div className="z-50 mx-auto px-2 sm:px-6 ">
              <div className="relative flex h-20 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {user.isAuth && user.userData.roleId == 1 ? null : (
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-white  hover:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#00009C]">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  )}
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start ">
                  <div className="flex flex-shrink-0 items-center max-[640px]:hidden  ">
                    {/* {user.isAuth && user.userData.roleId === 1 ? ( */}
                    <Link to="/" className="w-[100%] ">
                      <div className="flex items-center w-[150%]  ml-12">
                        <img
                          className="h-[70px] w-auto"
                          src={Icon}
                          alt="Your Company"
                        />
                      </div>
                    </Link>
                    {/* ) : null} */}
                  </div>


                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                 
                  {user.isAuth ? (
                    <Menu as="div" className="relative ml-3 mr-12">
                      {user.isAuth && user.userData.roleId === 1 ? (
                        <div>
                          <Menu.Button className="relative flex rounded-full  text-sm focus:outline-none">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>

                            <div className="bg-gray-200 rounded-lg border-none p-2">
                              <h2>
                                Welcome, {user.userData.fName}
                                <ChevronDownIcon className="w-4 h-4 ml-2 mt-[3px] float-right" />
                              </h2>
                            </div>
                          </Menu.Button>
                        </div>
                      ) : user.isAuth && user.userData.roleId === 2 ? (
                        <div>
                          <Menu.Button className="relative flex rounded-full  text-sm focus:outline-none">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>

                            <div className="bg-gray-200 rounded-lg border-none p-2">
                              <h2>
                                Welcome, {user.userData.fName} {user.userData.lName}
                                <ChevronDownIcon className="w-4 h-4 ml-2 mt-[3px] float-right" />
                              </h2>
                            </div>
                          </Menu.Button>
                        </div>
                      ) : user.isAuth && user.userData.roleId === 3 ? (
                        <div>
                          <Menu.Button className="relative flex rounded-full  text-sm focus:outline-none">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>

                            <div className="bg-gray-200 rounded-lg border-none p-2">
                              <h2>
                                Welcome, {user.userData.fName} {user.userData.lName}
                                <ChevronDownIcon className="w-4 h-4 ml-2 mt-[3px] float-right" />
                              </h2>
                            </div>
                          </Menu.Button>
                        </div>
                      ) : user.isAuth && user.userData.roleId === 4 ? (
                        <div>
                          <Menu.Button className="relative flex rounded-full  text-sm focus:outline-none">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>

                            <div className="bg-gray-200 rounded-lg border-none p-2">
                              <h2>
                                Welcome, {user.userData.fName} {user.userData.lName}
                                <ChevronDownIcon className="w-4 h-4 ml-2 mt-[3px] float-right" />
                              </h2>
                            </div>
                          </Menu.Button>
                        </div>
                      ) : null}
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >


                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                         

                          {user.isAuth && (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to={
                                    user.userData.roleId === 3
                                      ? "/optometrist/change_password"
                                      : user.userData.roleId === 4
                                      ? "/change_password"
                                      : null
                                  }
                                 
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  <div className="flex">
                                    <div className="w-[90%]">
                                      Change Password
                                    </div>
                                    <div className="text-end">
                                      <span className=" text-end">
                                        <i className="fa-solid fa-unlock"></i>
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              )}
                            </Menu.Item>
                          )}
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/"
                                onClick={logOutHandler}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                <div className="flex">
                                  <div className="w-[90%]">
                                    Log Out
                                  </div>
                                  <div className="text-end">
                                    <span className=" text-end">
                                      <i className="fa-solid fa-right-from-bracket"></i>
                                    </span>
                                  </div>
                                </div>


                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </>
  );
}

