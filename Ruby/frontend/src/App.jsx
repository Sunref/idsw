import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Locadora from './pages/locadora';
import Paginateste from './pages/paginateste';
import logo from "./assets/images/logo.png";
import fotok from "./assets/images/kevin.png";
import fotof from "./assets/images/fernanda.png";
import fotog from "./assets/images/maia.png";
import fotod from "./assets/images/david.jpeg";

function Home() {
	const navigate = useNavigate();

	const entrar = () => {
		navigate('/locadora');
	};

	const paginateste = () => {
		navigate('/paginateste');
	};

	return (
		<div class="bg-linear-120 from-black to-blue-800 min-h-screen flex flex-col items-center justify-center p-6">
			{/* LOGO */}
			<div class="rounded-2 flex h-100 w-100 flex-col overflow-hidden bg-none items-center justify-center gap-10">

				<img class="content-center flex h-50 w-auto  hover:animate-pulse transition" src={logo} alt="logo">
				</img>

				{/* Botão Entrar */}
				<button
					class="bg-blue-600 text-white px-8 py-2 rounded font-mono font-bold text-xl hover:bg-blue-700 transition hover:scale-105"
					onClick={entrar}
				>
					Entrar
				</button>

				<button
					class="bg-blue-600 text-white px-8 py-2 rounded font-mono font-bold text-xl hover:bg-blue-700 transition hover:scale-105"
					onClick={paginateste}
				>
					paginateste
				</button>

			</div>

			{/* Subtítulo */}
			<div class="max-w-xl text-center mt-4 font-mono font-bold text-white text-lg">
				Sistema desenvolvido para gerenciar a locação de midias, facilitando o controle e a organização das operações diárias.
			</div>

			{/* Bolas com imagens */}
			<div class="flex space-x-4 mt-6">
				<div class="h-24 w-24 rounded-full bg-blue-500 flex items-center justify-center hover:scale-110 transition-transform">
					<img class="rounded-full w-24 h-24 object-cover hover:scale-110 transition-transform" src={fotof} alt="foto fernanda" />
				</div>
				<div class="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition-transform">
					<img class="rounded-full w-24 h-24 object-cover hover:scale-110 transition-transform" src={fotog} alt="foto maia" />
				</div>
				<div class="h-24 w-24 rounded-full bg-red-500 flex items-center justify-center hover:scale-110 transition-transform">
					<img class="rounded-full w-24 h-24 object-cover hover:scale-110 transition-transform" src={fotok} alt="foto kevin" />
				</div>
			</div>
		</div>
	);
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/locadora" element={<Locadora />} />
	  <Route path="/paginateste" element={<Paginateste />} />
    </Routes>
  );
}

export default App;