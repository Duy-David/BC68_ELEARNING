import React from "react";
import { Button, Dropdown, Space } from "antd";
import { Link, useLocation } from "react-router-dom";
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
import { pathDefault } from "../../common/path";

const items = [
  {
    key: "1",
    label: <Link to={pathDefault.underConstruction}>Join with our team</Link>,
  },
  {
    key: "2",
    label: <Link to={pathDefault.underConstruction}>Our Instructors</Link>,
  },
];

const itemsMenuHome = [
  {
    key: "1",
    label: (
      <div className="flex items-center">
        <FontAwesomeIcon icon={faUsers} />
        <Link to={pathDefault.underConstruction} className="font-bold">
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
        <Link to={pathDefault.underConstruction} className="font-bold">
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
        <Link to={pathDefault.underConstruction} className="font-bold">
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
        <Link to={pathDefault.underConstruction} className="font-bold">
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
        <Link to={pathDefault.underConstruction} className="font-bold">
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
        <Link to={pathDefault.underConstruction} className="font-bold">
          Contact us
          <p className="font-light">Keep In Touch With Us</p>
        </Link>
      </div>
    ),
  },
];

const NavBarMenu = ({ openNav }) => {
  const location = useLocation();
  return (
    <ul className="dropDown_menu flex items-center gap-1 lg:gap-4">
      <Space
        direction={openNav ? "vertical" : "horizontal"}
        size={openNav ? "large" : ""}
      >
        <li>
          <Dropdown
            overlayClassName={`menuHome ${openNav ? "isMobile" : ""}`}
            menu={{
              items: itemsMenuHome,
            }}
            placement="bottom"
            arrow={!openNav}
          >
            <Link className="text-center">
              <span>EduMall</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </Link>
          </Dropdown>
        </li>
        <li>
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            arrow={!openNav}
          >
            <Link>
              <span>Become an Instructor</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </Link>
          </Dropdown>
        </li>
      </Space>
    </ul>
  );
};

export default NavBarMenu;
