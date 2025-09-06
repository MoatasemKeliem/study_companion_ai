import { useEffect, useState } from 'react'
import useQuestions from '../hooks/useQuestions'
import { formatContent } from '../tools/FormatContent'
// import { Link } from 'react-router-dom'

const AdminGetAllQuestions = () => {
    const { getAllAdminQuestions, adminAllQuestions, deleteQuestionById } = useQuestions()
    const [showAnswer, setShowAnswer] = useState<{ [key: number]: boolean }>({})


    useEffect(() => {
        getAllAdminQuestions()
    }, [])

    const toggleShow = (id: number) => {
        setShowAnswer(prev => ({
            ...prev, [id]: !prev[id]
        }))
    }

    return (
        <div id='contentPageFlashcardQuestions'>
            {adminAllQuestions ? adminAllQuestions.map((item) => {
                return (
                    <div key={item.id} className='contentFlashcardQuestions'>
                        <h2>{item.question}</h2>
                        {showAnswer[item.id] ?
                            <div className='textFlashcardQuestions'>{formatContent(item.rightAnswer)}
                                <br /> <button className="buttonsQuestion" onClick={() => { toggleShow(item.id) }}>Hide Answer</button>
                            </div>
                            :
                            <button className="buttonsQuestion" onClick={() => { toggleShow(item.id) }}>Show answer</button>}
                        <p>Created At : {item.createdAt.slice(0, 10)} by {item.user.name}</p>
                        <button className="buttonsQuestion" onClick={() => { deleteQuestionById(item.id).then(() => getAllAdminQuestions()) }}>Delete Question</button>
                        {/* <Link to={`/singleQuestion/${item.id}`}><button>View Question</button></Link> */}
                    </div>
                )
            }) : <h2>There is no questions</h2>}
        </div>
    )
}

export default AdminGetAllQuestions
