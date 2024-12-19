"use client";

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CategoriesChart } from '../subs/categories-chart';
import { DurationsChart } from '../subs/durations-chart';
import categoriesData from "@/data/categories.json";
import { QuizTab } from '../subs/quiz-tab';
import durationsData from "@/data/video_durations.json";


export function Introduction() {

    const [showChart1, setShowChart1] = useState(false);
    const [quizCompleted1, setQuizCompleted1] = useState(false);

    const [showText2, setShowText2] = useState(false);
    const [quizCompleted2, setQuizCompleted2] = useState(false);


    const handleQuizSubmit1 = () => {
        setTimeout(() => {
            setQuizCompleted1(true);
            setTimeout(() => {
                setShowChart1(true);
            }, 1000);
        }, 500);
    };

    const handleQuizSubmit2 = () => {
        setQuizCompleted2(true);
        setTimeout(() => {
            setShowText2(true);
        }, 1000);
    };

    const { xAxisData, seriesData } = durationsData;

    gsap.registerPlugin(useGSAP, ScrollTrigger);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        const slides = container.querySelectorAll('.slide');
        slides.forEach((slide, index) => {
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
        })


        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={containerRef}>
            <div className="slide flex justify-around items-center px-10 h-screen">
                <div className="flex flex-col w-5/12 space-y-5">
                    {
                        !showChart1 &&
                        (
                            <div className={quizCompleted1 ? 'animate-fadeOut' : 'animate-fadeIn'}>
                                <h4 className="font-bold text-xl">Your Mission, Explorer</h4>
                                <p>
                                    Your journey begins as an Explorer, where we'll guide you through the fascinating world of gaming on
                                    YouTube. But you won't be only a passive observer, we'll test your knowledge with simple checkpoints. These short
                                    quizzes are designed to help you understand the data and the insights we'll provide you. Let's start with
                                    the beginning, shall we?
                                </p>
                            </div>
                        )
                    }
                    {
                        showChart1 &&
                        (
                            <p className={quizCompleted1 ? 'animate-fadeIn' : 'animate-fadeOut'}>
                                The pie chart on your right highlights that gaming constitutes YouTube’s biggest category, accounting for
                                nearly 19% of all videos posted on the platform. This represents a vast amount of content creators
                                and viewers brought together by a shared passion, and one more reason to dive more in-depth into it.
                                You may wonder how we get this information and whether it’s reliable. The data used to accompany you through
                                this journey comes from a massive dataset called YouNiverse. It includes metadata from English-speaking
                                YouTube from 2005 to 2019, uploaded by anonymous users. Each YouTube category contains its own world. Let’s
                                explore the most fascinating one to discover its trends, protagonists, and secrets.
                            </p>
                        )
                    }
                </div>
                {
                    !showChart1 &&
                    (
                        <div className={quizCompleted1 ? 'animate-fadeOut' : 'animate-fadeIn'}>
                            <QuizTab
                                question="What percentage does gaming represent on YouTube ?"
                                answers={["11%", "19%", "26%", "54%"]}
                                correctAnswerIndex={1}
                                onSubmitAction={handleQuizSubmit1}
                            />
                        </div>
                    )
                }
                {
                    showChart1 && <div className="w-7/12"><CategoriesChart data={categoriesData} /></div>
                }
            </div>
            <div className="slide flex justify-around items-center px-10 h-screen">
                <div className="w-5/12 flex flex-col items-center justify-center">
                    <QuizTab
                        question="What does the 10-minute peak represent? ?"
                        answers={[
                            "Min. duration for algorithm recommendation",
                            "Best attention span for users",
                            "Min. duration for more monetization control",
                            "Min. duration for automatic subtitles"
                        ]}
                        correctAnswerIndex={2}
                        onSubmitAction={handleQuizSubmit2}
                    />
                </div>
                <div className="w-7/12 flex flex-col items-center justify-center space-y-10">
                    {
                        !showText2 &&
                        (

                            <p className={quizCompleted2 ? 'animate-fadeOut' : 'animate-fadeIn'}>
                                Among all the questions which may arise, one remains essential: how much time do we spend watching videos on YouTube?
                                We decided to tackle this interrogation by analysing the duration of videos in the gaming category. The results are
                                below, and we see a quite surprising peak at 10 minutes. Remember, we won't give you answers that easily, what about
                                a little quizz to test your intuition ?
                            </p>
                        )
                    }
                    {
                        showText2 &&
                        (
                            <p className={quizCompleted2 ? 'animate-fadeIn' : 'animate-fadeOut'}>
                                Indeed, this peak represents the minimum duration for more monetization control. This shows that gaming creators give
                                importance to having more control over the ads displayed and the revenue generated, which seems pretty logical. this
                                chart only shows videos under one hour, representing 92.6% of videos, as the tail-skewed distribution shows. Let's go
                                further down.
                            </p>
                        )
                    }
                    <DurationsChart xAxisData={xAxisData} seriesData={seriesData} />
                </div>
            </div>
        </section>
    );
}
