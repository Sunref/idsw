<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Nova Classificação Etária</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Nova Classificação Etária</h1>

    <div>
      <form method="post" action="${cp}/processaClassificacaoEtaria">
        <input type="hidden" name="acao" value="novo"/>
        
        <div>
          <label for="descricao">Descrição:</label>
          <input type="text" id="descricao" name="descricao" required 
                 placeholder="Ex: Livre, 10 anos, 12 anos, 14 anos, 16 anos, 18 anos"/>
        </div>
        
        <div>
          <button type="submit">Salvar</button>
          <a href="${cp}/processaClassificacaoEtaria?acao=listar">
            Cancelar
          </a>
        </div>
      </form>
    </div>

  </body>

</html>