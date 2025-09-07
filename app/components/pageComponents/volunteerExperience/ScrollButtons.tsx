import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ScrollButtons = ({ scrollToCard, currentCardIndex, volunteerExperiences }: { scrollToCard: (index: number) => void, currentCardIndex: number, volunteerExperiences: any[] }) => {
    const buttonClass = "cursor-pointer w-12 h-12 border-4 border-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-200 text-black hover:text-gray-200";
    return (
        <div className="flex justify-end items-center space-x-4 mt-8">
            <button
                onClick={() => scrollToCard(Math.max(0, currentCardIndex - 1))}
                className={buttonClass}
            >
                <FaChevronLeft className="w-6 h-6" />
            </button>

            <button
                onClick={() => scrollToCard(Math.min(volunteerExperiences.length - 1, currentCardIndex + 1))}
                className={buttonClass}
            >
                <FaChevronRight className="w-6 h-6" />
            </button>
        </div>
    )
};

export default ScrollButtons;
