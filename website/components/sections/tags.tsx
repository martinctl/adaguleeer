import { WordCloud } from "../subs/word-cloud";
import wordCloudData from "@/data/word_cloud.json";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from "react";
import { QuizTab } from "../subs/quiz-tab";

export function Tags() {

    const [showWordCloud, setShowWordCloud] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleQuizSubmit = () => {
        setTimeout(() => {
            setQuizCompleted(true);
            setTimeout(() => {
                setShowWordCloud(true);
            }, 1000);
        }, 500);
    };

    gsap.registerPlugin(useGSAP, ScrollTrigger);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        const slide = container.querySelector('.slide');

        gsap.timeline({
            scrollTrigger: {
                trigger: slide,
                start: 'top top',
                end: '+=100%',
                scrub: true,
                pin: true,
                pinSpacing: false,
                anticipatePin: 1
            }
        })
        .to(slide, {
            opacity: 0,
        });


        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);


    return (
        <section ref={containerRef}>
            <div className="slide">
                {
                    !showWordCloud &&
                    (
                        <div className={`h-screen flex justify-around items-center ${!quizCompleted ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
                            <div className="flex flex-col w-5/12 space-y-5 pl-10">
                                <h4 className="font-bold text-xl">Tags</h4>
                                <p>
                                    One major point to study the evolution of communities and identify emerging patterns is 
                                    through tags. They are a double-edged swords : they can help viewers find videos on their 
                                    topics of interest or discover new content by being recommended videos based on their preferences. 
                                    However, some creators tend to overuse them to attract more views, leading to noisy data. Let’s 
                                    have a look at the most used ones. But you start to know the drill, right ?
                                </p>
                            </div>
                            <div className="pr-10">
                            <QuizTab
                                question="What do you think is the most frequenly used tag under gaming videos ?"
                                answers={["funny", "reaction", "pc", "gameplay"]}
                                correctAnswerIndex={3}
                                onSubmitAction={handleQuizSubmit}
                            />
                            </div>
                        </div>
                    )
                }
                {
                    showWordCloud && <WordCloud data={wordCloudData} />
                }
                {/* <div  className={`${showWordCloud ? '' : 'hidden'}`}>
                    <WordCloud data={wordCloudData} />
                </div> */}
            </div>
        </section>
    )
}