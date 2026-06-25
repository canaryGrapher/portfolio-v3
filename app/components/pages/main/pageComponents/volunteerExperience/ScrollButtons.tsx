import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { VolunteerExperience } from '@/interface/UserData';

const ScrollButtons = ({ scrollToCard, currentCardIndex, volunteerExperiences }: { scrollToCard: (index: number) => void, currentCardIndex: number, volunteerExperiences: VolunteerExperience[] }) => {
    const buttonClass = "cursor-pointer w-10 h-10 border border-gray-200 bg-white/90 text-gray-600 hover:text-green-800 hover:border-green-200/60 hover:bg-green-50 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm";
    return (
        <div className="flex justify-end items-center space-x-4 mt-8 px-4">
            <button
                onClick={() => scrollToCard(Math.max(0, currentCardIndex - 1))}
                className={buttonClass}
                disabled={currentCardIndex === 0}
                style={{ opacity: currentCardIndex === 0 ? 0.5 : 1, cursor: currentCardIndex === 0 ? 'not-allowed' : 'pointer' }}
            >
                <FaChevronLeft className="w-4 h-4" />
            </button>

            <button
                onClick={() => scrollToCard(Math.min(volunteerExperiences.length - 1, currentCardIndex + 1))}
                className={buttonClass}
                disabled={currentCardIndex === volunteerExperiences.length - 1}
                style={{ opacity: currentCardIndex === volunteerExperiences.length - 1 ? 0.5 : 1, cursor: currentCardIndex === volunteerExperiences.length - 1 ? 'not-allowed' : 'pointer' }}
            >
                <FaChevronRight className="w-4 h-4" />
            </button>
        </div>
    )
};

export default ScrollButtons;
