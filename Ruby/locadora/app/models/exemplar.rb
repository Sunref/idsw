class Exemplar < ApplicationRecord
  self.table_name = "exemplar"
  self.primary_key = 'codigo_interno'

  belongs_to :midia, class_name: "Midium", foreign_key: "midia_id"
  has_many :itens_locacao, foreign_key: "exemplar_codigo_interno", class_name: "ItemLocacao"

  scope :disponiveis, -> { where(disponivel: true) }
  scope :indisponiveis, -> { where(disponivel: false) }

  # Validações
  validates :disponivel, inclusion: { in: [true, false] }
  validate :nao_pode_deletar_se_em_locacao, on: :destroy

  # Métodos de classe para controle de estoque
  def self.disponiveis_para_locacao(midia_id)
    # Retorna exemplares disponíveis, EXCETO 1 que fica como mostruário
    where(midia_id: midia_id, disponivel: true)
      .limit(count_disponiveis(midia_id) - 1)
  end

  def self.count_disponiveis(midia_id)
    where(midia_id: midia_id, disponivel: true).count
  end

  def self.tem_estoque?(midia_id)
    # Precisa ter pelo menos 2 disponíveis (1 fica como mostruário)
    count_disponiveis(midia_id) > 1
  end

  def self.quantidade_disponivel_para_locacao(midia_id)
    quantidade = count_disponiveis(midia_id) - 1
    quantidade.positive? ? quantidade : 0
  end

  def marcar_como_alugado!
    update!(disponivel: false)
  end

  def marcar_como_disponivel!
    update!(disponivel: true)
  end

  def em_locacao_ativa?
    itens_locacao.joins(:locacao)
                 .where(locacoes: { cancelada: false })
                 .where("locacoes.data_fim >= ?", Date.today)
                 .exists?
  end

  private

  def nao_pode_deletar_se_em_locacao
    if em_locacao_ativa?
      errors.add(:base, "Não é possível deletar exemplar que está em locação ativa")
    end
  end
end