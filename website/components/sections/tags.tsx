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
                        <div className={`quizz h-screen flex flex-col justify-center items-center ${!quizCompleted ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
                            <h1>Tags</h1>
                            <p>
                                Tags are a way to categorize and organize content. They are used to help users find
                                content that is relevant to them. Tags can be used to describe the content of a post,
                                article, or video. They can also be used to help users find content that is related
                                to a specific topic or theme.
                            </p>
                            <QuizTab
                                question="What is the most used tag ?"
                                answers={["funny", "reaction", "pc", "gameplay"]}
                                correctAnswerIndex={3}
                                onSubmitAction={handleQuizSubmit}
                            />
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