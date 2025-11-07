<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Alterar Classificação Etária</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Alterar Classificação Etária</h1>

  <div class="content-wrapper narrow">
    <form method="post" action="${cp}/processaClassificacaoEtaria" class="form">
        <input type="hidden" name="acao" value="alterar"/>
        <input type="hidden" name="id" value="${classificacaoEtaria.id}"/>

        <div class="form-group">
          <label for="descricao">Descrição</label>
          <input type="text" id="descricao" name="descricao" value="${classificacaoEtaria.descricao}" required
            placeholder="Ex: Livre, 10 anos, 12 anos..." />
        </div>

        <div class="form-actions">
          <a href="${cp}/processaClassificacaoEtaria?acao=listar" class="btn btn-secondary"><i class="bi bi-arrow-left"></i>
            Voltar</a>
          <button type="submit" class="btn"><i class="bi bi-save"></i> Salvar</button>
        </div>
      </form>
    </div>

  </body>

</html>