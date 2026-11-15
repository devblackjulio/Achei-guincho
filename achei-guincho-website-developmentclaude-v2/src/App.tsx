import Header from "./components/Header";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import HowItWorks from "./sections/HowItWorks";
import People from "./sections/People";
import Providers from "./sections/Providers";
import Faq from "./sections/Faq";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <People />
        <Providers />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
