import { useState, useEffect, FormEvent } from "react";
import "./App.css";
import BaseApparelLogo from "./components/BaseApparelLogo/BaseApparelLogo";
import { MdNavigateNext, MdError } from "react-icons/md";

function App() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [heroImage, setHeroImage] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  useEffect(() => {
    const currentSize = window.innerWidth > 768 ? true : false;
    setIsDesktop(currentSize);

    if (currentSize === true) {
      setHeroImage("/public/images/hero-desktop.jpg");
    } else {
      setHeroImage("/public/images/hero-mobile.jpg");
    }
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitted email:", email);
    if (email.trim() === "") {
      handleEmailWarning();
    } else {
      setIsEmailEmpty(false);

      setEmail("");
    }
  };

  const handleEmailWarning = () => {
    setIsErrorVisible(true);

    setTimeout(() => {
      setIsErrorVisible(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen w-full bg-rose-50">
      {/* base apparel logo */}
      {!isDesktop && <BaseApparelLogo />}

      {/*  main content  */}
      <div className="flex flex-col justify-center items-center space-y-4 mt-4 md:mt-0 md:flex-row-reverse md:justify-between md:space-y-0 md:space-x-4 md:min-h-screen">
        {/* image */}
        <div className="container mx-auto md:w-1/2">
          <img
            src={heroImage}
            className="object-cover w-full h-90 md:h-screen"
          />
        </div>

        {/* left div */}
        <div
          className="flex flex-col justify-start items-center space-y-4 md:w-1/2 md:h-screen md:m-0 md:pt-10 w-full
       "
        >
          <div className="flex flex-col justify-center items-center space-y-1 text-center md:text-left">
            {/* base apparel logo */}
            <div className="w-full">{isDesktop && <BaseApparelLogo />}</div>

            {/* text content */}
            <p className="tracking-most-widest w-full font-extralight text-6xl pt-10 md:pt-24 text-rose-400">
              WE'RE
            </p>
            <p className="tracking-most-widest w-full font-bold text-6xl max-w-sm text-gray-800 md:max-w-md">
              COMING SOON
            </p>

            <p className="py-6 text-rose-400 text-lg leading-2 max-w-sm font-light md:max-w-md">
              Hello fellow shoppers! We're currently building our new fashion
              store. Add your email below to stay up-to-date with announcements
              and out launch deals.
            </p>

            {/* input and button */}
            <form onSubmit={handleSubmit} className="relative w-full">
              <input
                type="email"
                className={`rounded-full mb-14 py-4 pl-4 w-full placeholder:text-rose-950 focus:outline-none text-rose-950 text-opacity-60 placeholder:text-opacity-50 placeholder:pl-2 placeholder:opacity-80 ${
                  isEmailEmpty
                    ? "border-rose-500 border-2"
                    : "border border-black border-opacity-30"
                }`}
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="absolute top-0 right-0 py-3 px-6 rounded-full bg-gradient-to-r from-rose-300  to-rose-400 text-white text-3xl text-center font-bold shadow-lg shadow-rose-100 hover:shadow-xl hover:shadow-rose-300 hover:-translate-y-1 hover:scale-105 transition-all hover:opacity-90">
                <MdNavigateNext />
              </button>
              {isErrorVisible && (
                <MdError className="absolute top-2 right-24 translate-x-3 text-red-500 text-4xl" />
              )}
            </form>
            {isErrorVisible && (
              <span className="text-rose-500 pt-1 -translate-y-14 w-full text-left pl-6">
                Please provide a valid email
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
