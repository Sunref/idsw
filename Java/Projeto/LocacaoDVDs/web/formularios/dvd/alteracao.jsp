<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Alterar DVD</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Alterar DVD</h1>

  <div class="content-wrapper narrow">
    <form method="post" action="${cp}/processaDvd" class="form">
        <input type="hidden" name="acao" value="alterar"/>
        <input type="hidden" name="id" value="${dvd.id}"/>

        <div class="form-group">
          <label for="titulo">Título</label>
          <input type="text" id="titulo" name="titulo" value="${dvd.titulo}" required/>
        </div>

        <div class="form-group">
          <label for="anoLancamento">Ano de Lançamento</label>
          <input type="number" id="anoLancamento" name="anoLancamento" value="${dvd.anoLancamento}" required min="1900" max="2024"/>
        </div>

        <div class="form-group">
          <label for="atorPrincipalId">Ator Principal</label>
          <select id="atorPrincipalId" name="atorPrincipalId" required>
            <option value="">Selecione um ator</option>
            <c:forEach items="${atores}" var="ator">
              <option value="${ator.id}" ${ator.id == dvd.atorPrincipal.id ? 'selected' : ''}>
                ${ator.nome} ${ator.sobrenome}
              </option>
            </c:forEach>
          </select>
        </div>

        <div class="form-group">
          <label for="atorCoadjuvanteId">Ator Coadjuvante</label>
          <select id="atorCoadjuvanteId" name="atorCoadjuvanteId" required>
            <option value="">Selecione um ator</option>
            <c:forEach items="${atores}" var="ator">
              <option value="${ator.id}" ${ator.id == dvd.atorCoadjuvante.id ? 'selected' : ''}>
                ${ator.nome} ${ator.sobrenome}
              </option>
            </c:forEach>
          </select>
        </div>

        <div class="form-group">
          <label for="dataLancamento">Data de Lançamento</label>
          <input type="date" id="dataLancamento" name="dataLancamento"
            value="<fmt:formatDate value='${dvd.dataLancamento}' pattern='yyyy-MM-dd'/>" required />
        </div>

        <div class="form-group">
          <label for="duracaoMinutos">Duração (minutos)</label>
          <input type="number" id="duracaoMinutos" name="duracaoMinutos" value="${dvd.duracaoMinutos}" required min="1"/>
        </div>

        <div class="form-group">
          <label for="classificacaoEtariaId">Classificação Etária</label>
          <select id="classificacaoEtariaId" name="classificacaoEtariaId" required>
            <option value="">Selecione uma classificação</option>
            <c:forEach items="${classificacoesEtarias}" var="classificacao">
              <option value="${classificacao.id}" ${classificacao.id == dvd.classificacaoEtaria.id ? 'selected' : ''}>
                ${classificacao.descricao}
              </option>
            </c:forEach>
          </select>
        </div>

        <div class="form-group">
          <label for="generoId">Gênero</label>
          <select id="generoId" name="generoId" required>
            <option value="">Selecione um gênero</option>
            <c:forEach items="${generos}" var="genero">
              <option value="${genero.id}" ${genero.id == dvd.genero.id ? 'selected' : ''}>
                ${genero.descricao}
              </option>
            </c:forEach>
          </select>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn"><i class="bi bi-save"></i> Salvar</button>
          <a href="${cp}/processaDvd?acao=listar" class="btn btn-secondary"><i class="bi bi-x-lg"></i> Cancelar</a>
        </div>
      </form>
    </div>

  </body>

</html>