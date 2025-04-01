import { useState } from "react";

const App = () => {
  const [sinal, setSinal] = useState(null);

  const solicitarSinal = async () => {
    try {
      const resposta = await fetch("https://backend-hjau.onrender.com/api/sinal-bacbo");
      const dados = await resposta.json();
      setSinal(dados);
    } catch (erro) {
      console.error("Erro ao solicitar sinal:", erro);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">Painel Bac Bo XPTO</h1>
      <button
        onClick={solicitarSinal}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-white font-semibold"
      >
        🚀 Solicitar Sinal
      </button>

      {sinal && (
        <div className="mt-8 text-center">
          <p className="text-green-400 text-xl font-bold">{sinal.mensagem}</p>
          <p className="mt-2 text-lg">Entrar na cor: <span className="text-blue-300">{sinal.entrada}</span></p>
          <p className="mt-1 text-lg">⚔️ Proteger o empate: <span className="text-yellow-400">{sinal.proteger}</span></p>
          <p className="mt-1 text-sm">Validade do sinal: {sinal.validade} segundos</p>
        </div>
      )}
    </div>
  );
};

export default App;
