import React from "react";
import { Link } from "react-router-dom";
import IconLogo from "../Header/IconLogo";
import { pathDefault } from "../../common/path";
import { HeartFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";

const Footer = () => {
  const { user } = useSelector((state) => state.authSlice);
  return (
    <footer className="bg-[#f8f8f8] py-12 px-3 mt-7">
      <div className="container mx-auto">
        <div className="w-full flex justify-between flex-wrap">
          <div className="footer_links_left text-[16px] mb-2 w-full lg:w-2/3 flex flex-wrap">
            <div className="space-y-4 w-full sm:w-1/3 mb-8">
              <h3>About</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link to={"javascript:void(0)"}>About Us</Link>
                </li>
                <li>
                  <Link to={"javascript:void(0)"}>Courses</Link>
                </li>
                <li>
                  <Link to={"javascript:void(0)"}>Instructor</Link>
                </li>
                <li>
                  <Link to={"javascript:void(0)"}>Events</Link>
                </li>
                <li>
                  <Link to={"javascript:void(0)"}>Become A Teacher</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4 w-full sm:w-1/3 mb-8">
              <h3>Links</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link to={"javascript:void(0)"}>News & Blogs</Link>
                </li>
                <li>
                  <Link to={"javascript:void(0)"}>Library</Link>
                </li>
                <li>
                  <Link to={"javascript:void(0)"}>Gallery</Link>
                </li>
                <li>
                  <Link to={"javascript:void(0)"}>Partners</Link>
                </li>
                <li>
                  <Link to={"javascript:void(0)"}>Career</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4 w-full sm:w-1/3 mb-8">
              <h3>Support</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link to={"javascript:void(0)"}>Documentation</Link>
                </li>
                <li>
                  <Link to={"javascript:void(0)"}>FAQs</Link>
                </li>
                <li>
                  <Link to={"javascript:void(0)"}>Forum</Link>
                </li>
                <li>
                  <Link to={"javascript:void(0)"}>Sitemap</Link>
                </li>
                <li>
                  <Link to={"javascript:void(0)"}>Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer_edumall_right w-full lg:w-1/3 text-center space-y-2">
            <Link to={pathDefault.homePage}>
              <IconLogo />
            </Link>
            <ul className="flex justify-center">
              <li className="text-[22px] text-[#999] px-3 py-2">
                <Link
                  to={"javascript:void(0)"}
                  className="hover:text-[#1C96E8]"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
              </li>
              <li className="text-[22px] text-[#999] px-3 py-2">
                <Link
                  to={"javascript:void(0)"}
                  className="hover:text-[#0866FF]"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </Link>
              </li>
              <li className="text-[22px] text-[#999] px-3 py-2">
                <Link
                  to={"javascript:void(0)"}
                  className="hover:text-[#0A66C2]"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
              </li>
              <li className="text-[22px] text-[#999] px-3 py-2">
                <Link
                  to={"javascript:void(0)"}
                  className="hover:text-[#ff0000]"
                >
                  <FontAwesomeIcon icon={faYoutube} />
                </Link>
              </li>
            </ul>
            <p>
              © 2024 EduMall Clone with{" "}
              <span className="text-[#ff0000]">
                <HeartFilled />
              </span>{" "}
              by BC68Xteam
            </p>
            <p className="flex justify-center space-x-8">
              <Link to={"javascript:void(0)"}>Terms of Use</Link>
              <Link to={"javascript:void(0)"}>Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;