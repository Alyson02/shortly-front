import { Route, Router, Routes, BrowserRouter } from "react-router-dom";
import Header from "./Components/header/Header.js";
import Linkpage from "./Components/Linkpage/Linkpage.js";
import Loginpage from "./Components/Loginpage/Loginpage.js";
import Ranking from "./Components/Ranking/Ranking.js";
import SignupPage from "./Components/SignupPage/SignupPage.js";
import { AuthProvider } from "./context/AuthProvaider/Index.js";



export default function App() {
        return(
            <AuthProvider>       
                <BrowserRouter>
                    <Routes>
                    <Route element={<Loginpage/>} path="/" exact/>
                    <Route path="/Signin" element={<SignupPage/>}/>
                    <Route path="/Links" element={<Linkpage/>}/>
                    <Route path="/Ranking" element={<Ranking/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>

        )    
}