import axios from "axios"
import { useState } from "react"
import type { IQuestions } from "../model/Questions"
import { URL } from "../tools/utils"

const useQuestions = () => {
    const [adminAllQuestions, setAdminAllQuestions] = useState<IQuestions[] | null>(null)
    const [singleQuestion, setSingleQuestion] = useState<IQuestions | null>(null)
    const [userAllQuestions, setUserAllQuestions] = useState<IQuestions[] | null>(null)


    const getAllAdminQuestions = async () => {
        try {
            const response = await axios.get(`${URL}/studies/questions`, { withCredentials: true })
            setAdminAllQuestions(response.data)
        } catch (error) {
            console.error("Couldn't get all questions for admin", error)
            throw new Error();
        }
    }

    const getSingleQuestion = async (id: number) => {
        try {
            const response = await axios.get(`${URL}/studies/question/${id}`, { withCredentials: true });
            setSingleQuestion(response.data);
        } catch (error) {
            console.error(`Couldn't get question with the id of ${id} `, error);
            throw new Error();
        }
    }

    const getQuestionsByUser = async () => {
        try {
            const response = await axios.get(`${URL}/studies/questions/me`, { withCredentials: true });
            setUserAllQuestions(response.data);
        } catch (error) {
            console.error("Couldn't get all your questions.", error)
            throw new Error();
        }
    }

    const deleteQuestionById = async (id: number) => {
        try {
            return await axios.delete(`${URL}/studies/question/${id}`, { withCredentials: true })
        } catch (error) {
            console.error(`Couldn't delete question with the id of ${id}`, error)
            throw new Error();
        }
    }


    return { getAllAdminQuestions, getSingleQuestion, getQuestionsByUser, deleteQuestionById, adminAllQuestions, singleQuestion, userAllQuestions }
}

export default useQuestions
