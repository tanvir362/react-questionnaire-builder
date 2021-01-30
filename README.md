# React Questionnaire Builder

> Provide questionnaire as a javascript array of question objects with an interactive UI

## Install
```
npm install react-questionnaire-builder
```
or,
```
yarn add react-questionnaire-builder
```

## How to use
```js
import QuestionnaireBuilder from 'react-questionnaire-builder'

const DemoComponent = () => {
    const [questionset, setQuestionset] = useState([])

    return (
        <div>
            <QuestionnaireBuilder
                questionset={questionset}
                setQuestionset={setQuestionset}
                title="Test Questionnaire"
                editable={true}
            />

            <button onClick={() => console.log(questionset)} >Log</button>
        </div>
    )
}

export default DemoComponent
```

## Parameters

|    params    |   type   |               required               |   description    |
|:------------:|:--------:|:------------------------------------:|:----------------:|
|  questionset |   array  |                 true                 | The array where you want to have the array of question objects of the questionnaire
|setQuestionset|  method  |                 true                 | The setter method for the questionset which will be used by the QuestionnaireBuilder to update questionset
|    title     |  string  |                 false                | if not provided default value would be **Questionnaire** |
|   editable   |  boolean |                 false                | if not provided default value would be **true**




