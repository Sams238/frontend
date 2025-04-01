import React, { useState } from "react";

export default function App() {
  const [sinal, setSinal] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [temaEscuro, setTemaEscuro] = useState(true);

  const solicitarSinal = async () => {
    setCarregando(true);
    setErro(null);
    setSinal(null);
    try {
      const response = await fetch("https://backend-hjau.onrender.com/api/sinal-bacbo");
      const data = await response.json();
      setSinal(data);
    } catch (e) {
      setErro("Erro ao obter sinal. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className={`${temaEscuro ? "bg-black text-white" : "bg-white text-black"} min-h-screen flex flex-col items-center justify-center transition-colors duration-300`}>
      <button
        onClick={() => setTemaEscuro(!temaEscuro)}
        className="absolute top-4 right-4 text-xl p-2"
      >
        {temaEscuro ? "☀️" : "🌙"}
      </button>

      <h1 className="text-3xl font-bold mb-6">Painel Bac Bo XPTO</h1>

      <button
        onClick={solicitarSinal}
        disabled={carregando}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all"
      >
        🚀 {carregando ? "Analisando..." : "Solicitar Sinal"}
      </button>

      {erro && <p className="text-red-500 mt-4">{erro}</p>}

      {sinal && (
        <div className="mt-8 p-6 border rounded-xl shadow-md bg-opacity-10 bg-white backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-2">🟢 ENTRADA CONFIRMADA</h2>
          <p>🚀 Entrar na cor <strong>{sinal.entrada}</strong></p>
          <p>⚔️ Proteger o <strong>{sinal.protecao}</strong></p>
          <p>⏱️ Validade do sinal: {sinal.validade} segundos</p>
          <p>{sinal.resultado === "green" ? "🟢 GREEN" : "🔴 RED"}</p>
        </div>
      )}
    </div>
  );
}
