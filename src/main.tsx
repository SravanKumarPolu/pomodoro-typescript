import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TimerProvider } from "./components/TimerContext";
import { SoundProvider } from "./components/SoundContext";
import { ColorProvider } from "./components/ColorContex";
import { DarkModeProvider } from "./components/DarkModeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DarkModeProvider>
      <ColorProvider>
        <TimerProvider>
          <SoundProvider>
            <App />
          </SoundProvider>
        </TimerProvider>
      </ColorProvider>
    </DarkModeProvider>
  </React.StrictMode>
);
