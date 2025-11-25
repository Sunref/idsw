FROM docker.io/library/ruby:3.3.4-slim

WORKDIR /rails

# Instalar dependências
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    default-libmysqlclient-dev \
    curl \
    git \
    libyaml-dev \
    pkg-config && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copiar Gemfile
COPY Gemfile Gemfile.lock ./

# Instalar gems
RUN bundle install

# Copiar código da aplicação
COPY . .

# Expor porta
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["rails", "server", "-b", "0.0.0.0"]
