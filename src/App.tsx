import './App.css'
import './index.css'
import DefaultFooter from "./components/containers/DefaultFooter.tsx";
import {Route, Routes} from "react-router-dom";
import LoginPage from "./components/auth/LoginPage.tsx";
import RegisterPage from "./components/auth/RegisterPage.tsx";
import DefaultHeader from "./components/containers/DefaultHeader.tsx";
import AnimatedCursor from "react-animated-cursor";
import MemoriesPage from "./components/memories/MemoriesPage.tsx";
import AddMemory from "./components/memories/AddMemory.tsx";
import {useAppSelector} from "./hooks/redux";
import AdminPage from "./components/admin/AdminPage.tsx";
import BoardPage from "./components/memories/BoardPage.tsx";
import ShowMemory from "./components/memories/ShowMemory.tsx";
import EditMemory from "./components/memories/EditMemory.tsx";


function App() {
    const {isLogin, isAdmin, user} = useAppSelector(state => state.account);

    return (
        <>

            <DefaultHeader/>
            <Routes>
                <Route index element={<MemoriesPage/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
                <Route path="board/:Id" element={<BoardPage/>}/>
                <Route path="viewMemory/:Id" element={<ShowMemory/>}/>
                <Route path="editMemory/:Id" element={<EditMemory/>}/>
                {isAdmin ?
                    (<Route path="admin" element={<AdminPage/>}/>) : null}
                {isLogin ?
                    (<Route path="add" element={<AddMemory/>}/>) : null}


            </Routes>
            <DefaultFooter/>


        </>
    )
}

export default App