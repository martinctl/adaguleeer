import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { TimeSeries } from '../subs/timeseries';
import fifaTimeSeriesData from '@/data/fifa_15_to_18.json'
import smashTimeSeriesData from '@/data/subs_smash.json'
import mkTimeSeriesData from '@/data/subs_mk.json'
import { QuizTab } from '../subs/quiz-tab';
import { ScrollDown } from '../subs/scroll-down';

export function Events() {

    gsap.registerPlugin(useGSAP, ScrollTrigger);
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.to(container.querySelector('.horizontal'), {
            xPercent: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                pin: true,
                pinSpacing: true,
                scrub: true,
                end: () => `+=${container.offsetWidth}`
            }
        });


        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={containerRef} className="overflow-hidden">
            <div className="horizontal flex w-[500vw]">
                <div className="slide w-screen h-screen flex items-center justify-center space-x-20">
                    <div className="flex flex-col space-y-5 w-1/3">
                        <h1 className="text-3xl">Impact of real-world events on channels activity</h1>
                        <p>
                            The next part will showcase the relationships between gaming happenings and the activity
                            of related channels. In fact, we explored many games and found some really interesting 
                            patterns, that we showcase in the following plots.
                        </p>
                    </div>
                    <div className="w-[40vw]">
                        <QuizTab 
                            question="Which game license is the most impacted by new game releases ?"
                            answers={["FIFA", "Just Cause", "Battlefield", "NBA2k"]}
                            correctAnswerIndex={0}
                            onSubmitAction={() => {}}
                        />
                    </div>
                </div>
                <div className="slide h-screen w-[300vw] flex justify-center">
                    <TimeSeries data={fifaTimeSeriesData} />
                </div>
                <div className="slide h-screen w-[50vw] flex justify-center">
                    <TimeSeries data={mkTimeSeriesData} />
                </div>
                <div className="slide h-screen w-[50vw] flex justify-center">
                    <TimeSeries data={smashTimeSeriesData} />
                </div>
            </div>
        </section>
    )
}