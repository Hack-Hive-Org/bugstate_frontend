import Footer from "@/components/ui/footer";
import ProjectsComingSoon from "@/components/ui/projects-coming-soon";
import WorkshopBanner from "@/components/ui/workhshop-banner";
import WorkshopsComingSoon from "@/components/ui/workshop-coming-soon";


export default function Home() {
  return (
    <div className="">
     <WorkshopBanner/>
     <ProjectsComingSoon/>
     <WorkshopsComingSoon/>
     <Footer/>
    </div>
  );
}
