import React, { useEffect } from "react";
import Question from "./Question"
import "./css/Create.css"

const QuestionnaireBuilder = ({ questionset, setQuestionset, ...props}) => {

  useEffect(() => {
    if (questionset.length < 1) {
      setQuestionset([
        {
          label: "",
          question_type: "Select Response Type",
          options: [],
          required: false,
          skip_logic: {
            logics: [],
            criteria: null
          }
        }
      ])
    }

  }, [])


  return (
    <div className="container justify-content-center mainConfCreate">

      <div className="campTMain">
        <h2 className="campT">{props?.title||'Questionnaire'}</h2>
      </div>

      <div>
        {
          questionset.map((item, indx) => <Question
            questionset={questionset}
            setQuestionset={setQuestionset}
            editable={props?.editable || true}
            indx={indx}
            qlabel={item.label}
            key={`que_${indx}_${item.question_type}_${questionset.length}`}
            qtype={item.question_type}
            options={item.options}
          />)
        }
      </div>
    </div>
  );
};

export default QuestionnaireBuilder;