package locacao_dvds.servicos;

import locacao_dvds.dao.AtorDAO;
import locacao_dvds.dao.ClassificacaoEtariaDAO;
import locacao_dvds.dao.DvdDAO;
import locacao_dvds.dao.GeneroDAO;
import locacao_dvds.entidades.Ator;
import locacao_dvds.entidades.ClassificacaoEtaria;
import locacao_dvds.entidades.Dvd;
import locacao_dvds.entidades.Genero;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.List;

/**
 * 
 * Servlet para prover os serviços relacionados à entidade Dvd.
 *
 * @author Fernanda M, Gabriel M e Kevin D.
 * 
 */
@WebServlet( name = "DvdServices", 
             urlPatterns = { "/processaDvd" } )
public class DvdServices extends HttpServlet {

    protected void processRequest( 
            HttpServletRequest request, 
            HttpServletResponse response )
            throws ServletException, IOException {
        
        String acao = request.getParameter( "acao" );
        RequestDispatcher disp = null;

        try ( DvdDAO dao = new DvdDAO() ) {

            if ( acao != null && acao.equals( "listar" ) ) {

                List<Dvd> dvds = dao.listarTodos();
                request.setAttribute( "dvds", dvds );
                disp = request.getRequestDispatcher( 
                        "/formularios/dvd/listagem.jsp" );

            } else if ( acao != null && acao.equals( "prepararNovo" ) ) {

                try ( AtorDAO atorDAO = new AtorDAO();
                      GeneroDAO generoDAO = new GeneroDAO();
                      ClassificacaoEtariaDAO ceDAO = new ClassificacaoEtariaDAO() ) {

                    List<Ator> atores = atorDAO.listarTodos();
                    List<Genero> generos = generoDAO.listarTodos();
                    List<ClassificacaoEtaria> classificacoesEtarias = ceDAO.listarTodos();

                    request.setAttribute( "atores", atores );
                    request.setAttribute( "generos", generos );
                    request.setAttribute( "classificacoesEtarias", classificacoesEtarias );

                }

                disp = request.getRequestDispatcher( 
                        "/formularios/dvd/novo.jsp" );

            } else if ( acao != null && acao.equals( "prepararAlteracao" ) ) {

                int id = Integer.parseInt(request.getParameter( "id" ));
                Dvd dvd = dao.obterPorId( id );

                try ( AtorDAO atorDAO = new AtorDAO();
                      GeneroDAO generoDAO = new GeneroDAO();
                      ClassificacaoEtariaDAO ceDAO = new ClassificacaoEtariaDAO() ) {

                    List<Ator> atores = atorDAO.listarTodos();
                    List<Genero> generos = generoDAO.listarTodos();
                    List<ClassificacaoEtaria> classificacoesEtarias = ceDAO.listarTodos();

                    request.setAttribute( "atores", atores );
                    request.setAttribute( "generos", generos );
                    request.setAttribute( "classificacoesEtarias", classificacoesEtarias );

                }

                request.setAttribute( "dvd", dvd );
                disp = request.getRequestDispatcher( 
                        "/formularios/dvd/alteracao.jsp" );

            } else if ( acao != null && acao.equals( "prepararExclusao" ) ) {

                int id = Integer.parseInt(request.getParameter( "id" ));
                Dvd dvd = dao.obterPorId( id );
                request.setAttribute( "dvd", dvd );
                disp = request.getRequestDispatcher( 
                        "/formularios/dvd/excluir.jsp" );

            } else if ( acao != null && acao.equals( "novo" ) ) {

                String titulo = request.getParameter( "titulo" );
                int anoLancamento = Integer.parseInt( request.getParameter( "anoLancamento" ) );
                int atorPrincipalId = Integer.parseInt( request.getParameter( "atorPrincipalId" ) );
                int atorCoadjuvanteId = Integer.parseInt( request.getParameter( "atorCoadjuvanteId" ) );
                String dataLancamento = request.getParameter( "dataLancamento" );
                int duracaoMinutos = Integer.parseInt( request.getParameter( "duracaoMinutos" ) );
                int classificacaoEtariaId = Integer.parseInt( request.getParameter( "classificacaoEtariaId" ) );
                int generoId = Integer.parseInt( request.getParameter( "generoId" ) );

                try ( AtorDAO atorDAO = new AtorDAO();
                      GeneroDAO generoDAO = new GeneroDAO();
                      ClassificacaoEtariaDAO ceDAO = new ClassificacaoEtariaDAO() ) {

                    Ator atorPrincipal = atorDAO.obterPorId( atorPrincipalId );
                    Ator atorCoadjuvante = atorDAO.obterPorId( atorCoadjuvanteId );
                    Genero genero = generoDAO.obterPorId( generoId );
                    ClassificacaoEtaria ce = ceDAO.obterPorId( classificacaoEtariaId );

                    Dvd d = new Dvd();
                    d.setTitulo( titulo );
                    d.setAnoLancamento( anoLancamento );
                    d.setAtorPrincipal( atorPrincipal );
                    d.setAtorCoadjuvante( atorCoadjuvante );
                    d.setDataLancamento( Date.valueOf( dataLancamento ) );
                    d.setDuracaoMinutos( duracaoMinutos );
                    d.setClassificacaoEtaria( ce );
                    d.setGenero( genero );

                    dao.salvar( d );

                }

                disp = request.getRequestDispatcher( 
                        "/processaDvd?acao=listar" );

            } else if ( acao != null && acao.equals( "alterar" ) ) {

                int id = Integer.parseInt( request.getParameter( "id" ) );
                String titulo = request.getParameter( "titulo" );
                int anoLancamento = Integer.parseInt( request.getParameter( "anoLancamento" ) );
                int atorPrincipalId = Integer.parseInt( request.getParameter( "atorPrincipalId" ) );
                int atorCoadjuvanteId = Integer.parseInt( request.getParameter( "atorCoadjuvanteId" ) );
                String dataLancamento = request.getParameter( "dataLancamento" );
                int duracaoMinutos = Integer.parseInt( request.getParameter( "duracaoMinutos" ) );
                int classificacaoEtariaId = Integer.parseInt( request.getParameter( "classificacaoEtariaId" ) );
                int generoId = Integer.parseInt( request.getParameter( "generoId" ) );

                try ( AtorDAO atorDAO = new AtorDAO();
                      GeneroDAO generoDAO = new GeneroDAO();
                      ClassificacaoEtariaDAO ceDAO = new ClassificacaoEtariaDAO() ) {

                    Ator atorPrincipal = atorDAO.obterPorId( atorPrincipalId );
                    Ator atorCoadjuvante = atorDAO.obterPorId( atorCoadjuvanteId );
                    Genero genero = generoDAO.obterPorId( generoId );
                    ClassificacaoEtaria ce = ceDAO.obterPorId( classificacaoEtariaId );

                    Dvd d = new Dvd();
                    d.setId( id );
                    d.setTitulo( titulo );
                    d.setAnoLancamento( anoLancamento );
                    d.setAtorPrincipal( atorPrincipal );
                    d.setAtorCoadjuvante( atorCoadjuvante );
                    d.setDataLancamento( Date.valueOf( dataLancamento ) );
                    d.setDuracaoMinutos( duracaoMinutos );
                    d.setClassificacaoEtaria( ce );
                    d.setGenero( genero );

                    dao.atualizar( d );

                }

                disp = request.getRequestDispatcher( 
                        "/processaDvd?acao=listar" );

            } else if ( acao != null && acao.equals( "excluir" ) ) {

                int id = Integer.parseInt( request.getParameter( "id" ) );
                Dvd d = new Dvd();
                d.setId( id );

                dao.excluir( d );
                disp = request.getRequestDispatcher( 
                        "/processaDvd?acao=listar" );

            } else {
                // Ação inválida
                List<Dvd> dvds = dao.listarTodos();
                request.setAttribute( "dvds", dvds );
                disp = request.getRequestDispatcher( 
                        "/formularios/dvd/listagem.jsp" );
            }

        } catch ( SQLException exc ) {
            exc.printStackTrace();
            // Em caso de erro de SQL
            disp = request.getRequestDispatcher( "/formularios/dvd/listagem.jsp" );
        }

        if ( disp != null ) {
            disp.forward( request, response );
        }

    }

    @Override
    protected void doGet( 
            HttpServletRequest request, 
            HttpServletResponse response )
            throws ServletException, IOException {
        processRequest( request, response );
    }

    @Override
    protected void doPost( 
            HttpServletRequest request, 
            HttpServletResponse response )
            throws ServletException, IOException {
        processRequest( request, response );
    }

    @Override
    public String getServletInfo() {
        return "DvdServices";
    }

}