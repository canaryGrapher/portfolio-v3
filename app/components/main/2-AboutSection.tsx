"use client";

import { IntroLottie } from "@/assets/lotties";
import { useLottie, useLottieInteractivity } from "lottie-react";
import { IntroSectionData } from "@/data/UserData";


const AboutSection = () => {
    const IntroLootieStyle = {
        height: "100vh !important",
        // border: "1px solid red",
        // margin: "0 auto",
        // padding: "0 auto",
        // display: "block",
    }

    const IntroLottieOptions = {
        animationData: IntroSectionData.lottieObject,
        autoplay: false,
    }

    const lottieObject = useLottie(IntroLottieOptions, IntroLootieStyle);

    const lottieInteractivity = useLottieInteractivity({
        lottieObj: lottieObject,
        mode: "scroll",
        actions: [
            {
                visibility: [0.2, 0.9],
                type: "seek",
                frames: [0, 12],
            }
        ]
    });

    return (
        <section className="min-h-screen bg-black relative">
            <div className="w-full h-screen absolute top-0 left-0">
                {lottieInteractivity}
            </div>
            <div className="text-white absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-5 py-20 my-10">
                {IntroSectionData.lines.map((line, index) => (
                    <p key={index} className="text-4xl font-bold my-20">{line}</p>
                ))}
            </div>
        </section>
    );
};

export default AboutSection;    