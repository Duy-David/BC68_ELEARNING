import React from "react";
import { Button, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBullhorn,
  faCalendarDays,
  faChevronDown,
  faCircleInfo,
  faFilePen,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const items = [
  {
    key: "1",
    label: <Link to={"#url"}>Join with our team</Link>,
  },
  {
    key: "2",
    label: <Link to={"#url"}>Our Instructors</Link>,
  },
];

const itemsMenuHome = [
  {
    key: "1",
    label: (
      <div className="flex items-center">
        <FontAwesomeIcon icon={faUsers} />
        <Link to={"#url"} className="font-bold">
          About us
          <p className="font-light">
            Access a Modern Education & Pursue Your Passion
          </p>
        </Link>
      </div>
    ),
  },
  {
    key: 2,
    label: (
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCalendarDays} />
        <Link to={"#url"} className="font-bold">
          Events
          <p className="font-light">Inspiring Events We Host</p>
        </Link>
      </div>
    ),
  },
  {
    key: 3,
    label: (
      <div className="flex items-center">
        <FontAwesomeIcon icon={faBullhorn} />
        <Link to={"#url"} className="font-bold">
          Media
          <p className="font-light">What the Press Says About Us</p>
        </Link>
      </div>
    ),
  },
  {
    key: 4,
    label: (
      <div className="flex items-center">
        <FontAwesomeIcon icon={faFilePen} />
        <Link to={"#url"} className="font-bold">
          Blog
          <p className="font-light">Explore great articles on our Blog</p>
        </Link>
      </div>
    ),
  },
  {
    key: 5,
    label: (
      <div className="flex items-center">
        <FontAwesomeIcon icon={faCircleInfo} />
        <Link to={"#url"} className="font-bold">
          Support
          <p className="font-light">
            Reach out to us for assistance or inquiries
          </p>
        </Link>
      </div>
    ),
  },
  {
    key: 6,
    label: (
      <div className="flex items-center">
        <FontAwesomeIcon icon={faAddressCard} />
        <Link to={"#url"} className="font-bold">
          Contact us
          <p className="font-light">Keep In Touch With Us</p>
        </Link>
      </div>
    ),
  },
];

const NavBarMenu = () => {
  return (
    <ul className="dropDown_menu flex items-center gap-4">
      <li>
        <Dropdown
          overlayClassName="menuHome"
          menu={{
            items: itemsMenuHome,
          }}
          placement="bottom"
          arrow
        >
          <a href="javascript:void(0)" className="">
            <span>EduMall</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </a>
        </Dropdown>
      </li>
      <li>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
          arrow
        >
          <a href="javascript:void(0)">
            <span>Become an Instructor</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </a>
        </Dropdown>
      </li>
    </ul>
  );
};

export default NavBarMenu;
