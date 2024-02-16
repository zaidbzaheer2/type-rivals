import "./App.css";
import { Header, Hero, ThemeSwitch } from "../components";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
function App() {
  const {theme} = useContext(ThemeContext)
  const dynamicClass = `theme-${theme} bg-skin-body w-full h-screen pb-[5rem]`;
  return (
    <div className={dynamicClass}>
      <Header />
      <ThemeSwitch/>
      <Hero />
    </div>
  );
}

export default App;
