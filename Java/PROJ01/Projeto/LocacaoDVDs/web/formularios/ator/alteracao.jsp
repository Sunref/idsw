<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Alterar Ator</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Alterar Ator</h1>

  <div class="content-wrapper narrow">
    <form method="post" action="${cp}/processaAtor" class="form">
        <input type="hidden" name="acao" value="alterar"/>
        <input type="hidden" name="id" value="${ator.id}"/>

        <div class="form-group">
          <label for="nome">Nome</label>
          <input type="text" id="nome" name="nome" value="${ator.nome}" required/>
        </div>

        <div class="form-group">
          <label for="sobrenome">Sobrenome</label>
          <input type="text" id="sobrenome" name="sobrenome" value="${ator.sobrenome}" required/>
        </div>

        <div class="form-group">
          <label for="dataEstreia">Data de Estreia</label>
          <input type="date" id="dataEstreia" name="dataEstreia"
            value="<fmt:formatDate value='${ator.dataEstreia}' pattern='yyyy-MM-dd'/>" required />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn"><i class="bi bi-save"></i> Salvar</button>
          <a href="${cp}/processaAtor?acao=listar" class="btn btn-secondary"><i class="bi bi-x-lg"></i> Cancelar</a>
        </div>
      </form>
    </div>

  </body>

</html>