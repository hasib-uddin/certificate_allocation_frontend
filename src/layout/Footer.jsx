/** @format */

import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {

  return (

    <footer className="bg-[#0091b4] text-white py-4 ">
      <div className="container mx-auto px-[30px] ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Assignment Project</h3>
            <ul>
              <li>
                <Link href="#" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Email: assignment@gmail.com
                </a>
              </li>
              
              <li>
                <a href="#" className="hover:underline">
                  Contact: +91 12300 00123
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Address: Delhi
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-8 text-center border-t border-white pt-4">
          <p className="text-sm mb-[-20px]">
            &copy; 2025 Assignment Project. All rights reserved.
          </p>
        </div>
       
      </div>
    </footer>

  );
};

export default Footer;