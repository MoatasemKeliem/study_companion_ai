import { useState, type ChangeEvent, type FormEvent } from "react"
import useGenerate from "../hooks/useGenerate"
import type { IGenerateSummary } from "../model/Genereate";
import { useNavigate } from "react-router-dom";
import "../style/generate.css"

const GenerateSummaryComponent = () => {
    const { generateSummary } = useGenerate()
    const [summary, setSummary] = useState<IGenerateSummary>({
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
    });

    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setSummary(prev => ({ ...prev, content: e.target.value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await generateSummary(summary);
            navigate("/mySummaries");
        } catch (error) {
            console.error("Something went wrong");
        }

    }


    return (
        <div id="generatePage">
            <h2>Generate Summary</h2>
            <form onSubmit={handleSubmit} id="generateForm">
                <label htmlFor="">What would you like to study <br />
                    <input type="text" onChange={handleChange} value={summary.content} name="content" /><br />
                </label>
                <button type="submit">Generate Summary</button>
            </form>
        </div>
    )
}

export default GenerateSummaryComponent
