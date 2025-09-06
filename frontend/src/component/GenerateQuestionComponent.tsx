import { useState, type ChangeEvent, type FormEvent } from "react"
import type { IGenerateQuestion } from "../model/Genereate"
import { useNavigate } from "react-router-dom"
import useGenerate from "../hooks/useGenerate"

const GenerateQuestionComponent = () => {
    const [question, setQuestion] = useState<IGenerateQuestion>({
        id: 0,
        content: "",
        user: {
            id: 0,
            name: "",
            email: "",
            password: null,
            role: "",
        },
        createdAt: ""
    })
    const navigate = useNavigate()
    const { generateQuestion } = useGenerate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuestion(prev => ({ ...prev, content: e.target.value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await generateQuestion(question)
            navigate("/myQuestions")
        } catch (error) {
            console.error("Couldn't connect with API ", error)
            throw new Error();
        }
    }

    return (
        <div id="generatePage">
            <h2>Generate Question</h2>
            <form onSubmit={handleSubmit} id="generateQuestion">
                <label>What would you like to generate questions about <br />
                    <input type="text" name="content" value={question.content} onChange={handleChange} />
                    <br />
                </label>
                <button type="submit">Generate Questions</button>
            </form>
        </div>
    )
}

export default GenerateQuestionComponent
