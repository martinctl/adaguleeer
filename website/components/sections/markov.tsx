import { HeatmapChart } from "../subs/heatmap"
import markovTransitionsData from "@/data/markov_matrix.json"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from "react";
import { ScrollDown } from "../subs/scroll-down";
import { Button } from "@radix-ui/themes";
import { ReloadIcon } from "@radix-ui/react-icons";
import { QuizTab } from "../subs/quiz-tab";


export function Markov() {

    const quizRef = useRef<{ resetQuiz: () => void } | null>(null);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleQuizSubmit = () => {
        setTimeout(() => {
            setQuizCompleted(true);
            setTimeout(() => {
                setShowHeatmap(true);
            }, 1000);
        }, 500);
    };

    const handleReset = () => {
        setQuizCompleted(false);
        setShowHeatmap(false);
        if (quizRef.current) {
            quizRef.current.resetQuiz();
        }
    };


    const { games, data } = markovTransitionsData
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
            <div className="slide flex justify-around items-center px-10 h-screen">
                {
                    !showHeatmap &&
                    (
                        <div className="flex flex-col w-5/12 space-y-5">
                            <div className={`${quizCompleted ? 'animate-fadeOut' : 'animate-fadeIn'} text-lg`}>
                                <h4 className="font-bold text-xl">Interactions between communities</h4>
                                <p className="text-justify mb-4">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen book.
                                </p>
                                <p className="text-justify mb-4">
                                    It has survived not only five centuries, but also the leap into electronic
                                    typesetting, remaining essentially unchanged. It was popularised in the
                                    1960s with the release of Letraset sheets containing Lorem Ipsum passages.
                                </p>
                                <p className="text-justify">
                                    Many users watch several games. But could you guess which combos are the most
                                    frequent ? Which games match the best ?
                                </p>
                            </div>
                        </div>
                    )
                }
                {
                    showHeatmap && <ScrollDown />
                }
                {
                    !showHeatmap &&
                    (
                        <div className={`${quizCompleted ? 'animate-fadeOut' : 'animate-fadeIn'} text-lg`}>
                            <QuizTab
                                question="Which of these pairs of games has the highest probability of players transitioning between them ?"
                                answers={[
                                    "The Sims => Grand Theft Auto",
                                    "Mortal Kombat => Street Fighters",
                                    "Roblox => Minecraft",
                                    "Fortnite => Call of Duty"
                                ]}
                                correctAnswerIndex={2}
                                onSubmitAction={handleQuizSubmit}
                                ref={quizRef}
                            />
                        </div>
                    )
                }
                {
                    showHeatmap &&
                    (
                        <div className={`${quizCompleted ? 'animate-fadeIn' : 'animate-fadeOut'} h-screen w-screen flex justify-center`}>
                            <HeatmapChart games={games} data={data} />
                        </div>
                    )
                }
                {
                    showHeatmap &&
                    (
                        <div className="absolute top-10 right-10">
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