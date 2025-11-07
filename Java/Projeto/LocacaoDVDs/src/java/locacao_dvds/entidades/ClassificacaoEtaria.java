package locacao_dvds.entidades;

/**
 * 
 * Entidade ClassificacaoEtaria.
 *
 * @author Fernanda M, Gabriel M e Kevin D.
 * 
 */
public class ClassificacaoEtaria {

    private int id;
    private String descricao;

    public int getId() {
        return id;
    }

    public void setId( int id ) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao( String descricao ) {
        this.descricao = descricao;
    }

    @Override
    public String toString() {
        return descricao;
    }

}