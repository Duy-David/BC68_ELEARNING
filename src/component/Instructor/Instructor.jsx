import React from "react";
import FeatureInDev from "../../pages/NotFound404/FeatureInDev";

const Instructor = () => {
  const features = [
    {
      title: "Become An Instructor",
      description:
        "Top instructors from around the world teach millions of students on EduMall.",
      buttonText: "Start teaching today",
      imageSrc: "../../../png/Instructor/banner-image-group-teachers.png",
      altText: "Instructors",
      background: "#F6F3ED",
    },
    {
      title: "Access To Education",
      description:
        "Create an account to receive our newsletter, course recommendations.",
      buttonText: "Register for free",
      imageSrc: "../../../png/Instructor/banner-image-laptop.png",
      altText: "Access Education",
      background: "#EEF0F4",
    },
  ];
  return (
    <div>
      <section className="container mx-auto px-3 py-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg grid grid-cols-12"
            style={{ backgroundColor: feature.background }}
          >
            {/* Text Content */}
            <div className="md:col-span-7 col-span-12  p-14">
              <h3 className="text-xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm text-gray-600">
                {feature.description}
              </p>
              <FeatureInDev
                typeLabel="button"
                className="mt-6 px-6 py-3 bg-blue-600 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-md  transition duration-300"
                contentLabel={feature.buttonText}
              />
            </div>
            {/* Image */}
            <div className="md:col-span-5 col-span-12 flex flex-col-reverse">
              <img
                src={feature.imageSrc}
                alt={feature.altText}
                className="w-56 h-auto ml-4 self-center"
                sizes="350px"
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Instructor;
