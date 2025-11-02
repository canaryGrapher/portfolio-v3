import { Fragment } from 'react'
import ChangeLog from '@/data/pages/updates/ChangeLog'
import Image from 'next/image'

const UpdateTimeline = () => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };
    return (
        <div className="flex flex-col items-center gap-2 text-center mx-auto mt-18 pb-20 px-5 md:px-0">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] w-full text-left gap-4">
                {/* Header */}
                <div />
                <div className="mb-5 md:text-left text-center">
                    <h1 className="text-[#033EDF] text-3xl">Changes to the yasharyan.dev website</h1>
                </div>
                {ChangeLog.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((change, index) => (
                    <Fragment key={index}>
                        <div className="flex flex-row items-top gap-2 text-right w-full justify-start md:justify-end">
                            {/* <div className="border-2 border-blue-500 rounded-full w-4 h-4"></div> */}
                            <h2 className="text-[#033EDF]">{formatDate(change.date)}</h2>
                        </div>
                        <div>
                        <p className="text-lg text-gray-500">{change.changes}</p>
                            {change.image && (
                                <Image
                                    src={change.image}
                                    alt={change.changes}
                                    width={400}
                                    height={400}
                                    className="mb-4 mx-auto md:mx-0"
                                    loading="lazy"
                                    lazyBoundary='viewport'
                                />
                            )}
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default UpdateTimeline;