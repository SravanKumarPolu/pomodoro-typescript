import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TimerProvider } from "./components/TimerContext";
import { SoundProvider } from "./components/SoundContext";
import { ColorProvider } from "./components/ColorContex";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorProvider>
      <TimerProvider>
        <SoundProvider>
          <App />
        </SoundProvider>
      </TimerProvider>
    </ColorProvider>
  </React.StrictMode>
);
