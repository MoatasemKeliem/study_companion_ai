import { useEffect, useState } from "react"
import useQuestions from "../hooks/useQuestions"
// import { Link } from "react-router-dom"
import { formatContent } from "../tools/FormatContent"
import "../style/flashcards.css"

const UserQuestion = () => {
    const { getQuestionsByUser, userAllQuestions, deleteQuestionById } = useQuestions()
    const [showAnswer, setShowAnswer] = useState<{ [key: number]: boolean }>({})

    useEffect(() => {
        getQuestionsByUser()
    }, [])

    const toggleShow = (id: number) => {
        setShowAnswer(prev => ({
            ...prev, [id]: !prev[id]
        }))
    }

    return (
        <div id="contentPageFlashcardQuestions">
            {
                userAllQuestions ?
                    userAllQuestions.map((item) => {
                        return (
                            <div key={item.id} className="contentFlashcardQuestions">
                                <h2>{item.question}</h2>
                                {showAnswer[item.id] ?
                                    <div className="textFlashcardQuestions ">{formatContent(item.rightAnswer)}
                                        <br /> <button className="buttonsQuestion" onClick={() => { toggleShow(item.id) }}>Hide Answer</button>
                                    </div>
                                    :
                                    <button className="buttonsQuestion" onClick={() => { toggleShow(item.id) }}>Show answer</button>}
                                <p>Created At : {item.createdAt.slice(0, 10)} by {item.user.name}</p>
                                <button className="buttonsQuestion" onClick={() => {
                                    deleteQuestionById(item.id).then(() => getQuestionsByUser())
                                }}>Delete Question</button>
                                {/* <Link to={`/singleQuestion/${item.id}`}><button>View Question</button></Link> */}
                            </div>
                        )
                    })
                    : <h2>There is no questions</h2>
            }
        </div>
    )
}

export default UserQuestion
