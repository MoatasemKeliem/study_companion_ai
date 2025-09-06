import type { IGenerateFlashcard, IGenerateQuestion, IGenerateSummary } from "../model/Genereate"
import axios from "axios"
import { URL } from "../tools/utils"

const useGenerate = () => {


    const generateSummary = async (payload: IGenerateSummary) => {
        try {
            await axios.post(`${URL}/generate/generateSummary`, payload, { withCredentials: true })
        } catch (error) {
            console.error("Couldn't generate summary", error)
            throw new Error();
        }
    }

    const generateFlashcard = async (payload: IGenerateFlashcard) => {
        try {
            await axios.post(`${URL}/generate/generateFlashcards`, payload, { withCredentials: true })
        } catch (error) {
            console.error("Couldn't generate flashcard", error)
            throw new Error();
        }
    }

    const generateQuestion = async (payload: IGenerateQuestion) => {
        try {
            await axios.post(`${URL}/generate/generateQuestions`, payload, { withCredentials: true })
        } catch (error) {
            console.error("Couldn't generate question", error)
            throw new Error();
        }
    }


    return { generateSummary, generateFlashcard, generateQuestion }
}

export default useGenerate
