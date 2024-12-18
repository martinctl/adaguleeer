"use client";
import { useState } from "react";
import { Card, Text, Button, Flex, Box } from "@radix-ui/themes";
import {
    CheckCircledIcon,
    CrossCircledIcon,
    MixIcon,
} from "@radix-ui/react-icons";

interface QuizTabProps {
    question: string;
    answers: string[];
    correctAnswerIndex: number;
    onSubmitAction: () => void;
}

export function QuizTab({
    question,
    answers,
    correctAnswerIndex,
    onSubmitAction,
}: QuizTabProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleAnswerSelect = (index: number) => {
        if (!submitted) {
            setSelectedAnswer(index);
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
        setTimeout(() => {
            onSubmitAction();
        }, 1000);
    };

    return (
        <Flex direction="column" align="center" gap="4">
            <Card size="4" style={{ width: "100%", maxWidth: "600px" }}>
                <Flex direction="column" gap="4" p="4">
                    <Flex align="center" gap="2">
                        <MixIcon width="24" height="24" color="tomato" />
                        <Text size="5" weight="bold">
                            Quiz Time!
                        </Text>
                    </Flex>

                    <Text size="3" color="gray">
                        {question}
                    </Text>

                    <Flex direction="column" gap="2">
                        {answers.map((answer, index) => (
                            <Box
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                className={`
                                            p-4 rounded-md cursor-pointer border-2 transition-all
                                            ${!submitted &&
                                        selectedAnswer === index
                                        ? "border-accent/70 bg-accent/10"
                                        : "border-slate-100/10"
                                    }
                                            ${submitted &&
                                        index === correctAnswerIndex
                                        ? "border-green-500 bg-green-500/10"
                                        : ""
                                    }
                                            ${submitted &&
                                        index === selectedAnswer &&
                                        index !== correctAnswerIndex
                                        ? "border-red-500 bg-red-500/10"
                                        : ""
                                    }
                                            ${!submitted
                                        ? "hover:border-accent/50"
                                        : ""
                                    }
                                        `}
                            >
                                <Flex justify="between" align="center">
                                    <Text>{answer}</Text>
                                    {submitted && index === correctAnswerIndex && (
                                        <CheckCircledIcon className="text-green-500" />
                                    )}
                                    {submitted &&
                                        index === selectedAnswer &&
                                        index !== correctAnswerIndex && (
                                            <CrossCircledIcon className="text-red-500" />
                                        )}
                                </Flex>
                            </Box>
                        ))}
                    </Flex>
                    <Button
                        onClick={handleSubmit}
                        disabled={submitted || selectedAnswer === null}
                        size="3"
                        variant="classic"
                    >
                        Submit Answer
                    </Button>
                </Flex>
            </Card>
        </Flex>
    );
}
