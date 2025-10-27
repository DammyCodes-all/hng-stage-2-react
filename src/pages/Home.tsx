import BgCircle from "@/components/circle";
import { useAuth } from "@/components/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LandingPageBoxes } from "@/constants";
import { Link } from "react-router";
import { toast } from "sonner";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/all";
const Home = () => {
  gsap.registerPlugin(SplitText, ScrollTrigger);
  const { user } = useAuth();
  const handleGetStarted = () => {
    if (user && user.sessionActive) return;
    toast.info("Please sign up or log in to get started!");
  };
  const animationScopeRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from("#heading", {
      y: 40,
      opacity: 0,
      ease: "power2.out",
      duration: 0.7,
    });
    gsap.from("#herotext", {
      y: 30,
      opacity: 0,
      ease: "power2.out",
      duration: 0.7,
      delay: 0.2,
    });
    gsap.from(".buttons", {
      y: 20,
      opacity: 0,
      ease: "power2.out",
      duration: 0.6,
      delay: 0.4,
    });
    const boxTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#boxsection",
        start: "top center",
        end: "bottom top",
      },
    });
    boxTl.fromTo(
      ".box-anime",
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.18,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className="relative  w-full overflow-hidden" ref={animationScopeRef}>
      <section className="relative flex flex-col z-10 p-6 w-full h-full justify-center items-center min-h-[60dvh]">
        <div className="w-full max-w-2xl px-6 h-full flex flex-col justify-center items-center gap-8">
          <div className="mx-auto text-center space-y-6 text-sm text-gray-500">
            <p className="text-2xl font-semibold text-black" id="heading">
              Manage Your Tickets with
              <span className="text-blue-600"> Confidence</span>
            </p>
            <p className="max-w-prose mx-auto" id="herotext">
              The modern ticket management system that helps teams stay
              organized, resolve issues faster, and deliver exceptional support.
              Get started in seconds.
            </p>
          </div>
          <div className="flex gap-2 buttons">
            <Button
              className="cursor-pointer bg-blue-500 text-white hover:bg-blue-600 rounded-md text-sm font-medium transition-colors"
              variant="secondary"
              onClick={handleGetStarted}
            >
              <Link to={"/dashboard"}>Get started</Link>
            </Button>
            <Button className="cursor-pointer" variant="outline">
              <Link to={"/auth/login"}>Login</Link>
            </Button>
          </div>
          <BgCircle blur={true} right={"0%"} />
          <BgCircle blur={true} left={"0%"} bottom="0%" />
          <svg
            className="absolute left-0 bottom-0 w-full -z-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              fill="#0099ff"
              fillOpacity="0.7"
              d="M0,256L48,229.3C96,203,192,149,288,112C384,75,480,53,576,69.3C672,85,768,139,864,144C960,149,1056,107,1152,80C1248,53,1344,43,1392,37.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>
      <section
        className="w-full h-full flex-col justify-center items-center mt-10 p-6 gap-6 mb-10"
        id="boxsection"
      >
        <h2 className="font-bold text-xl text-center">
          Everything you need <br />
          <span className="font-normal text-sm text-gray-400">
            Powerful features to help you manage tickets efficiently and keep
            your team productive.
          </span>
        </h2>
        <div className="flex gap-4 flex-col md:flex-row justify-center items-stretch mt-10">
          {LandingPageBoxes.map((box) => (
            <div
              key={box.title}
              className="box-anime w-full max-w-xs rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 transition-transform duration-300"
            >
              <h3 className="text-base font-semibold text-slate-900">
                {box.title}
              </h3>
              <p className="mt-3 text-sm text-slate-500">{box.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
