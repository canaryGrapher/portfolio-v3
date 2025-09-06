import { SkillsData } from "@/data/UserData";
import { SkillCard } from "@/components/pageComponents/skillsSection";

const SkillsSection = () => {

    return (
        <section className="min-h-screen bg-black py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-20">
                    <p className="text-sm text-gray-400 font-mono mb-4">
                        user.skills()
                    </p>
                    <h2 className="text-5xl md:text-6xl font-bold text-white text-left">
                        What I can do for you
                    </h2>
                </div>
                
                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SkillsData.skills.map((skill, index) => (
                        <SkillCard
                            key={index}
                            icon={skill.icon.src}
                            title={skill.name}
                            description={skill.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;