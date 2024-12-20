import { WordCloud } from "../subs/word-cloud";
import wordCloudData from "@/data/word_cloud.json";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from "react";
import { QuizTab } from "../subs/quiz-tab";
import { ScrollDown } from "../subs/scroll-down";
import { Button } from "@radix-ui/themes";
import { ReloadIcon } from "@radix-ui/react-icons";

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

    const quizRef = useRef<{ resetQuiz: () => void } | null>(null);

    const handleReset = () => {
        setShowWordCloud(false);
        setQuizCompleted(false);
        if (quizRef.current) {
            quizRef.current.resetQuiz();
        }
    }

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
                        <div className={`h-screen flex justify-around items-center px-10 text-lg ${quizCompleted ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
                            <div className="flex flex-col w-5/12 space-y-5 pl-10">
                                <h4 className="font-bold text-xl border-b-2 pb-4" style={{ borderColor: '#E54D2E' }}>Tags Overview</h4>
                                <p className="text-justify mb-4">
                                    Another important metadata we should care about is tags. They are a double-edged sword, since they can help viewers
                                    discover interesting videos or receive accurate recommendations aligned with their preferences, but tend to be 
                                    overused by some creatorfpàcs to attract more views.
                                </p>
                                <p className="text-justify">
                                    Amongst all tags, which ones bridge the gap between communities? Let's have a look at the most frequently used. 
                                </p>
                            </div>
                            <div className="pr-10">
                                <QuizTab
                                    ref={quizRef}
                                    question="What do you think is the most frequenly used tag under gaming videos ?"
                                    answers={["funny", "reaction", "commentary", "gameplay"]}
                                    correctAnswerIndex={3}
                                    onSubmitAction={handleQuizSubmit}
                                />
                            </div>
                        </div>
                    )
                }
                {/* {
                    showWordCloud && <WordCloud data={wordCloudData} />
                } */}
                <div className={`${showWordCloud ? '' : 'hidden'} ${quizCompleted ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
                    <WordCloud data={wordCloudData} />
                    <ScrollDown />
                </div>
                {
                    showWordCloud &&
                    (
                        <div className="absolute top-10 right-16">
                            <Button onClick={handleReset} size="3" variant="soft">
                                <ReloadIcon />
                            </Button>
                        </div>
                    )
                }
            </div>
        </section>
    )
}