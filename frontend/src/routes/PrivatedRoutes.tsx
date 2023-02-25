import { BrowserRouter , Route, Routes } from "react-router-dom";
import { Checks } from "../pages/Checks/Checks";
import { Login } from "../pages/Login/Login";
import { PontoIlumeo } from "../pages/PontoIlumeo/PontoIlumeo";

export default function PrivatedRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/pontoilumeo" element={<PontoIlumeo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checks" element={<Checks />} />
                <Route path="/*" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}