import React from "react";
import QuestionOption from "./QuestionOption";

export default function Question(props) {
    const questionOptions = props.answers.map(answer => 
        <QuestionOption
            key={answer}
            answer={answer} 
            isSelected={props.selected_answer === answer}
            isCorrect={props.correct_answer === answer}
            isChecked={props.isChecked}
            selectAnswer={() => props.selectAnswer(props.parent_id, answer)}
        />
    )

    return (
        <div className="question-container">
            <h1 className="question">{props.question}</h1>
            <div className="question-option-container">
                {questionOptions}
            </div>
        </div>
    )
}