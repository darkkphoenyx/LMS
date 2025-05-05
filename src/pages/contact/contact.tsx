import { ChangeEvent, FormEvent, useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <header
        style={{ backgroundImage: "assets/contactbg.jpg" }}
        className="relative bg-cover bg-center w-full"
      >
        <div className="absolute inset-0 bg-indigo-900/60"></div>
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Contact Us
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
            We're here to help you with any questions or concerns you may have
          </p>
        </div>
      </header>

      {/* Contact Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <h2 className="text-4xl font-bold text-center text-indigo-900 mb-4">
            Get In Touch
          </h2>
          <div className="block absolute left-1/2 transform -translate-x-1/2 h-1 w-20 bg-[#d62828] rounded-2xl"></div>
        </div>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
          We welcome your inquiries, feedback, and suggestions. Please don't
          hesitate to reach out to us using any of the methods below.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-indigo-900 mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="membership">Membership Information</option>
                  <option value="programs">Programs & Events</option>
                  <option value="donations">Donations & Support</option>
                  <option value="suggestions">Suggestions</option>
                  <option value="complaints">Complaints</option>
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-900 hover:bg-indigo-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-indigo-900 mb-6">
              Contact Information
            </h3>

            <div className="flex mb-6">
              <div className="text-2xl text-indigo-900 mr-4">
                <LocationOnIcon />
              </div>
              <div>
                <h4 className="font-bold text-indigo-900 mb-2">Address</h4>
                <p className="text-gray-700">
                  123 Reading Lane
                  <br />
                  Booktown, BT 12345
                  <br />
                  United States
                </p>
              </div>
            </div>

            <div className="flex mb-6">
              <div className="text-2xl text-indigo-900 mr-4">
                <CallIcon />
              </div>
              <div>
                <h4 className="font-bold text-indigo-900 mb-2">Phone</h4>
                <p className="text-gray-700">
                  Main: (555) 123-4567
                  <br />
                  Reference Desk: (555) 123-4568
                  <br />
                  Children's Department: (555) 123-4569
                </p>
              </div>
            </div>

            <div className="flex mb-6">
              <div className="text-2xl text-indigo-900 mr-4">
                <EmailIcon />
              </div>
              <div>
                <h4 className="font-bold text-indigo-900 mb-2">Email</h4>
                <p className="text-gray-700">
                  info@libraryhub.org
                  <br />
                  reference@libraryhub.org
                  <br />
                  programs@libraryhub.org
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold text-indigo-900 mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <FacebookIcon />, href: "https://www.facebook.com" },
                  {
                    icon: <InstagramIcon />,
                    href: "https://www.instagram.com",
                  },
                  { icon: <XIcon />, href: "https://www.twitter.com" },
                  { icon: <LinkedInIcon />, href: "https://www.linkedin.com" },
                ].map((icon, index) => (
                  <a
                    key={index}
                    href={icon.href}
                    className="w-10 h-10 bg-indigo-900 hover:bg-indigo-800 rounded-full flex items-center justify-center text-white transition-colors"
                  >
                    {icon.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="relative mb-12">
            <h2 className="text-4xl font-bold text-center text-indigo-900 mb-4">
              Library Hours
            </h2>
            <div className="block absolute left-1/2 transform -translate-x-1/2 h-1 w-20 bg-[#d62828] rounded-2xl"></div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-4 px-6 text-left text-indigo-900 font-semibold">
                    Day
                  </th>
                  <th className="py-4 px-6 text-left text-indigo-900 font-semibold">
                    Hours
                  </th>
                  <th className="py-4 px-6 text-left text-indigo-900 font-semibold">
                    Special Notes
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { day: "Monday", hours: "9:00 AM - 8:00 PM", notes: "" },
                  { day: "Tuesday", hours: "9:00 AM - 8:00 PM", notes: "" },
                  {
                    day: "Wednesday",
                    hours: "9:00 AM - 8:00 PM",
                    notes: "Story Time at 10:30 AM",
                  },
                  { day: "Thursday", hours: "9:00 AM - 8:00 PM", notes: "" },
                  { day: "Friday", hours: "9:00 AM - 6:00 PM", notes: "" },
                  {
                    day: "Saturday",
                    hours: "10:00 AM - 5:00 PM",
                    notes: "Book Club at 2:00 PM",
                  },
                  {
                    day: "Sunday",
                    hours: "1:00 PM - 5:00 PM",
                    notes: "Limited services",
                  },
                ].map((day, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-4 px-6 text-gray-800 font-medium">
                      {day.day}
                    </td>
                    <td className="py-4 px-6 text-gray-700">{day.hours}</td>
                    <td className="py-4 px-6 text-gray-700">{day.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center text-gray-700">
            <p className="font-medium">Holiday Schedule:</p>
            <p>
              The library is closed on all Federal holidays. Special hours may
              apply during holiday seasons.
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="relative mb-12">
          <h2 className="text-4xl font-bold text-center text-indigo-900 mb-4">
            Find Us
          </h2>
          <div className="block absolute left-1/2 transform -translate-x-1/2 h-1 w-20 bg-[#d62828] rounded-2xl"></div>
        </div>

        <div className="bg-gray-300 h-96 rounded-lg shadow-md overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1348.7898111344791!2d85.34437339824531!3d27.71206955437495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1970a9ff7041%3A0xfcaa45db29104458!2sTexas%20International%20College!5e0!3m2!1sen!2snp!4v1746432450385!5m2!1sen!2snp"
            width="100%"
            height="100%"
            loading="lazy"
          ></iframe>
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-lg">
            Map Placeholder - Library Location at Chabahill, Kathmandu
          </div>
        </div>

        <div className="mt-8 text-center text-gray-700">
          <p>Convenient parking available behind the library building.</p>
          <p>
            We are also accessible via public transit - Bus routes 12, 15, and
            18 stop directly in front of our building.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-12">
            <h2 className="text-4xl font-bold text-center text-indigo-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="block absolute left-1/2 transform -translate-x-1/2 h-1 w-20 bg-[#d62828] rounded-2xl"></div>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How do I get a library card?",
                answer:
                  "Library cards are available free of charge to all residents. Simply visit the library with a photo ID and proof of address (utility bill, lease agreement, etc.). Children under 16 must be accompanied by a parent or guardian.",
              },
              {
                question: "What is the loan period for materials?",
                answer:
                  "Most books can be borrowed for 3 weeks. DVDs and high-demand items have a 1-week loan period. Reference materials must be used within the library.",
              },
              {
                question: "How can I renew my borrowed items?",
                answer:
                  "Items can be renewed online through your account, by phone, or in person at the circulation desk. Materials can be renewed twice if there are no holds on the item.",
              },
              {
                question: "Do you offer interlibrary loans?",
                answer:
                  "Yes, we participate in the regional interlibrary loan system. If we don't have a particular item, we can often borrow it from another library. Please ask at the reference desk for assistance.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="font-bold text-lg text-indigo-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-700 mb-4">
              Have more questions? Feel free to contact us!
            </p>
            <a
              href="#"
              className="inline-block bg-indigo-900 hover:bg-indigo-800 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Ask a Librarian
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
