import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    const [attempts, setAttempts] = useState<number>(4);
    const [quizRunning, setQuizRunning] = useState<boolean>(false);

    const beginQuiz = () => {
        setAttempts((prev) => prev - 1);
        setQuizRunning(true);
    };

    const endQuiz = () => {
        setQuizRunning(false);
    };

    return (
        <div>
            {<span>Attempts: {attempts} </span>}
            <div>
                <Button
                    onClick={beginQuiz}
                    disabled={!quizRunning && attempts > 0 ? false : true}
                >
                    Start Quiz
                </Button>
                <Button
                    onClick={() => setAttempts((prev) => prev + 1)}
                    disabled={!quizRunning ? false : true}
                >
                    Mulligan
                </Button>
            </div>

            <div>
                <Button onClick={endQuiz} disabled={quizRunning ? false : true}>
                    Stop Quiz
                </Button>
            </div>
        </div>
    );
}
