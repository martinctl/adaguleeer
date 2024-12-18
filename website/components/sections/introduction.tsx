"use client";

import { useState } from 'react';
import { AnimatedPieChart } from '../subs/animated-pie-chart';
import categoriesData from "@/data/categories.json";
import { QuizTab } from '../subs/quiz-tab';
import { ScrollDown } from '../subs/scroll-down';

export function Introduction() {

    const [showPieChart, setShowPieChart] = useState(false);
    const [showLineChart, setShowLineChart] = useState(false);
    const handleQuiz1Submit = () => {
        setShowPieChart(true);
    };
    const handleQuiz2Submit = () => {
        setShowLineChart(true);
    }

    return (
        <section>
            <div className="flex justify-around items-center h-screen px-10">
                <div className="flex flex-col w-1/2 space-y-5">
                    <h4 className="font-bold text-xl">Your Mission, Explorer</h4>
                    <p>
                        Your journey begins as an Explorer, where we'll guide you through the fascinating world of gaming on 
                        YouTube. We have analysed a comprehensive amount of YouTube metadata involving ~130k channels with more
                        than 10k subscribers, with videos ranging from 2005 to 2019.
                    </p>

                    <p>
                        But you won't be only a passive observer, we'll test your knowledge with simple checkpoints. These short 
                        quizzes are designed to help you understand the data and the insights we'll provide you. Let's start with
                        the beginning, shall we?
                    </p>
                </div>
                {!showPieChart && 
                (<QuizTab 
                    question="What percentage does gaming represent on YouTube ?"
                    answers={["50%, 60%, 70%, 80%"]}
                    correctAnswerIndex={3}
                    onSubmitAction={handleQuiz1Submit}
                />
                )}
                {showPieChart && 
                (<div className="w-1/2">
                    <AnimatedPieChart data={categoriesData}/>
                </div>
            )}
                {showPieChart && <ScrollDown />}
            </div>
            <div className="h-screen flex items-center justify-around">
                <div className="w-1/3 flex flex-col space-y-5">
                    <h4 className="font-bold text-xl">Preliminary analysis</h4>
                    <p>
                        With more than 18% of our original 300gb dataset, we have plenty of data to dive into! Among all the questions
                        you may have young padawan, we can start by answering the most important one: what is the distribution of
                        durations of such videos ? 
                    </p>
                </div>
                {!showLineChart && 
                (<QuizTab 
                    question="Where's the peak in videos duration ?"
                    answers={["2min30s, 7min20s, 10min, 25min"]}
                    correctAnswerIndex={1}
                    onSubmitAction={handleQuiz2Submit}
                />
                )}
                
                {showLineChart && <ScrollDown />}
            </div>
            <div className="h-screen flex flex-col items-center justify-center">
                <h4>Engine Performance</h4>
                <p>When you are setting forth into the unknown, the responsive 1.5L K15B engine powers you through.
                    Built for off-roading, it generates strong torque throughout a wide RPM range for unstoppable
                    performance.</p>
            </div>
        </section>
    );
}
