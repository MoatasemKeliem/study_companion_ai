import { useState, type FormEvent } from "react"
import type { IGenerateFlashcard } from "../model/Genereate"
import useGenerate from "../hooks/useGenerate"
import { useNavigate } from "react-router-dom"

const GenerateFlashcardComponent = () => {
    const [flashcard, setFlashcard] = useState<IGenerateFlashcard>({
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
    const { generateFlashcard } = useGenerate()
    const navigate = useNavigate()


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await generateFlashcard(flashcard)
            navigate("/myFlashcards")
        } catch (error) {
            console.error("Couldn't get contact with API", error)
        }
    }

    return (
        <div id="generatePage">
            <form onSubmit={handleSubmit} id="generateFlashcard">
                <label>What do want to create flashcard about? <br />
                    <input type="text" name="content" value={flashcard.content} onChange={(e) => { setFlashcard({ ...flashcard, content: e.target.value }) }} />
                </label><br />
                <button type="submit">Generate Flashcard</button>
            </form>
        </div>
    )
}

export default GenerateFlashcardComponent
