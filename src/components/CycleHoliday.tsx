import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function CycleHoliday(): React.JSX.Element {
    const [holiday, setHoliday] = useState<string>("🎄");
    //"🎄🐣🎆🍾❤️"

    const changeHolidayAlphabetically = () => {
        setHoliday((prev) =>
            prev === "🎄" ? "🐣"
            : prev === "🐣" ? "🎆"
            : prev === "🎆" ? "🍾"
            : prev === "🍾" ? "❤️"
            : prev === "❤️" ? "🎄"
            : "invalid",
        );
    };

    const changeHolidayDate = () => {
        setHoliday((prev) =>
            prev === "🎄" ? "🍾"
            : prev === "🍾" ? "❤️"
            : prev === "❤️" ? "🐣"
            : prev === "🐣" ? "🎆"
            : prev === "🎆" ? "🎄"
            : "invalid",
        );
    };

    return (
        <div>
            {<div>Holiday: {holiday}</div>}
            <Button
                onClick={() => {
                    changeHolidayAlphabetically();
                }}
            >
                Advance Alphabet
            </Button>
            <Button
                onClick={() => {
                    changeHolidayDate();
                }}
            >
                Advance Year
            </Button>
        </div>
    );
}
