import { useState , useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import PieForm from "./scenes/form/pieDataForm";
import BarForm from "./scenes/form/barDataForm";
import Line from "./scenes/line";
import LineForm from './scenes/form/lineForm'
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import SignupPage from "./components/Signup";
import SigninPage from "./components/Signin";
import WelcomePage from "./scenes/dashboard/welcome";
import { useContext } from "react";
import {AuthContext} from './context/AuthContext';
import SendMessage from '../src/scenes/form/sendMessage'
import Reports from "./scenes/reports";

function App() {
  const { username , isAdmin} = useContext(AuthContext);
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              {username && isAdmin && <Route path="/" element={<Dashboard />} />}
              {username && !isAdmin && <Route path="/" element={<WelcomePage  />} />}
              <Route path="/signup" element={<SignupPage/>} />
              <Route path="/signin" element={<SigninPage/>} />
              <Route path="/reports" element={<Reports/>} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form/>} />
              <Route path="/pieform" element={<PieForm/>} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/barform" element={<BarForm/>}/>
              <Route path="/lineform" element={<LineForm/>}/>
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/sendmsg" element={<SendMessage/>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
