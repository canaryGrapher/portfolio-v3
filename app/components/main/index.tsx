import HeroSection from "./1-HeroSection";
import AboutSection from "./2-AboutSection";
import SkillsSection from "./3-SkillsSection";
import WorkExSection from "./4-WorkExSection";
import VolunteerSection from "./5-VolunteerSection";
import RelatedWorkSection from "./6-RelatedWorkSection";
import FunStuffSection from "./7-FunStuffSection";

const Main = () => {
    return (
        <div className="w-full">
            {/* <HeroSection /> */}
            {/* <AboutSection /> */}
            <SkillsSection />
            <WorkExSection />
            <VolunteerSection />
            <RelatedWorkSection />
            <FunStuffSection />
        </div>
    );
};

export default Main;