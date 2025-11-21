import React from "react";

export default function Servicos() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-purple-950 via-black to-pink-950 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Título Principal */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold text-white mb-4 font-mono tracking-wider" 
              style={{ textShadow: '0 0 20px #ff006e, 0 0 40px #8338ec' }}>
            SERVIÇOS
          </h2>
          <div className="flex items-center justify-center gap-3 text-pink-500">
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Card 1 - Mídia Física */}
          <div className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 backdrop-blur-sm border-2 border-pink-500/50 rounded-lg p-8 hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-pink-500/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white font-mono">Mídia Física</h3>
              <div className="text-5xl">💿</div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Aluguel de DVDs e Blu-rays com qualidade premium. Catálogo completo com lançamentos e clássicos do cinema.
            </p>
          </div>

          {/* Card 2 - Mídia Digital */}
          <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 backdrop-blur-sm border-2 border-purple-500/50 rounded-lg p-8 hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-purple-500/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white font-mono">Mídia Digital</h3>
              <div className="text-5xl">📱</div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Streaming e download digital. Assista seus filmes favoritos em qualquer dispositivo, a qualquer hora.
            </p>
          </div>

          {/* Card 3 - DVD */}
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm border-2 border-blue-500/50 rounded-lg p-8 hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-blue-500/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white font-mono">Formato DVD</h3>
              <div className="text-5xl">📀</div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Compatível com todos os players. Legendas e áudios em múltiplos idiomas. Qualidade garantida.
            </p>
          </div>

          {/* Card 4 - Blu-ray */}
          <div className="bg-gradient-to-br from-cyan-600/20 to-teal-600/20 backdrop-blur-sm border-2 border-cyan-500/50 rounded-lg p-8 hover:scale-105 transition-transform hover:shadow-2xl hover:shadow-cyan-500/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white font-mono">Blu-ray 4K</h3>
              <div className="text-5xl">🎬</div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Alta definição e qualidade de imagem superior. Experiência cinematográfica em casa com tecnologia 4K.
            </p>
          </div>

        </div>

        {/* Seção Destaque */}
        <div className="bg-gradient-to-r from-pink-600/30 via-purple-600/30 to-blue-600/30 backdrop-blur-md border-2 border-white/20 rounded-2xl p-12 relative overflow-hidden">
          
          {/* Efeito de brilho */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            
            {/* Texto */}
            <div>
              <h3 className="text-4xl font-bold text-white mb-6 font-mono">
                Locação Profissional
              </h3>
              <p className="text-gray-200 text-lg leading-relaxed mb-8">
                Somos especialistas em locação de mídias há mais de 20 anos. Oferecemos tanto formato físico quanto digital, garantindo a melhor experiência para nossos clientes.
              </p>
              
              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <span className="text-white font-semibold">Catálogo com +10.000 títulos</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <span className="text-white font-semibold">Lançamentos toda semana</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    ✓
                  </div>
                  <span className="text-white font-semibold">Preços acessíveis</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-black/40 backdrop-blur-sm border border-pink-500/50 rounded-lg p-6 text-center hover:scale-105 transition">
                <div className="text-4xl font-bold text-pink-500 mb-2 font-mono">20+</div>
                <div className="text-gray-300 text-sm">Anos de Experiência</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/50 rounded-lg p-6 text-center hover:scale-105 transition">
                <div className="text-4xl font-bold text-purple-500 mb-2 font-mono">10K+</div>
                <div className="text-gray-300 text-sm">Títulos Disponíveis</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-blue-500/50 rounded-lg p-6 text-center hover:scale-105 transition">
                <div className="text-4xl font-bold text-blue-500 mb-2 font-mono">5K+</div>
                <div className="text-gray-300 text-sm">Clientes Ativos</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/50 rounded-lg p-6 text-center hover:scale-105 transition">
                <div className="text-4xl font-bold text-cyan-500 mb-2 font-mono">24/7</div>
                <div className="text-gray-300 text-sm">Suporte Online</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
