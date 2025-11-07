<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Alterar Gênero</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Alterar Gênero</h1>

  <div class="content-wrapper narrow">
    <form method="post" action="${cp}/processaGenero" class="form">
      <input name="acao" type="hidden" value="alterar" />
      <input name="id" type="hidden" value="${genero.id}" />

        <div class="form-group">
          <label>Id</label>
          <div class="form-static">${genero.id}</div>
        </div>
        
        <div class="form-group">
          <label for="descricao">Descrição</label>
          <input id="descricao" name="descricao" type="text" maxlength="40" value="${genero.descricao}" required />
        </div>

        <div class="form-actions">
          <a href="${cp}/processaGenero?acao=listar" class="btn btn-secondary"><i class="bi bi-arrow-left"></i> Voltar</a>
          <button type="submit" class="btn"><i class="bi bi-save"></i> Salvar</button>
        </div>
      </form>
    </div>

  </body>

</html>