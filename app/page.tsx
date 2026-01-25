
import Header from "../components/custom/Header";
import Hero from "../components/custom/Hero";

export default function Home() {
  return (
    <div className="bg-[linear-gradient(180deg,hsla(219,29%,19%,1)_0%,hsla(0,0%,6%,1)_20%,hsla(163,100%,18%,1)_100%)] h-screen">
      <Header/>
      <Hero/>
     
    </div>
  );
}