import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Locadora from './pages/locadora';
import Tecnologias from './pages/tecnologias';
import Servicos from "./pages/servicos";
import logo from "./assets/images/logo.png";
import fotok from "./assets/images/kevin.png";
import fotof from "./assets/images/fernanda.png";
import fotog from "./assets/images/maia.png";
import fotod from "./assets/images/david.jpeg";
import arcadegif from "./assets/images/arcadegif.gif";
import arcadestatic from "./assets/images/arcadestatic.png";
import carrinhoarcadegif from "./assets/images/carrinhoarcadegif.gif";

function Header() {
	const navigate = useNavigate();

	const goHome = () => {
		navigate('/');
	};

	return (
		<header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/10">
			<div className="mx-auto px-6 py-4 flex items-center justify-between">

				{/* Logo */}
				<div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
					<img src={logo} alt="logo" className="w-10 h-10 object-contain" />
					<span className="text-white font-mono font-bold text-xl">Old Store Media</span>
				</div>



				{/* Botão de Ação */}
				<button
					onClick={() => navigate('/locadora')}
					className="bg-linear-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition cursor-pointer" 
				>
					Entrar
				</button>

			</div>
			{/* Menu Central */}
			<nav className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-8">
				<button
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className="text-gray-300 hover:text-white transition cursor-pointer"
				>
					Home
				</button>
				<button
					onClick={() => navigate('/tecnologias')}
					className="text-gray-300 hover:text-white transition cursor-pointer"
				>
					Tecnologias
				</button>
				<button
					onClick={() => window.scrollTo({ top: 2000, behavior: 'smooth' })}
					className="text-gray-300 hover:text-white transition cursor-pointer"
				>
					Equipe
				</button>
			</nav>
		</header>
	);
}

function Home() {
	const navigate = useNavigate();
	const [isPaused, setIsPaused] = React.useState(false);

	const toggleAnimation = () => {
		setIsPaused(!isPaused);
	};

	const entrar = () => {
		navigate('/locadora');
	};

	const tecnologias = () => {
		navigate('/tecnologias');
	};

	return (
		<>
			<Header />
			<main className="flex flex-col">

				{/* Wrapper com posição relativa */}
				<div
					className="min-h-screen flex flex-col items-center justify-center p-6 relative cursor-pointer"
					onClick={toggleAnimation}
					style={{
						backgroundImage: isPaused
							? `url(${arcadestatic})`
							: `url(${arcadegif})`,
						backgroundSize: 'contain',
						backgroundPosition: 'top center',
						backgroundRepeat: 'repeat-x',
						filter: isPaused ? 'grayscale(30%)' : 'none'
					}}
				>

					{/* Logo */}
					<div className="relative z-10 flex flex-col items-center justify-center gap-10 px-4">

						{/* Janela Windows 7 Aero Glass estilo arcade */}
						<div className="w-full max-w-3xl backdrop-blur-xl bg-black/40 rounded-lg shadow-2xl border-2 border-pink-500/30 overflow-hidden hover:border-pink-500/60 transition-all">

							{/* Barra de título com gradiente neon */}
							<div
								className="px-4 py-3 flex items-center justify-between border-b border-pink-500/30"
								style={{
									background: 'linear-gradient(to bottom, rgba(255,0,110,0.3), rgba(131,56,236,0.3))',
									boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
								}}
							>
								<div className="flex items-center gap-3">
									<div className="text-2xl filter drop-shadow-lg"></div>
									<span className="text-white font-mono font-bold text-sm drop-shadow-lg">
										Old Store Media - Sistema v2.0
									</span>
								</div>

								{/* Botões Windows 7 */}
								<div className="flex gap-1">
									<button className="w-8 h-6 bg-linear-to-b from-gray-700/80 to-gray-800/80 hover:from-gray-600/80 hover:to-gray-700/80 backdrop-blur-sm border border-gray-600/50 flex items-center justify-center transition">
										<span className="text-white text-xs font-bold">─</span>
									</button>
									<button className="w-8 h-6 bg-linear-to-b from-gray-700/80 to-gray-800/80 hover:from-gray-600/80 hover:to-gray-700/80 backdrop-blur-sm border border-gray-600/50 flex items-center justify-center transition">
										<span className="text-white text-xs font-bold">□</span>
									</button>
									<button className="w-8 h-6 bg-linear-to-b from-red-600/80 to-red-700/80 hover:from-red-500/80 hover:to-red-600/80 backdrop-blur-sm border border-red-500/50 flex items-center justify-center transition">
										<span className="text-white text-xs font-bold">✕</span>
									</button>
								</div>
							</div>

							{/* Conteúdo com efeito de vidro */}
							<div className="p-10">
								<div
									className="border-2 border-pink-500/40 rounded-lg p-8 relative overflow-hidden"
									style={{
										background: 'linear-gradient(135deg, rgba(255,0,110,0.1), rgba(131,56,236,0.1))',
										boxShadow: 'inset 0 0 40px rgba(255,0,110,0.2), 0 0 20px rgba(131,56,236,0.3)'
									}}
								>
									{/* Efeito de brilho animado */}
									<div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-pink-500 to-transparent opacity-50 animate-pulse"></div>

									<p
										className="text-white font-mono text-xl leading-relaxed text-center relative z-10"
										style={{ textShadow: '0 0 15px #ff006e, 0 0 30px #8338ec' }}
									>
										Sistema desenvolvido para gerenciar a locação de mídias, facilitando o controle e a organização das operações diárias.
									</p>
								</div>


							</div>
						</div>

					</div>

					{/* Indicador visual - abaixo da logo do header à esquerda */}
					{isPaused && (
						<div className="fixed top-20 left-6 text-xs bg-red-600/40 text-white px-3 py-1 rounded-full animate-pulse pointer-events-none backdrop-blur-sm z-50">
							Pausado
						</div>
					)}

					{!isPaused && (
						<div className="fixed top-20 left-6 bg-purple-600/30 text-white px-3 py-1 rounded-full text-xs pointer-events-none backdrop-blur-sm z-50">
							Clique para pausar
						</div>
					)}
					{/* setas animadas indicando continuidade do site para baixo */}
					<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none">
						<div
							className="text-pink-500 text-3xl animate-bounce font-bold"
							style={{
								textShadow: '0 0 10px #ff006e, 0 0 20px #ff006e',
								animationDelay: '0s'
							}}
						>
							▼
						</div>
						<div
							className="text-purple-500 text-3xl animate-bounce font-bold"
							style={{
								textShadow: '0 0 10px #8338ec, 0 0 20px #8338ec',
								animationDelay: '0.2s'
							}}
						>
							▼
						</div>
						<div
							className="text-blue-500 text-3xl animate-bounce font-bold"
							style={{
								textShadow: '0 0 10px #3b82f6, 0 0 20px #3b82f6',
								animationDelay: '0.4s'
							}}
						>
							▼
						</div>
					</div>
				</div>

				<Servicos />

				{/* Seção Equipe */}
				<section id="equipe" className="relative">
					{/* Fundo arcade separado */}
					<div
						className="absolute inset-0 brightness-30 saturate-150 bg-cover bg-center"
						style={{
							backgroundImage: `url(${carrinhoarcadegif})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center bottom',
							backgroundRepeat: 'no-repeat',
							boxShadow: 'inset 0 0 80px rgba(255, 0, 110, 0.4)'
						}}
					></div>

					{/* Conteúdo com z-index pra ficar por cima */}
					<div className="relative z-10 py-10">
						<div className="max-w-7xl mx-auto px-6">
							<h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">
								Equipe
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
								<div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform">
									<img className="rounded-full w-30 h-30 object-cover mb-4" src={fotof} alt="Fernanda" />
									<h3 className="text-xl font-semibold mb-2">Fernanda Martins</h3>
									<p className="text-gray-600 text-center">Desenvolvedora Backend</p>
								</div>
								<div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform">
									<img className="rounded-full w-30 h-30 object-cover mb-4" src={fotog} alt="Maia" />
									<h3 className="text-xl font-semibold mb-2">Gabriel Maia</h3>
									<p className="text-gray-600 text-center">Desenvolvedor FullStack</p>
								</div>
								<div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform">
									<img className="rounded-full w-30 h-30 object-cover mb-4" src={fotok} alt="Kevin" />
									<h3 className="text-xl font-semibold mb-2">Kevin Zili</h3>
									<p className="text-gray-600 text-center">Desenvolvedor Frontend</p>
								</div>
								<div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-6 flex flex-col items-center hover:scale-105 transition-transform">
									<img className="rounded-full w-30 h-30 object-cover mb-4" src={fotod} alt="David" />
									<h3 className="text-xl font-semibold mb-2">David Buzatto</h3>
									<p className="text-gray-600 text-center">Gerente de Projetos</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/locadora" element={<Locadora />} />
			<Route path="/tecnologias" element={<Tecnologias />} />
		</Routes>
	);
}

export default App;