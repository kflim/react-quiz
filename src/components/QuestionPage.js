import React, { useState, useEffect } from "react";
import Question from "./Question";
import questionPageBg from "../images/question-page.png"

export default function QuestionPage() {
    const [questionData, setQuestionData] = useState([])
    const [hasChecked, setHasChecked] = useState(false)

    function generateNewQuestionData(data) {
        const newData = []
        for (let i = 0; i < data.length; i++) {
            const currQuestionObj = data[i]
            const decodedIncorrectAnswers = currQuestionObj.incorrect_answers.map(ans => decodeHtml(ans))
            const decodedCorrectAnswer = decodeHtml(currQuestionObj.correct_answer)
            const decodedQuestion = decodeHtml(currQuestionObj.question)
            newData.push({
                id: i,
                correct_answer: decodedCorrectAnswer,
                answers: [...decodedIncorrectAnswers, decodedCorrectAnswer],
                question: decodedQuestion,
                selected_answer: "",
                isChecked: false
            })
        }
        return newData
    }

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    function createNewQuestionData() {
        fetch("https://opentdb.com/api.php?amount=10")
        .then(res => res.json())
        .then(data => generateNewQuestionData(data.results))
        .then(newData => setQuestionData(newData))
    }

    useEffect(() => {
        createNewQuestionData()
    }, [])

    function selectAnswer(questionId, answer) {
        setQuestionData(oldQuestionData => {
            const newData = []
            for (let i = 0; i < oldQuestionData.length; i++) {
                const oldData = oldQuestionData[i]
                if (oldData.id === questionId) {
                    newData.push({...oldData, selected_answer: answer})
                } else {
                    newData.push(oldData)
                }
            }
            return newData
        })
    }

    const displayedQuestions = questionData.map(data => (
        <Question 
            key={data.id}
            parent_id={data.id}
            correct_answer={data.correct_answer} 
            answers={data.answers}
            question={data.question}
            selectAnswer={selectAnswer}
            selected_answer={data.selected_answer}
            isChecked={data.isChecked}
        />
    ))

    function toggleMode() {
        if (hasChecked) {
            toggleHasChecked()
            createNewQuestionData()
        } else {
            toggleHasChecked()
            setQuestionData(oldQuestionData => oldQuestionData.map(oldData => {
                return {...oldData, isChecked: {hasChecked}}
            }))
        }
    }

    function toggleHasChecked() {
        setHasChecked(prevHasChecked => !prevHasChecked)
    }

    function checkSelectedCorrectAnswer(questionData) {
        return questionData.correct_answer === questionData.selected_answer
    }

    const correctAnswerCount = questionData.filter(data => checkSelectedCorrectAnswer(data)).length

    return (
        <div className="question-page">
            <img src={questionPageBg} className="question-page-bg" alt=""></img>
            {displayedQuestions}
            <div className="question-page-bottom">
                {
                hasChecked && 
                <h3 className="question-page-score">
                    You scored {correctAnswerCount} / {questionData.length} correct answers
                </h3>
                }
                <button className="submit-btn" onClick={toggleMode}>
                    <span>{hasChecked ? "Play again" : "Check answers"}</span>
                </button>
            </div>
        </div>
    )
}