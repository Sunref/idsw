import React from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Locadora from './pages/locadora';
import Paginateste from './pages/paginateste';
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
			<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

				{/* Logo */}
				<div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
					<img src={logo} alt="logo" className="w-10 h-10 object-contain" />
					<span className="text-white font-mono font-bold text-xl">Locadora</span>
				</div>

				{/* Menu Central */}
				<nav className="md:flex items-center gap-5 ">
					<button
						onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
						className="text-gray-300 hover:text-white transition"
					>
						Home
					</button>
					<button
						onClick={() => navigate('/locadora')}
						className="text-gray-300 hover:text-white transition"
					>
						Sistema
					</button>
					<button
						onClick={() => navigate('/paginateste')}
						className="text-gray-300 hover:text-white transition"
					>
						Teste
					</button>
					<a href="#equipe" className="text-gray-300 hover:text-white transition">
						Equipe
					</a>
				</nav>

				{/* Botão de Ação */}
				<button
					onClick={() => navigate('/locadora')}
					className="bg-linear-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
				>
					Entrar
				</button>

			</div>
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

	const paginateste = () => {
		navigate('/paginateste');
	};

	return (
		<>
			<Header />

			{/* Wrapper com posição relativa */}
			<div
				class="min-h-screen flex flex-col items-center justify-center p-6 relative cursor-pointer transition-all duration-300"
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

				{/* Conteúdo com z-index maior */}
				<div class="relative z-10 flex flex-col items-center justify-center gap-10">
					<img
						class="h-50 w-auto hover:animate-pulse transition"
						src={logo}
						alt="logo"
					/>

					<div className="max-w-xl text-center mt-4 font-mono font-bold text-white text-2xl drop-shadow-2xl">
						Sistema desenvolvido para gerenciar a locação de mídias, facilitando o controle e a organização das operações diárias.
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
				<div className="relative z-10 py-12 mt-12">
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
								<p className="text-gray-600 text-center">Designer UI/UX</p>
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
		</>
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