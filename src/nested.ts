import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    const newarr: Question[] = questions.filter(
        (question: Question): boolean => question.published,
    );
    return newarr;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    const newarr: Question[] = questions.filter(
        (question: Question) =>
            question.body || question.expected || question.options.length > 0,
    );
    return newarr;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number,
): Question | null {
    const foundQuestionArr: Question[] = questions.filter(
        (question: Question) => question.id === id,
    );
    const foundQuestion: Question[] | null =
        foundQuestionArr.length !== 0 ? foundQuestionArr[0] : null;
    return foundQuestion;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const removedQ: Question[] = questions.filter(
        (question: Question) => question.id !== id,
    );
    return removedQ;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    const namesArray: string[] = questions.map(
        (question: Question) => question.name,
    );
    return namesArray;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    const allPoints: number[] = questions.map(
        (question: Question) => question.points,
    );
    const totalPoints: number = allPoints.reduce(
        (currentNumber: number, num: number) => currentNumber + num,
        0,
    );
    return totalPoints;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    const publishedArray: number[] = questions.map((question: Question) =>
        question.published ? question.points : 0,
    );
    const publishedSum: number = publishedArray.reduce(
        (questionPoint: number, num: number) => questionPoint + num,
        0,
    );
    return publishedSum;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    const newString: string = questions
        .map(
            (question: Question) =>
                question.id +
                "," +
                question.name +
                "," +
                question.options.length +
                "," +
                question.points +
                "," +
                question.published,
        )
        .join("\n");
    return "id,name,options,points,published" + "\n" + newString;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    const answersArray: Answer[] = questions.map((question: Question) => ({
        questionId: question.id,
        text: "",
        submitted: false,
        correct: false,
    }));
    return answersArray;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    const publishedArray: Question[] = questions.map((question: Question) => ({
        id: question.id,
        name: question.name,
        type: question.type,
        body: question.body,
        expected: question.expected,
        options: question.options,
        points: question.points,
        published: true,
    }));
    return publishedArray;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    if (questions.length == 0) return true;
    const firstType: string = questions[0].type;
    const sameArray: Question[] = questions.filter(
        (question: Question) => question.type === firstType,
    );
    return questions.length === sameArray.length;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType,
): Question[] {
    const newQuestions: Question[] = questions.map((question: Question) => ({
        id: question.id,
        name: question.name,
        type: question.type,
        body: question.body,
        expected: question.expected,
        options: question.options,
        points: question.points,
        published: question.published,
    }));
    const newBlankQuestion: Question = {
        ...makeBlankQuestion(),
        id: id,
        name: name,
        type: type,
    };
    return [...newQuestions, newBlankQuestion];
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string,
): Question[] {
    const newQuestions: Question[] = questions.map((question: Question) =>
        question.id !== targetId ? question : { ...question, name: newName },
    );
    return newQuestions;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType,
): Question[] {
    const newType: boolean = newQuestionType !== "multiple_choice_question";

    newQuestionType;
    const newQuestions: Question[] = questions.map((question: Question) =>
        question.id !== targetId ?
            question
        :   {
                ...question,
                type: newQuestionType,
                options: newType ? [] : question.options,
            },
    );
    return newQuestions;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string,
): Question[] {
    const addToEnd: boolean = targetOptionIndex === -1;

    const newQuestions: Question[] = questions.map((question: Question) =>
        question.id !== targetId ?
            question
        :   {
                ...question,
                options:
                    addToEnd ?
                        [...question.options, newOption]
                    :   question.options.map((option: string, index: number) =>
                            index === targetOptionIndex ? newOption : option,
                        ),
            },
    );
    return newQuestions;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number,
): Question[] {
    const newArray: Question[] = questions.reduce(
        (result: Question[], question: Question) =>
            question.id === targetId ?
                [...result, question, duplicateQuestion(newId, question)]
            :   [...result, question],
        [],
    );
    return newArray;
}
