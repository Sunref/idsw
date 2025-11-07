<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Novo Ator</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Novo Ator</h1>

    <div class="content-wrapper narrow">
        <form method="post" action="${cp}/processaAtor">
            <input type="hidden" name="acao" value="novo"/>

            <div class="form-group">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" required/>
            </div>

            <div class="form-group">
                <label for="sobrenome">Sobrenome:</label>
                <input type="text" id="sobrenome" name="sobrenome" required/>
            </div>

            <div class="form-group">
                <label for="dataEstreia">Data de Estreia:</label>
                <input type="date" id="dataEstreia" name="dataEstreia" required/>
            </div>

            <div class="form-actions">
                <button type="submit">Salvar</button>
                <a href="${cp}/processaAtor?acao=listar" class="btn btn-secondary">
                    Cancelar
                </a>
            </div>
        </form>
    </div>

    <a href="${cp}/index.jsp" class="back-link">Tela Principal</a>

  </body>

</html>