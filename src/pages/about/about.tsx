const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-[url('./src/assets/aboutbg.jpg')] bg-cover bg-center w-full">
        {/* Overlay */}
        <div className="absolute inset-0 bg-indigo-900/60"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            About LibraryHub
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
            Your gateway to knowledge, exploration, and community resources
            since 2019
          </p>
        </div>
      </header>

      {/* Our Story Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <h2 className="text-4xl font-bold text-center text-indigo-900 mb-4">
            Our Story
          </h2>
          <div className="block absolute left-1/2 transform -translate-x-1/2 h-1 w-20 bg-[#d62828] rounded-2xl"></div>
        </div>

        <p className="text-lg text-gray-700 max-w-4xl mx-auto text-center">
          LibraryHub began as a small community reading room in 2019 and has
          since grown into a comprehensive information resource center serving
          over 5,000 community members. Our library is dedicated to fostering a
          love of reading, supporting educational pursuits, and providing access
          to information resources for everyone in our community.
        </p>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-400 mb-4">
              To provide equitable access to information, resources, and
              services that promote learning, exploration, and community
              engagement for all ages and backgrounds.
            </p>
            <p className="text-gray-700">
              We strive to create an inclusive environment where everyone feels
              welcome and empowered to explore knowledge and ideas that enrich
              their lives.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-indigo-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-400 mb-4">
              To be the intellectual and cultural hub of our community, where
              people connect, discover, and grow together.
            </p>
            <p className="text-gray-700">
              We envision a community where information literacy flourishes,
              lifelong learning is valued, and every person has the opportunity
              to reach their full potential.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative mb-12">
            <h2 className="text-4xl font-bold text-center text-indigo-900 mb-4">
              Meet Our Team
            </h2>
            <div className="block absolute left-1/2 transform -translate-x-1/2 h-1 w-20 bg-[#d62828] rounded-2xl"></div>
          </div>
          <p className="text-lg text-center text-gray-700 mb-12 max-w-3xl mx-auto">
            Our dedicated staff is committed to providing excellent service and
            resources to our community.
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dipesh Sunuwar",
                image: "./src/assets/dipesh.jpg",
                role: "Library Director",
              },
              {
                name: "Rohan Shrestha",
                image: "./src/assets/rohan.jpg",
                role: "Head Librarian",
              },
              {
                name: "Suman Bisunkhe",
                image: "./src/assets/suman.jpg",
                role: "Digital Resources Specialist",
              },
              // { name: 'John Doe',image:"", role: 'Children\'s Program Coordinator' }
            ].map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg shadow-md text-center transform transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 border-gray-200 border-4 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-lg text-indigo-900">
                  {member.name}
                </h4>
                <p className="text-gray-600 italic">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-900 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            LibraryHub By The Numbers
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "5,000+", label: "Community Members Served" },
              { number: "120,000+", label: "Books in Collection" },
              { number: "500+", label: "Programs Annually" },
              { number: "6+", label: "Years of Service" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <p className="text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="relative mb-20">
          <h2 className="text-4xl font-bold text-center text-indigo-900 mb-4">
            Our History
          </h2>
          <div className="block absolute left-1/2 transform -translate-x-1/2 h-1 w-20 bg-[#d62828] rounded-2xl"></div>
        </div>
        <div className="relative">
          {/* Timeline center line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-900"></div>

          {[
            {
              year: "2019",
              description:
                "Founded as a small community reading room with a collection of 5,000 donated books.",
            },
            {
              year: "2021",
              description:
                "Expanded to our current location, tripling our space and collection size.",
            },
            {
              year: "2022",
              description:
                "Introduced digital resources and computer lab facilities for community use.",
            },
            {
              year: "2023",
              description:
                "Major renovation adding the children's wing and community meeting spaces.",
            },
            {
              year: "2024",
              description:
                "Launched the LibraryHub digital platform, bringing our services online.",
            },
            {
              year: "2025",
              description:
                "Celebrating 6 years of service with the launch of our expanded digital archives.",
            },
          ].map((event, index) => (
            <div
              key={index}
              className={`flex md:flex-row flex-col mb-8 md:mb-16 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="md:w-1/2"></div>
              <div className="mx-auto md:mx-0 relative">
                <div className="hidden md:block absolute top-6 w-6 h-6 rounded-full bg-white border-4 border-indigo-900 transform -translate-x-1/2 md:left-0"></div>
              </div>
              <div
                className={`md:w-1/2 bg-white p-6 rounded-lg shadow-md ${
                  index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                }`}
              >
                <h3 className="font-bold text-xl text-indigo-900 mb-2">
                  {event.year}
                </h3>
                <p className="text-gray-700">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">
            Join Our Library Community
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Become a member today and gain access to our extensive collection of
            resources, programs, and services.
          </p>
          <a
            href="#"
            className="inline-block bg-indigo-900 hover:bg-indigo-800 text-white font-bold py-3 px-8 rounded-md transition-colors"
          >
            Become a Member
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
