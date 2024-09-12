import React from "react";

const Instructor = () => {
  const features = [
    {
      title: "Become An Instructor",
      description:
        "Top instructors from around the world teach millions of students on EduMall.",
      buttonText: "Start teaching today",
      imageSrc:
        "../../../public/png/Instructor/banner-image-group-teachers.png", // Replace with actual image path
      altText: "Instructors",
      background: "#F6F3ED",
    },
    {
      title: "Access To Education",
      description:
        "Create an account to receive our newsletter, course recommendations, and promotions.",
      buttonText: "Register for free",
      imageSrc: "../../../public/png/Instructor/banner-image-laptop.png", // Replace with actual image path
      altText: "Access Education",
      background: "#EEF0F4",
    },
  ];
  return (
    <div>
      <section className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-lg shadow-lg grid grid-cols-12"
            style={{ backgroundColor: feature.background }}
          >
            {/* Text Content */}
            <div className="col-span-7  p-14">
              <h3 className="text-xl font-bold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-4 text-sm text-gray-600">{feature.description}</p>
              <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-yellow-500 text-white font-semibold rounded-lg shadow-md  transition duration-300">
                {feature.buttonText}
              </button>
            </div>
            {/* Image */}
            <div className=" col-span-5 flex flex-col-reverse">
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
