import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";
import NewsletterBox from "../components/NewsletterBox.jsx";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28  ">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt="contact-img"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-black-600">
            <b>Our Store</b>
          </p>
          <p className="text-gray-500">
            <b>
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </b>
          </p>
          <p className="text-gray-500">
            <b>
              Tel: (415) 555-0132 <br /> Email: admin@forever.com
            </b>
          </p>
          <p className="font-semibold text-xl text-black-600">
            <b>Careers at Forever</b>
          </p>
          <p className="text-gray-500">
            <b>Learn more about our teams and job openings.</b>
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
