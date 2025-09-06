import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { AuthProvider } from '../context/AuthContext'
import Footer from './Footer'

const Layout = () => {
    return (
        <AuthProvider>
            <div>
                <header><Navbar /></header>
                <main><Outlet /></main>
                <footer><Footer /></footer>
            </div>
        </AuthProvider>

    )
}

export default Layout
