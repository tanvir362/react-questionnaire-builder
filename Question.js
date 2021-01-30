import React, { useState, useEffect } from "react";
import SO from './icons/sone.svg';
import SM from './icons/smany.svg';
import NUM from './icons/num.svg';
import PHOTO from './icons/photo.svg';
import MAP from './icons/map.svg';
import Add from './icons/add.svg';
import Skip from './icons/skip.svg';
import Copy from './icons/copy.svg';
import Delete from './icons/delete.svg';
import { Input, Select, Card, Switch, Modal } from "antd";
import Button from '@material-ui/core/Button';
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./css/QuestionCardMain.css";
import "./css/selectQuestionOpt.css";
import './css/skip.css';
import ConditionComponent from './ConditionComponent'


const Question = ({ questionset, setQuestionset, editable, ...props }) => {

    const [qlabel, setQlabel] = useState(props.qlabel)
    const [qtype, setQtype] = useState(props.qtype)
    const [qoptions, setQoptions] = useState([])
    const [qrequired, setQrequired] = useState(true)
    const [skip_logics, setSkipLogics] = useState([])
    const [criteria, setCriteria] = useState(null)
    const [hover_prop, sethoverprop] = useState({ show_menu: false, border_color: '#c7c5c5' })
    const [sw_sett, setswSett] = useState(false)

    const [alertQdelete, setAlertQdelete] = useState(false)
    const toggleQdeleteAlert = () => setAlertQdelete(alertQdelete ? false : true)

    const { Option } = Select;

    const toggleSetting = () => {
        setswSett(!sw_sett)
    }

    const onLabelChange = (e) => {
        let copyQsestionset = [...questionset];
        copyQsestionset[props.indx].label = e.target.value;
        // console.log(e.target.value)
        setQlabel(e.target.value);
        setQuestionset([...copyQsestionset]);
        // document.getElementById(`label_${props.indx}`).focus();
        localStorage.setItem('createEdit', 'true')
    }

    const onTypeChange = (value) => {

        let copyQsestionset = [...questionset];
        copyQsestionset[props.indx].question_type = value;
        if (value === 'Select One' || value === 'Select Many') {
            if (copyQsestionset[props.indx].options.length === 0) {
                copyQsestionset[props.indx].options = ['Option 1', 'Option 2']
            }
        }
        else {
            copyQsestionset[props.indx].options = []
        }
        // console.log(copyQsestionset[props.indx].options.length, value, copyQsestionset[props.indx].options)
        setQtype(value);
        setQuestionset([...copyQsestionset]);
        localStorage.setItem('createEdit', 'true')
    }

    const onOptionChange = (e, pos) => {
        let copyQsestionset = [...questionset];
        copyQsestionset[props.indx].options[pos] = e.target.value
        console.log(e.target.value, props.indx, pos)
        setQuestionset([...copyQsestionset]);
        // document.getElementById(`op_indx_${props.indx}_pos_${pos}`).focus();
        localStorage.setItem('createEdit', 'true')
    }

    const onOptionAdd = () => {
        let copyQsestionset = [...questionset];
        copyQsestionset[props.indx].options.push('')
        setQuestionset([...copyQsestionset])
        localStorage.setItem('createEdit', 'true')
    }

    const onOptionDelete = (e, pos) => {
        let copyQsestionset = [...questionset];
        // console.log(pos)
        copyQsestionset[props.indx].options.splice(pos, 1)
        setQuestionset([...copyQsestionset])
        localStorage.setItem('createEdit', 'true')
    }

    const onChangeRequired = (checked) => {
        let copyQsestionset = [...questionset];
        copyQsestionset[props.indx].required = checked
        setQuestionset([...copyQsestionset]);
        localStorage.setItem('createEdit', 'true')
    }

    // const onConditionDelete = (e, ps) => {
    //     let copyQsestionset = [...questionset];
    //     copyQsestionset[props.indx].skip_logic.logics.splice(ps, 1)
    //     setQuestionset([...copyQsestionset])
    // }
    const onConditionAdd = () => {
        let copyQsestionset = [...questionset];
        copyQsestionset[props.indx].skip_logic.logics.push(['', '', ''])
        setQuestionset([...copyQsestionset])
        localStorage.setItem('createEdit', 'true')
    }

    const onCriteriaChange = (value) => {
        let copyQsestionset = [...questionset];
        copyQsestionset[props.indx].skip_logic.criteria = value
        setQuestionset([...copyQsestionset])
        localStorage.setItem('createEdit', 'true')
    }


    const onAdd = () => {
        let copyQsestionset = [...questionset]
        let item = {
            label: "",
            question_type: "Select Response Type",
            options: [],
            required: false,
            skip_logic: {
                logics: [],
                criteria: null
            }
        }
        copyQsestionset.splice(props.indx + 1, 0, { ...item })
        setQuestionset([...copyQsestionset])
        localStorage.setItem('createEdit', 'true')
    }


    const onCopy = () => {
        // let len = questionset.length
        let copyQsestionset = [...questionset]
        let tem_item = Object.assign({}, copyQsestionset[props.indx])
        let item = {
            label: tem_item.label,
            question_type: tem_item.question_type,
            options: [...tem_item.options],
            required: tem_item.required,
            skip_logic: {
                logics: [...tem_item.skip_logic.logics],
                criteria: tem_item.skip_logic.criteria
            }
        }
        copyQsestionset.splice(props.indx + 1, 0, { ...item })
        setQuestionset([...copyQsestionset])
        localStorage.setItem('createEdit', 'true')
    }

    const onDelete = () => {
        let copyQsestionset = [...questionset]
        copyQsestionset.splice(props.indx, 1)
        if (copyQsestionset.length == 0) {
            copyQsestionset.push(
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
            )
        }
        setQuestionset([...copyQsestionset])
        localStorage.setItem('createEdit', 'true')
        //only for antd modal
        toggleQdeleteAlert()
    }


    return (
        <div className="container QC">

            <Modal
                centered
                closable={false}
                className="deModR"
                visible={alertQdelete}
                footer={[
                    <div className="deWarningButtonC">
                        <Button className="closeButtonR" onClick={toggleQdeleteAlert} variant="outlined" >Cancel</Button>
                        <Button className="deButtonR" onClick={onDelete} variant="outlined" >Delete</Button>
                    </div>
                ]}
            >
                <div className="mb-5 ant-modal-title deTitle">
                    Confirm deletion
                </div>
                <p className="deWarning">
                    Are you sure you want to delete the question?
                </p>
            </Modal>

            <div
                id="wrapper"
                onMouseEnter={() => sethoverprop({ show_menu: true, border_color: 'blue' })}
                onMouseLeave={() => sethoverprop({ show_menu: false, border_color: '#c7c5c5' })}

            >
                <div style={{ border: `${hover_prop.border_color} 1px solid` }} className="mainQ">
                    <Input
                        id={`label_${props.indx}`}
                        value={qlabel}
                        className="inp"
                        onChange={onLabelChange}
                        placeholder="Question…"
                        disabled={!editable}
                    />
                    {!sw_sett ? <div>
                        <p className="mt">Response Type</p>

                        <Select
                            className="sl"
                            // defaultValue="so"
                            style={{ width: 190 }}
                            placeholder="Select Response Type"
                            defaultValue={qtype}
                            onChange={onTypeChange}
                            disabled={!editable}
                        >
                            <Option value="Select One"><img src={SO} height={20} width={20} className="imgOp" />Select One</Option>
                            <Option value="Select Many"><img src={SM} height={20} width={20} className="imgOp" />Select Many</Option>
                            <Option value="Number"><img src={NUM} height={20} width={20} className="imgOp" />Number</Option>
                            <Option value="Text"><div style={{ display: 'inline', fontWeight: 'bold', fontSize: 13 }} height={20} width={20} className="imgOp" >abc</div>Text</Option>
                            <Option value="photo"> <img src={PHOTO} height={20} width={20} className="imgOp" />Photo</Option>
                            <Option value="GPS"><img src={MAP} height={20} width={20} className="imgOp" />GPS</Option>
                        </Select>

                        {
                            (qtype === 'Select One' || qtype === 'Select Many') && <div className="op selectOne">
                                {
                                    props.options.map((opt, pos) => (
                                        <div key={`op_indx_${props.indx}_pos_${pos}`} className="In">
                                            <Input
                                                id={`op_indx_${props.indx}_pos_${pos}`}
                                                value={opt}
                                                onChange={(e) => onOptionChange(e, pos)}
                                                className="SelInput"
                                                disabled={!editable}
                                            />
                                            {editable && <CloseOutlined onClick={(e) => onOptionDelete(e, pos)} className="clIcon" />}
                                        </div>
                                    ))
                                }
                                <div className="abutton crtOp">
                                    {editable && <Button onClick={onOptionAdd} className="add_button" size="large" variant="outlined" startIcon={<PlusOutlined style={{ color: '#419FE2' }} />}>
                                        Create Another Option
                                </Button>}
                                </div>
                            </div>
                        }
                    </div>

                        :
                        <div className="skipCardMain">
                            <Card title="Settings" className="skipCard" extra={<CloseOutlined onClick={toggleSetting} className="clIcon" />}>
                                <div>
                                    <div>
                                        <span className="reText"> Required
                                <Switch checked={questionset[props.indx].required} onChange={onChangeRequired} className="reqSw" size='small' /> </span>
                                    </div>

                                    <div className="skp">
                                        <h4 className="reText">Skip Logic</h4>
                                        <p className="skipT2">This question will only be displayed if the following conditions apply</p>
                                    </div>

                                    <div className="selForm">
                                        <span>
                                            {
                                                questionset[props.indx].skip_logic.logics.map(
                                                    ([part1, part2, part3], ps) => (<ConditionComponent
                                                        questionset={questionset}
                                                        setQuestionset={setQuestionset}
                                                        part1={part1}
                                                        part2={part2}
                                                        part3={part3}
                                                        ps={ps}
                                                        indx={props.indx}
                                                    />)
                                                )
                                            }

                                        </span>
                                        <div className="abutton crtSkp">
                                            <Button onClick={onConditionAdd} className="add_button" size="large" variant="outlined" startIcon={<PlusOutlined style={{ color: '#419FE2' }} />}>
                                                {(questionset[props.indx].skip_logic.logics.length > 0) ? 'Add another' : 'Add condition'}
                                            </Button>
                                            {(questionset[props.indx].skip_logic.logics.length > 1) && <Select className="conSel" onChange={onCriteriaChange} placeholder="Criteria" defaultValue={questionset[props.indx].skip_logic.criteria || undefined } style={{ marginLeft: '1em' }} >
                                                <Option value='All of these conditions should match'>All of these conditions should match</Option>
                                                <Option value='Any one of these conditions should match'>Any one of these conditions should match</Option>
                                            </Select>}
                                        </div>

                                    </div>

                                </div>
                            </Card>
                        </div>}

                </div>
                {
                    editable && hover_prop.show_menu && <div className="sideMenu">
                        <div>
                            <div className="sideIcon">
                                <img onClick={onAdd} src={Add} height={15} width={15} />
                            </div>
                            <div className="sideIcon">
                                <img onClick={toggleSetting} src={Skip} height={15} width={15} />
                            </div>
                            <div className="sideIcon">
                                <img onClick={onCopy} src={Copy} height={15} width={15} />
                            </div>
                            <div className="sideIcon">
                                <img onClick={toggleQdeleteAlert} src={Delete} height={15} width={15} />
                            </div>
                        </div>
                    </div>
                }

            </div>

        </div>
    )
}

export default Question
