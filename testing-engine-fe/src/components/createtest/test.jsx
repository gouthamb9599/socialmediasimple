import React, { useEffect } from 'react';
import Axios from 'axios';
import './test.css';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import swal from 'sweetalert';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});




function Test() {
    // const [open, setOpen] = React.useState(false);
    const [Subject, setSubject] = React.useState(0);
    const [Questiontem1, setQuestiontem1] = React.useState('');
    const [Answertem1, setAnswertem1] = React.useState('');
    const [Option1tem1, setOption1tem1] = React.useState('');
    const [Questionarray, setQuestionarray] = React.useState([]);
    const [Answerarray, setAnswerarray] = React.useState([]);
    const [Option1array, setOption1array] = React.useState([]);
    const [Subjectarray, setSubjectarray] = React.useState([]);
    const [Newques, setNewques] = React.useState(true);


    useEffect(() => {
        Axios.get(`http://localhost:5000/admin/getsubject`)
            .then(res => {
                console.log(res.data.data);
                setSubjectarray(res.data.data);

            })
    }, [])

    const handlequestion1 = () => {
        console.log(Questiontem1, Answertem1, Option1tem1);
        setQuestionarray(Questionarray => [...Questionarray, Questiontem1]);
        setAnswerarray(Answerarray => [...Answerarray, Answertem1]);
        setOption1array(Option1array => [...Option1array, Option1tem1]);
        console.log(Questionarray, Answerarray, Option1array);
        setAnswertem1('');
        setQuestiontem1('');
        setOption1tem1('');
    }


    const cancelquestion1 = () => {
        setAnswertem1("");
        setQuestiontem1("");
        setOption1tem1("");
    }

    const submittest = () => {
        console.log(Questionarray, Answerarray, Option1array);
        var user = JSON.parse(localStorage.getItem('teacher'));
        Axios.post(`http://localhost:5000/teacher/createtest`, { teacher: user.id, subject: Subject, Question: Questionarray, Answer: Answerarray, Option: Option1array })
            .then(res => {
                console.log(res);
                if (res.data.success === true) {
                    swal('Test is Created', 'admin will allocate the students with subject', "success");
                }
            })

    }
    const canceltest = () => {
        setQuestionarray(Questionarray => [...Questionarray, ""])
        setAnswerarray(Answerarray => [...Answerarray, ""])
        setOption1array(Option1array => [...Option1array, ""])
    }
    const handleChange = (event) => {
        setSubject(event.target.value);
    };
    const handleQChange1 = (event) => {
        setQuestiontem1(event.target.value);
    }
    const handleAChange1 = (event) => {
        setAnswertem1(event.target.value);
    }
    const handle1Change1 = (event) => {
        setOption1tem1(event.target.value);
    }


    const addques = () => {
        setNewques(true);
        console.log(Newques);
        let rows = [];
        while (Newques === true) {
            rows.push(
                <div>
                    <textarea name="questionhead" cols="30" rows="2" placeholder="Question"></textarea>
                    <textarea name="answer" cols="20" rows="2" placeholder="Answer" />
                    <textarea name="option" cols="20" rows="2" placeholder="option" />
                    <Button color="secondary">Submit Question</Button>
                    <Button color="secondary">Cancel</Button>
                </div>)
        }
        setNewques(false);
        console.log(Newques);
        return rows;
    }

    return (
        <div className="testframe">
            <h3 className="testhead">CREATE TEST</h3>
            <div>
                <h5>Choose Subject</h5><Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Subject}
                    onChange={handleChange}
                >
                    {Subjectarray.map((data) =>
                        (<MenuItem value={data.subject_id}>{data.subject_name}</MenuItem>))
                    }
                </Select>
            </div>
            <div>
                <div>
                    <textarea name="questionhead" cols="30" rows="2" onChange={handleQChange1} value={Questiontem1} placeholder="Question" />
                    <textarea name="answer" cols="20" rows="2" onChange={handleAChange1} value={Answertem1} placeholder="Answer" />
                    <textarea name="option" cols="20" rows="2" onChange={handle1Change1} value={Option1tem1} placeholder="option" />
                </div>
                <div>
                    <Button onClick={handlequestion1} color="secondary">Submit Question</Button>
                    <Button onClick={cancelquestion1} color="secondary">Cancel</Button>
                </div>
            </div>
            <div>
                <Button onClick={submittest} color="primary">Submit Test</Button>
                <Button onClick={canceltest} color="primary">Cancel </Button>
            </div>
        </div >
    );
}
export default Test;