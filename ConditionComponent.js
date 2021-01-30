import React, {useState, useEffect} from 'react'
import {Select} from "antd";
import Delete from './icons/delete.svg';
import './css/skip.css';

const Option = Select.Option;
const ConditionComponent = ({ questionset, setQuestionset, part1, part2, part3, ps, ...props }) => {

    const [selected_q, setSelcted_q] = useState('')
    const [value_set, setValueset] = useState([])


    useEffect(() => {
        let matched = questionset.filter(({label}) =>label===part1)
        if(matched.length > 0){
            setValueset(matched[0].options)
        }

    }, [])

    const onConditionDelete = (e, ps) => {
        
        let copyQsestionset = [...questionset];
        copyQsestionset[props.indx].skip_logic.logics.splice(ps, 1)
        setQuestionset([...copyQsestionset])
    }

    const onQuestionSelect = (value) => {
        
        // console.log(value)
        setSelcted_q(value)
        setValueset(questionset.filter(({label}) =>label===value)[0].options)

        let copyQsestionset = [...questionset];
        copyQsestionset[props.indx].skip_logic.logics[ps][0] = value
        setQuestionset([...copyQsestionset])
    }

    const onRelSelect = (value) => {
        
        let copyQsestionset = [...questionset];
        copyQsestionset[props.indx].skip_logic.logics[ps][1] = value
        setQuestionset([...copyQsestionset])
    }

    const onValueSelect = (value) => {
        let copyQsestionset = [...questionset];
        copyQsestionset[props.indx].skip_logic.logics[ps][2] = value
        setQuestionset([...copyQsestionset])
    }

    return (
        <div className="sf skLine" >
            <Select className="skIn" onChange={onQuestionSelect} defaultValue={part1} style={{ width: 50 }} >
                {
                    questionset.map(({ label }) => <Option value={label} >{label}</Option>)
                }
            </Select>
            <Select className="skIn" onChange={onRelSelect} defaultValue={part2} style={{ width: 50 }} >
                <Option value='='>=</Option>
                <Option value='≠' >≠</Option>
            </Select>
            <Select className="skIn" onChange={onValueSelect} defaultValue={part3} style={{ width: 50 }} >
                {
                    // questionset.map(({ options }) => {

                    //     return options.map(opt => <Option value={opt} >{opt}</Option>)
                    // })
                    value_set.map((x) => <Option value={x} >{x}</Option>)

                }
            </Select>
            <div className="sideIcon skdl">
                <img onClick={(e) => onConditionDelete(e, ps)} src={Delete} height={15} width={15} />
            </div>

        </div>
    )
}

export default ConditionComponent