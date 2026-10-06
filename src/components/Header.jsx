import MoonIcon from "./MoonIcon.jsx";
import SunIcon from "./SunIcon.jsx";

export default function Header({ themeMode = "light", toggleTheme }) {
    return (
        <header>
            <h1>CV Application</h1>
            <button className="clickable" onClick={toggleTheme}>
                {themeMode === "light" ?
                    <SunIcon /> :
                    <MoonIcon />
                }
            </button>
        </header>
    );
}