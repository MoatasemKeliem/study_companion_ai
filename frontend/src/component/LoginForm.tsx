import axios from "axios"
import { useState, type FormEvent } from "react"
import { URL } from "../tools/utils"
import { useNavigate } from "react-router-dom"
import "../style/account.css"

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            await axios.post(`${URL}/auth/login`, { email, password }, { withCredentials: true })
            navigate("/myPage")
            location.reload()
        } catch (error) {
            console.error("Something went wrong ", error)
            throw new Error();
        }
    }


    return (
        <div className="page">
            <form onSubmit={handleSubmit} className="formLogin">
                <label htmlFor="">Email <br />
                    <input type="email" value={email} name="email" onChange={(e) => { setEmail(e.target.value) }} />
                </label><br />
                <label htmlFor="">Password <br />
                    <input type="password" value={password} name="password" onChange={(e) => { setPassword(e.target.value) }} />
                </label><br />
                <button type='submit'>Sign in</button>
            </form>
        </div>
    )
}

export default LoginForm
