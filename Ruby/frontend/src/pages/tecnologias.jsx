import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo.png";
import Locadora from './locadora';
import Servicos from "./servicos";
import Csslogo from "../assets/images/logos/css_logo.png";
import Htmllogo from "../assets/images/logos/html_logo.png";
import Jslogo from "../assets/images/logos/js_logo.png";
import Reactlogo from "../assets/images/logos/react_logo.png";
import Rubylogo from "../assets/images/logos/Ruby_logo.png";
import Railslogo from "../assets/images/logos/rubyonrails_logo.png";
import Vitelogo from "../assets/images/logos/vite_js_logo.png";
import Tailwindlogo from "../assets/images/logos/tailwind_css_logo.png";
import Mariadblogo from "../assets/images/logos/mariadb_logo.png";
import Dockerlogo from "../assets/images/logos/docker_logo.png";

function Header() {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    }

    return (
        <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-white/10">
            <div className="mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo - fica à esquerda */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                    <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
                    <span className="text-white font-mono font-bold text-xl">Old Store Media</span>
                </div>

                {/* Botão - fica à direita */}
                <button
                    onClick={() => navigate('/locadora')}
                    className="bg-linear-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition"
                >
                    Entrar
                </button>

            </div>

            {/* Menu */}
            <nav className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-8">
                <button
                    onClick={() => navigate('/')}
                    className="text-gray-300 hover:text-white transition"
                >
                    Home
                </button>
                <button
                    onClick={() => navigate('/tecnologias')}
                    className="text-gray-300 hover:text-white transition"
                >
                    Tecnologias
                </button>
                <button
                    onClick={() => {
                        navigate('/');
                        setTimeout(() => {
                            document.getElementById('equipe')?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                    }}
                    className="text-gray-300 hover:text-white transition"
                >
                    Equipe
                </button>
            </nav>
        </header>
    );
}

function Tecnologias() {
    const navigate = useNavigate();

    const tecnologias = [
        {
            nome: "Ruby",
            logo: Rubylogo,
            destaque: true,
            resumo: "Linguagem de programação elegante e poderosa, focada na simplicidade e produtividade. Ruby é a base do nosso backend, permitindo código limpo e manutenível com sua sintaxe intuitiva.",
            funcao: "Backend principal, lógica de negócio e processamento de dados"
        },
        {
            nome: "Ruby on Rails",
            logo: Railslogo,
            destaque: true,
            resumo: "Framework web completo que segue o padrão MVC (Model-View-Controller). Rails acelera o desenvolvimento com convenções inteligentes, oferecendo estrutura robusta para APIs RESTful e gerenciamento de banco de dados.",
            funcao: "Framework backend, APIs, autenticação e gerenciamento de dados"
        },
        {
            nome: "React",
            logo: Reactlogo,
            destaque: false,
            resumo: "Biblioteca JavaScript para construção de interfaces interativas através de componentes reutilizáveis. Permite criar experiências de usuário fluidas e responsivas com atualização eficiente do DOM.",
            funcao: "Interface do usuário, componentes reativos e gerenciamento de estado"
        },
        {
            nome: "Vite",
            logo: Vitelogo,
            destaque: false,
            resumo: "Ferramenta de build moderna e extremamente rápida para projetos web. Oferece hot module replacement instantâneo e otimização automática para desenvolvimento ágil.",
            funcao: "Bundler, servidor de desenvolvimento e build de produção"
        },
        {
            nome: "Tailwind CSS",
            logo: Tailwindlogo,
            destaque: false,
            resumo: "Framework CSS utility-first que permite estilização rápida e consistente. Cria designs customizados sem sair do HTML, com classes pré-definidas para responsividade e temas.",
            funcao: "Estilização, design responsivo e tematização"
        },
        {
            nome: "JavaScript",
            logo: Jslogo,
            destaque: false,
            resumo: "Linguagem de programação essencial para web, permite interatividade e lógica no frontend. Base para frameworks modernos e comunicação assíncrona com o backend.",
            funcao: "Lógica do cliente, manipulação do DOM e requisições assíncronas"
        },
        {
            nome: "HTML",
            logo: Htmllogo,
            destaque: false,
            resumo: "Linguagem de marcação que estrutura o conteúdo web. Define a hierarquia e semântica dos elementos da página, essencial para acessibilidade e SEO.",
            funcao: "Estrutura e marcação semântica das páginas"
        },
        {
            nome: "CSS",
            logo: Csslogo,
            destaque: false,
            resumo: "Linguagem de estilização que define aparência visual dos elementos. Controla layout, cores, animações e responsividade das interfaces.",
            funcao: "Estilização visual, layouts e animações"
        },
        {
            nome: "MariaDB",
            logo: Mariadblogo,
            destaque: false,
            resumo: "Sistema de gerenciamento de banco de dados relacional open-source, fork do MySQL com foco em performance e compatibilidade. Oferece transações ACID, alta disponibilidade e recursos avançados de replicação para ambientes críticos.",
            funcao: "Armazenamento persistente de dados, gerenciamento de transações e consultas SQL"
        },
        {
            nome: "Docker",
            logo: Dockerlogo,
            destaque: false,
            resumo: "Plataforma de containerização que empacota aplicações com todas suas dependências. Garante ambientes consistentes entre desenvolvimento, testes e produção.",
            funcao: "Containerização, deploy consistente e orquestração de serviços"
        }
    ];

    return (
        <>
            <Header />

            <section className="min-h-screen bg-linear-to-b from-black via-purple-950 to-black py-20 px-6">
                <div className="max-w-7xl mx-auto">

                    {/* Título Principal */}
                    <div className="text-center mb-20">
                        <h2
                            className="text-6xl font-bold text-white mb-6 font-mono tracking-wider"
                            style={{ textShadow: '0 0 20px #ff006e, 0 0 40px #8338ec' }}
                        >
                            TECNOLOGIAS
                        </h2>
                        <p className="text-gray-400 text-lg font-mono max-w-2xl mx-auto">
                            Principais tecnologias utilizadas no desenvolvimento do sistema de locação de mídias.
                        </p>

                        {/* Indicadores animados */}
                        <div className="flex items-center justify-center gap-3 mt-6">
                            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                        </div>
                    </div>

                    {/* Grid de Tecnologias */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {tecnologias.map((tech, index) => (
                            <div
                                key={index}
                                className={`
                                    group relative overflow-hidden rounded-xl backdrop-blur-sm
                                    transition-all duration-300 hover:scale-105
                                    ${tech.destaque
                                    ? 'bg-linear-to-br from-pink-600/30 via-purple-600/30 to-pink-600/30 border-4 border-pink-500/60 shadow-2xl shadow-pink-500/40'
                                    : 'bg-linear-to-br from-gray-800/40 to-gray-900/40 border-2 border-purple-500/30 hover:border-purple-500/60'}
                                `}
                                style={{
                                    boxShadow: tech.destaque
                                        ? '0 0 40px rgba(255,0,110,0.4), inset 0 0 40px rgba(255,0,110,0.1)'
                                        : 'none'
                                }}
                            >
                                {/* Badge de destaque */}
                                {tech.destaque && (
                                    <div className="absolute top-4 right-4 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                                        ⭐ CORE
                                    </div>
                                )}

                                <div className="p-8">
                                    {/* Cabeçalho */}
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-16 h-16 filter drop-shadow-lg transform group-hover:scale-110 transition-transform">
                                            <img
                                                src={tech.logo}
                                                alt={`${tech.nome} logo`}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3
                                                className={`text-3xl font-bold mb-2 font-mono ${tech.destaque ? 'text-pink-400' : 'text-white'
                                                    }`}
                                                style={tech.destaque ? { textShadow: '0 0 10px #ff006e' } : {}}
                                            >
                                                {tech.nome}
                                            </h3>
                                            <div className="h-1 w-20 bg-linear-to-r from-pink-500 to-purple-500 rounded-full"></div>
                                        </div>
                                    </div>

                                    {/* Descrição */}
                                    <p className="text-gray-300 leading-relaxed mb-4 text-base">
                                        {tech.resumo}
                                    </p>

                                    {/* Função */}
                                    <div
                                        className="mt-6 p-4 rounded-lg border-l-4 border-purple-500 bg-black/30"
                                        style={{ borderLeftColor: tech.destaque ? '#ff006e' : '#8338ec' }}
                                    >
                                        <p className="text-sm font-mono text-gray-400">
                                            <span className="text-purple-400 font-bold">Função:</span> {tech.funcao}
                                        </p>
                                    </div>

                                    {/* Efeito de brilho no hover */}
                                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default Tecnologias;