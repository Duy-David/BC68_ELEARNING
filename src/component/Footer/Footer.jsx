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
                  <Link to={pathDefault.underConstruction}>About Us</Link>
                </li>
                <li>
                  <Link to={pathDefault.underConstruction}>Courses</Link>
                </li>
                <li>
                  <Link to={pathDefault.underConstruction}>Instructor</Link>
                </li>
                <li>
                  <Link to={pathDefault.underConstruction}>Events</Link>
                </li>
                <li>
                  <Link to={pathDefault.underConstruction}>
                    Become A Teacher
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4 w-full sm:w-1/3 mb-8">
              <h3>Links</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link to={pathDefault.underConstruction}>News & Blogs</Link>
                </li>
                <li>
                  <Link to={pathDefault.underConstruction}>Library</Link>
                </li>
                <li>
                  <Link to={pathDefault.underConstruction}>Gallery</Link>
                </li>
                <li>
                  <Link to={pathDefault.underConstruction}>Partners</Link>
                </li>
                <li>
                  <Link to={pathDefault.underConstruction}>Career</Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4 w-full sm:w-1/3 mb-8">
              <h3>Support</h3>
              <ul className="space-y-2.5">
                <li>
                  <Link to={pathDefault.underConstruction}>Documentation</Link>
                </li>
                <li>
                  <Link to={pathDefault.underConstruction}>FAQs</Link>
                </li>
                <li>
                  <Link to={pathDefault.underConstruction}>Forum</Link>
                </li>
                <li>
                  <Link to={pathDefault.underConstruction}>Sitemap</Link>
                </li>
                <li>
                  <Link to={pathDefault.underConstruction}>Contact Us</Link>
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
                  to={"https://x.com/elonmusk"}
                  target="_blank"
                  className="hover:text-[#1C96E8]"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
              </li>
              <li className="text-[22px] text-[#999] px-3 py-2">
                <Link
                  to={"https://www.facebook.com/lophocviet"}
                  target="_blank"
                  className="hover:text-[#0866FF]"
                >
                  <FontAwesomeIcon icon={faFacebookF} />
                </Link>
              </li>
              <li className="text-[22px] text-[#999] px-3 py-2">
                <Link
                  to={"https://www.linkedin.com/"}
                  target="_blank"
                  className="hover:text-[#0A66C2]"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
              </li>
              <li className="text-[22px] text-[#999] px-3 py-2">
                <Link
                  to={"https://www.youtube.com/@CyberSoftAcademy"}
                  target="_blank"
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
              <Link to={pathDefault.underConstruction}>Terms of Use</Link>
              <Link to={pathDefault.underConstruction}>Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
