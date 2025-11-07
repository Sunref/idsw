<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Sistema para Locação de DVDs</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">
    
  </head>

  <body>

    <h1>Selecione a entidade desejada</h1>

    <div class="content-wrapper">
        <ul class="nav-menu">
            <li><a href="${cp}/processaDvd?acao=listar">DVDs</a></li>
            <li><a href="${cp}/processaAtor?acao=listar">Atores</a></li>
            <li><a href="${cp}/processaGenero?acao=listar">Gêneros</a></li>
            <li><a href="${cp}/processaClassificacaoEtaria?acao=listar">Classificações Etárias</a></li>
        </ul>
    </div>

  </body>

</html>
