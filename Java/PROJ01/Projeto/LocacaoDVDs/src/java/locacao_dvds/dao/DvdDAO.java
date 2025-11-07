package locacao_dvds.dao;

import locacao_dvds.entidades.Ator;
import locacao_dvds.entidades.ClassificacaoEtaria;
import locacao_dvds.entidades.Dvd;
import locacao_dvds.entidades.Genero;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * 
 * DAO para a entidade Dvd.
 *
 * @author Fernanda M, Gabriel M e Kevin D.
 * 
 */
public class DvdDAO extends DAO<Dvd> implements AutoCloseable{

    public DvdDAO() throws SQLException {
    }

    @Override
    public void salvar( Dvd obj ) throws SQLException {

        PreparedStatement stmt = getConnection().prepareStatement(
                """
                INSERT INTO  
                dvd( 
                    titulo,  
                    ano_lancamento,  
                    ator_principal_id,  
                    ator_coadjuvante_id,  
                    data_lancamento,  
                    duracao_minutos,  
                    classificacao_etaria_id,  
                    genero_id )  
                VALUES( ?, ?, ?, ?, ?, ?, ?, ? );
                """ );

        stmt.setString( 1, obj.getTitulo() );
        stmt.setInt( 2, obj.getAnoLancamento() );
        stmt.setInt( 3, obj.getAtorPrincipal().getId() );
        stmt.setInt( 4, obj.getAtorCoadjuvante().getId() );
        stmt.setDate( 5, obj.getDataLancamento() );
        stmt.setInt( 6, obj.getDuracaoMinutos() );
        stmt.setInt( 7, obj.getClassificacaoEtaria().getId() );
        stmt.setInt( 8, obj.getGenero().getId() );

        stmt.executeUpdate();
        stmt.close();

    }

    @Override
    public void atualizar( Dvd obj ) throws SQLException {

        PreparedStatement stmt = getConnection().prepareStatement(
                """
                UPDATE dvd  
                SET 
                    titulo = ?,  
                    ano_lancamento = ?, 
                    ator_principal_id = ?,  
                    ator_coadjuvante_id = ?,  
                    data_lancamento = ?,  
                    duracao_minutos = ?,  
                    classificacao_etaria_id = ?,  
                    genero_id = ?  
                WHERE 
                    id = ?;
                """ );

        stmt.setString( 1, obj.getTitulo() );
        stmt.setInt( 2, obj.getAnoLancamento() );
        stmt.setInt( 3, obj.getAtorPrincipal().getId() );
        stmt.setInt( 4, obj.getAtorCoadjuvante().getId() );
        stmt.setDate( 5, obj.getDataLancamento() );
        stmt.setInt( 6, obj.getDuracaoMinutos() );
        stmt.setInt( 7, obj.getClassificacaoEtaria().getId() );
        stmt.setInt( 8, obj.getGenero().getId() );
        stmt.setInt( 9, obj.getId() );

        stmt.executeUpdate();
        stmt.close();

    }

    @Override
    public void excluir( Dvd obj ) throws SQLException {

        PreparedStatement stmt = getConnection().prepareStatement(
                """
                DELETE FROM dvd  
                WHERE 
                    id = ?;
                """ );

        stmt.setInt( 1, obj.getId() );

        stmt.executeUpdate();
        stmt.close();

    }

    @Override
    public List<Dvd> listarTodos() throws SQLException {

        List<Dvd> lista = new ArrayList<>();

        PreparedStatement stmt = getConnection().prepareStatement(
                """
                SELECT 
                    d.id idDvd,  
                    d.titulo tituloDvd,  
                    d.ano_lancamento anoLancamentoDvd,  
                    d.data_lancamento dataLancamentoDvd,  
                    d.duracao_minutos duracaoMinutosDvd,  
                    ap.id idAtorPrincipal,  
                    ap.nome nomeAtorPrincipal,  
                    ap.sobrenome sobrenomeAtorPrincipal,  
                    ap.data_estreia dataEstreiaAtorPrincipal,  
                    ac.id idAtorCoadjuvante,  
                    ac.nome nomeAtorCoadjuvante,  
                    ac.sobrenome sobrenomeAtorCoadjuvante,  
                    ac.data_estreia dataEstreiaAtorCoadjuvante,  
                    ce.id idClassificacaoEtaria,  
                    ce.descricao descricaoClassificacaoEtaria,  
                    g.id idGenero,  
                    g.descricao descricaoGenero  
                FROM 
                    dvd d,  
                    ator ap,  
                    ator ac,  
                    classificacao_etaria ce,  
                    genero g  
                WHERE 
                    d.ator_principal_id = ap.id AND  
                    d.ator_coadjuvante_id = ac.id AND  
                    d.classificacao_etaria_id = ce.id AND  
                    d.genero_id = g.id 
                ORDER BY d.titulo;
                """ );

        ResultSet rs = stmt.executeQuery();

        while ( rs.next() ) {

            Dvd d = new Dvd();
            Ator ap = new Ator();
            Ator ac = new Ator();
            ClassificacaoEtaria ce = new ClassificacaoEtaria();
            Genero g = new Genero();

            d.setId( rs.getInt( "idDvd" ) );
            d.setTitulo( rs.getString( "tituloDvd" ) );
            d.setAnoLancamento( rs.getInt( "anoLancamentoDvd" ) );
            d.setDataLancamento( rs.getDate( "dataLancamentoDvd" ) );
            d.setDuracaoMinutos( rs.getInt( "duracaoMinutosDvd" ) );
            d.setAtorPrincipal( ap );
            d.setAtorCoadjuvante( ac );
            d.setClassificacaoEtaria( ce );
            d.setGenero( g );

            ap.setId( rs.getInt( "idAtorPrincipal" ) );
            ap.setNome( rs.getString( "nomeAtorPrincipal" ) );
            ap.setSobrenome( rs.getString( "sobrenomeAtorPrincipal" ) );
            ap.setDataEstreia( rs.getDate( "dataEstreiaAtorPrincipal" ) );

            ac.setId( rs.getInt( "idAtorCoadjuvante" ) );
            ac.setNome( rs.getString( "nomeAtorCoadjuvante" ) );
            ac.setSobrenome( rs.getString( "sobrenomeAtorCoadjuvante" ) );
            ac.setDataEstreia( rs.getDate( "dataEstreiaAtorCoadjuvante" ) );

            ce.setId( rs.getInt( "idClassificacaoEtaria" ) );
            ce.setDescricao( rs.getString( "descricaoClassificacaoEtaria" ) );

            g.setId( rs.getInt( "idGenero" ) );
            g.setDescricao( rs.getString( "descricaoGenero" ) );

            lista.add( d );

        }

        rs.close();
        stmt.close();

        return lista;

    }

    @Override
    public Dvd obterPorId( int id ) throws SQLException {

        Dvd dvd = null;

        PreparedStatement stmt = getConnection().prepareStatement(
                """
                SELECT
                    d.id idDvd, 
                    d.titulo tituloDvd, 
                    d.ano_lancamento anoLancamentoDvd, 
                    d.data_lancamento dataLancamentoDvd, 
                    d.duracao_minutos duracaoMinutosDvd, 
                    ap.id idAtorPrincipal, 
                    ap.nome nomeAtorPrincipal, 
                    ap.sobrenome sobrenomeAtorPrincipal, 
                    ap.data_estreia dataEstreiaAtorPrincipal, 
                    ac.id idAtorCoadjuvante, 
                    ac.nome nomeAtorCoadjuvante, 
                    ac.sobrenome sobrenomeAtorCoadjuvante, 
                    ac.data_estreia dataEstreiaAtorCoadjuvante, 
                    ce.id idClassificacaoEtaria, 
                    ce.descricao descricaoClassificacaoEtaria, 
                    g.id idGenero, 
                    g.descricao descricaoGenero 
                FROM
                    dvd d, 
                    ator ap, 
                    ator ac, 
                    classificacao_etaria ce, 
                    genero g 
                WHERE
                    d.id = ? AND 
                    d.ator_principal_id = ap.id AND 
                    d.ator_coadjuvante_id = ac.id AND 
                    d.classificacao_etaria_id = ce.id AND 
                    d.genero_id = g.id;
                """ );

        stmt.setInt( 1, id );

        ResultSet rs = stmt.executeQuery();

        if ( rs.next() ) {

            dvd = new Dvd();
            Ator ap = new Ator();
            Ator ac = new Ator();
            ClassificacaoEtaria ce = new ClassificacaoEtaria();
            Genero g = new Genero();

            dvd.setId( rs.getInt( "idDvd" ) );
            dvd.setTitulo( rs.getString( "tituloDvd" ) );
            dvd.setAnoLancamento( rs.getInt( "anoLancamentoDvd" ) );
            dvd.setDataLancamento( rs.getDate( "dataLancamentoDvd" ) );
            dvd.setDuracaoMinutos( rs.getInt( "duracaoMinutosDvd" ) );
            dvd.setAtorPrincipal( ap );
            dvd.setAtorCoadjuvante( ac );
            dvd.setClassificacaoEtaria( ce );
            dvd.setGenero( g );

            ap.setId( rs.getInt( "idAtorPrincipal" ) );
            ap.setNome( rs.getString( "nomeAtorPrincipal" ) );
            ap.setSobrenome( rs.getString( "sobrenomeAtorPrincipal" ) );
            ap.setDataEstreia( rs.getDate( "dataEstreiaAtorPrincipal" ) );

            ac.setId( rs.getInt( "idAtorCoadjuvante" ) );
            ac.setNome( rs.getString( "nomeAtorCoadjuvante" ) );
            ac.setSobrenome( rs.getString( "sobrenomeAtorCoadjuvante" ) );
            ac.setDataEstreia( rs.getDate( "dataEstreiaAtorCoadjuvante" ) );

            ce.setId( rs.getInt( "idClassificacaoEtaria" ) );
            ce.setDescricao( rs.getString( "descricaoClassificacaoEtaria" ) );

            g.setId( rs.getInt( "idGenero" ) );
            g.setDescricao( rs.getString( "descricaoGenero" ) );

        }

        rs.close();
        stmt.close();

        return dvd;

    }
    
    @Override
    public void close() throws SQLException {
        if (getConnection() != null && !getConnection().isClosed()) {
            getConnection().close();
        }
    }

}