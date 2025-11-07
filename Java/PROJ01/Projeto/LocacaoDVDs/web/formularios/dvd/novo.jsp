<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Novo DVD</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Novo DVD</h1>

    <div>
      <form method="post" action="${cp}/processaDvd">
        <input type="hidden" name="acao" value="novo"/>
        
        <div>
          <label for="titulo">Título:</label>
          <input type="text" id="titulo" name="titulo" required/>
        </div>
        
        <div>
          <label for="anoLancamento">Ano de Lançamento:</label>
          <input type="number" id="anoLancamento" name="anoLancamento" required min="1900" max="2024"/>
        </div>
        
        <div>
          <label for="atorPrincipalId">Ator Principal:</label>
          <select id="atorPrincipalId" name="atorPrincipalId" required>
            <option value="">Selecione um ator</option>
            <c:forEach items="${atores}" var="ator">
              <option value="${ator.id}">${ator.nome} ${ator.sobrenome}</option>
            </c:forEach>
          </select>
        </div>
        
        <div>
          <label for="atorCoadjuvanteId">Ator Coadjuvante:</label>
          <select id="atorCoadjuvanteId" name="atorCoadjuvanteId" required>
            <option value="">Selecione um ator</option>
            <c:forEach items="${atores}" var="ator">
              <option value="${ator.id}">${ator.nome} ${ator.sobrenome}</option>
            </c:forEach>
          </select>
        </div>
        
        <div>
          <label for="dataLancamento">Data de Lançamento:</label>
          <input type="date" id="dataLancamento" name="dataLancamento" required/>
        </div>
        
        <div>
          <label for="duracaoMinutos">Duração (minutos):</label>
          <input type="number" id="duracaoMinutos" name="duracaoMinutos" required min="1"/>
        </div>
        
        <div>
          <label for="classificacaoEtariaId">Classificação Etária:</label>
          <select id="classificacaoEtariaId" name="classificacaoEtariaId" required>
            <option value="">Selecione uma classificação</option>
            <c:forEach items="${classificacoesEtarias}" var="classificacao">
              <option value="${classificacao.id}">${classificacao.descricao}</option>
            </c:forEach>
          </select>
        </div>
        
        <div>
          <label for="generoId">Gênero:</label>
          <select id="generoId" name="generoId" required>
            <option value="">Selecione um gênero</option>
            <c:forEach items="${generos}" var="genero">
              <option value="${genero.id}">${genero.descricao}</option>
            </c:forEach>
          </select>
        </div>
        
        <div>
          <button type="submit">Salvar</button>
          <a href="${cp}/processaDvd?acao=listar">
            Cancelar
          </a>
        </div>
      </form>
    </div>

  </body>

</html>