
import { useState } from "react";
import "./index.css";

function App() {
  const [sinal, setSinal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const solicitarSinal = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://backend-hjau.onrender.com/api/sinal-bacbo");
      const data = await res.json();
      setSinal(data);
    } catch (err) {
      setSinal({ erro: "Erro ao obter sinal." });
    }
    setLoading(false);
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <div className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌙" : "☀️"}
      </div>
      <h1>Painel Bac Bo XPTO</h1>
      <button className="sinal-btn" onClick={solicitarSinal} disabled={loading}>
        🚀 {loading ? "Analisando..." : "Solicitar Sinal"}
      </button>

      {sinal && (
        <div className="sinal-info">
          {sinal.erro ? (
            <p className="erro">{sinal.erro}</p>
          ) : (
            <>
              <p className="entrada">
                🟢 ENTRADA CONFIRMADA<br />
                🚀 Entrar na cor <span>{sinal.entrada}</span><br />
                ⚔️ Proteger o <span>{sinal.protecao}</span>
              </p>
              <p className="validade">⏱ Validade: {sinal.validade} segundos</p>
              <p className={`resultado ${sinal.resultado.toLowerCase()}`}>
                Resultado: {sinal.resultado === "GREEN" ? "🟢 GREEN" : "🔴 RED"}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
