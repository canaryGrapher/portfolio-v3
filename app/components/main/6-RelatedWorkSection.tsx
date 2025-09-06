"use client";

import React from 'react';
import { RelatedWorkData } from "@/data/UserData";
import { RelatedWorkCard } from "@/components/pageComponents/relatedWork";

const RelatedWorkSection = () => {
    return (
        <section className="w-full bg-black py-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="mb-10">
                    <p className="text-sm text-gray-300 font-mono mb-4">
                        user.morework()
                    </p>
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-300">
                        Hand of the diligent
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mx-auto">
                    {RelatedWorkData.filter((item) => item.active).map((item, index) => (
                        <RelatedWorkCard
                            key={index}
                            title={item.title}
                            preText={item.preText}
                            image={item.image}
                            pageRoute={item.pageRoute}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedWorkSection;