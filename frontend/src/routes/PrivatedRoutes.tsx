import { BrowserRouter , Route, Routes } from "react-router-dom";
import { PontoIlumeo } from "../pages/PontoIlumeo/PontoIlumeo";


export default function PrivatedRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/pontoilumeo" element={<PontoIlumeo />} />
            </Routes>
        </BrowserRouter>
    )
}