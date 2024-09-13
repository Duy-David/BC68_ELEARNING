import React from "react";
import "./partner.scss";
const Partner = () => {
  const partners = [
    {
      name: "State University",
      logo: "/png/partners/client-logo-01.png",
    },
    { name: "Student Chat", logo: "/png/partners/client-logo-02.png" },
    { name: "Best College", logo: "/png/partners/client-logo-03.png" },
    { name: "Owl Sign", logo: "/png/partners/client-logo-04.png" },
    { name: "Owlbook", logo: "/png/partners/client-logo-05.png" },
    { name: "Creative Book", logo: "/png/partners/client-logo-06.png" },
    { name: "Space Writing", logo: "/png/partners/client-logo-07.png" },
    {
      name: "Education First",
      logo: "/png/partners/client-logo-08.png",
    },
    {
      name: "Bright Minds High School",
      logo: "/png/partners/client-logo-09.png",
    },
    {
      name: "Bright Minds High School",
      logo: "/png/partners/client-logo-10.png",
    },
    {
      name: "Bright Minds High School",
      logo: "/png/partners/client-logo-11.png",
    },
    {
      name: "Bright Minds High School",
      logo: "/png/partners/client-logo-12.png",
    },
  ];
  return (
    <>
      <section className=" container py-10">
        <div className="mx-auto grid lg:grid-cols-4 grid-cols-1">
          <div className="text-left mb-8 col-span-1">
            <h2 className="text-3xl font-semibold relative text-gray-900 partner-title">
              Who Will You <br />
              Learn <span className="">With?</span>
            </h2>
            <p className="mt-8 text-base text-gray-600 ">
              You can list your partners or instructors's brands here to show
              off your site's reputation and students can trust you more.
            </p>
            <button className="btn-partner px-6 py-3 rounded-lg transition duration-300 mt-5">
              View all Partners
            </button>
          </div>

          <div className="lg:col-span-3 col-span-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {partners.map((partner, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-24 w-auto object-contain mb-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partner;
