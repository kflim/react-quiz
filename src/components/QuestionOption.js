import React from "react";

export default function QuestionOption(props) {
    const styles = {
        backgroundColor: props.isChecked 
        ? (props.isCorrect 
            ? "#94D7A2" 
            : (props.isSelected ? "#F8BCBC" : "transparent")) 
        : props.isSelected 
            ? "#D6DBF5"
            : "transparent"
    }

    return (
        <button 
            style={styles}
            className={`question-option ${props.isSelected} ${props.isCorrect}`}
            onClick={props.selectAnswer}
        >
        {props.answer}
        </button>
    )
}