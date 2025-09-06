import { useState, type FormEvent } from "react"
import type { RegisterUser } from "../model/UserModel"
import axios from "axios"
import { URL } from "../tools/utils"
import { useNavigate } from "react-router-dom"
import "../style/account.css"

const RegisterForm = () => {
    const [userRegister, setUserRegister] = useState<RegisterUser>({
        name: "",
        email: "",
        password: "",
        role: "USER"
    })
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        try {
            await axios.post(`${URL}/auth/register`, userRegister, { withCredentials: true })
            navigate("/login")
        } catch (error) {
            console.error("Cannot register user", error)
            throw new Error();
        }
    }

    return (
        <div className="page">
            <form onSubmit={handleSubmit} className="form">
                <label htmlFor="">Name <br />
                    <input type="text" name="name" value={userRegister.name} onChange={(e) => setUserRegister({ ...userRegister, name: e.target.value })} />
                </label><br />
                <label htmlFor="">Email <br />
                    <input type="email" name="email" value={userRegister.email} onChange={(e) => setUserRegister({ ...userRegister, email: e.target.value })} />
                </label><br />
                <label htmlFor="">Password <br />
                    <input type="password" name="password" value={userRegister.password} onChange={(e) => setUserRegister({ ...userRegister, password: e.target.value })} />
                </label><br />
                <select name="role" id="" value={userRegister.role} onChange={(e) => setUserRegister({ ...userRegister, role: e.target.value as "USER" | "ADMIN" })}>
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select><br />
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default RegisterForm
