package locacao_dvds.entidades;

import java.sql.Date;

/**
 * 
 * Entidade Dvd.
 *
 * @author Fernanda M, Gabriel M e Kevin D.
 * 
 */
public class Dvd {

    private int id;
    private String titulo;
    private int anoLancamento;
    private Ator atorPrincipal;
    private Ator atorCoadjuvante;
    private Date dataLancamento;
    private int duracaoMinutos;
    private ClassificacaoEtaria classificacaoEtaria;
    private Genero genero;

    public int getId() {
        return id;
    }

    public void setId( int id ) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo( String titulo ) {
        this.titulo = titulo;
    }

    public int getAnoLancamento() {
        return anoLancamento;
    }

    public void setAnoLancamento( int anoLancamento ) {
        this.anoLancamento = anoLancamento;
    }

    public Ator getAtorPrincipal() {
        return atorPrincipal;
    }

    public void setAtorPrincipal( Ator atorPrincipal ) {
        this.atorPrincipal = atorPrincipal;
    }

    public Ator getAtorCoadjuvante() {
        return atorCoadjuvante;
    }

    public void setAtorCoadjuvante( Ator atorCoadjuvante ) {
        this.atorCoadjuvante = atorCoadjuvante;
    }

    public Date getDataLancamento() {
        return dataLancamento;
    }

    public void setDataLancamento( Date dataLancamento ) {
        this.dataLancamento = dataLancamento;
    }

    public int getDuracaoMinutos() {
        return duracaoMinutos;
    }

    public void setDuracaoMinutos( int duracaoMinutos ) {
        this.duracaoMinutos = duracaoMinutos;
    }

    public ClassificacaoEtaria getClassificacaoEtaria() {
        return classificacaoEtaria;
    }

    public void setClassificacaoEtaria( ClassificacaoEtaria classificacaoEtaria ) {
        this.classificacaoEtaria = classificacaoEtaria;
    }

    public Genero getGenero() {
        return genero;
    }

    public void setGenero( Genero genero ) {
        this.genero = genero;
    }

    @Override
    public String toString() {
        return titulo;
    }

}