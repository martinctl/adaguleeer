import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { TimeSeries } from '../subs/timeseries';
import fifaTimeSeriesData from '@/data/fifa_14_to_18.json'
import lolTimeSeriesData from '@/data/views_lol.json'
import acTimeSeriesData from '@/data/views_ac.json'
import { QuizTab } from '../subs/quiz-tab';
import { ScrollDown } from '../subs/scroll-down';
import { Button } from '@radix-ui/themes';
import { ReloadIcon } from '@radix-ui/react-icons';

export function Events() {

    const quizRef = useRef<{ resetQuiz: () => void } | null>(null);
    const [showText, setShowText] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleQuizSubmit = () => {
        setTimeout(() => {
            setQuizCompleted(true);
            setTimeout(() => {
                setShowText(true);
            }, 1000);
        }, 500);
    };

    const handleReset = () => {
        setQuizCompleted(false);
        setShowText(false);
        if (quizRef.current) {
            quizRef.current.resetQuiz();
        }
    };

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

        const slide = container.querySelector('.slide')
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
        <section ref={containerRef} className="overflow-hidden">
            <div className="horizontal flex w-[800vw]">
                <div className="w-screen h-screen flex items-center justify-center space-x-20">
                    <div className="flex flex-col space-y-5 w-1/3">
                        <h1 className="font-bold text-xl border-l-2 pl-4" style={{ borderColor: '#E54D2E' }}>Impact of real-world events</h1>
                        <p className="text-justify text-lg">
                            One of the key ways gamers connect with their favourite communities and games is through their dynamics,
                            the excitement and new experiences that break the routine. How many promising games have we seen fail
                            because they lacked regular updates or a sense of evolution. A powerful tool for games to keep their
                            communities engaged is through real-life events, and when it comes to this, fresh releases are among
                            the most impactful.
                        </p>
                        <p className="text-justify text-lg">
                            Show us you are warmed-up with this new quizz!
                        </p>
                    </div>
                    <div className="w-[40vw] text-lg">
                        {
                            !showText &&
                            (
                                <div className={`${quizCompleted ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
                                    <QuizTab
                                        question="Which game license is the most impacted by new game releases ?"
                                        answers={["FIFA", "Just Cause", "Battlefield", "NBA 2K"]}
                                        correctAnswerIndex={0}
                                        onSubmitAction={handleQuizSubmit}
                                        ref={quizRef}
                                    />
                                </div>
                            )
                        }
                        {
                            showText &&
                            (
                                <div className={`${quizCompleted ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
                                    <h1 className="font-bold text-xl border-l-2 pl-4" style={{ borderColor: '#E54D2E' }}>Impact of real-world events</h1>
                                    <p className="text-justify text-lg">
                                        One of the key ways gamers connect with their favourite communities and games is through their dynamics,
                                        the excitement and new experiences that break the routine. How many promising games have we seen fail
                                        because they lacked regular updates or a sense of evolution. A powerful tool for games to keep their
                                        communities engaged is through real-life events, and when it comes to this, fresh releases are among
                                        the most impactful.
                                    </p>
                                    <p className="text-justify text-lg">
                                        Show us you are warmed-up with this new quizz!
                                    </p>
                                </div>
                            )
                        }
                        {
                            showText && <ScrollDown />
                        }
                        {
                            showText &&
                            (
                                <div className="absolute top-10 right-10">
                                    <Button onClick={handleReset} size="3" variant="soft">
                                        <ReloadIcon />
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="h-screen w-[300vw] flex justify-center">
                    <TimeSeries data={fifaTimeSeriesData} />
                </div>
                <div className="h-screen w-[50vw] flex flex-col justify-center items-center mr-20">
                    <h4 className="font-bold text-xl">Releases</h4>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged. It was popularised in the
                        1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                        more recently with desktop publishing software like Aldus PageMaker including
                        versions of Lorem Ipsum.
                    </p>
                </div>
                <div className="h-screen w-[200vw] flex justify-center">
                    <TimeSeries data={acTimeSeriesData} />
                </div>
                <div className="h-screen w-[150vw] flex justify-center">
                    <TimeSeries data={lolTimeSeriesData} />
                </div>
                <div className="h-screen w-[50vw] flex flex-col justify-center items-center">
                    <h4 className="font-bold text-xl">Tournaments</h4>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and scrambled it to make a type
                        specimen book. It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
            </div>
        </section>
    )
}