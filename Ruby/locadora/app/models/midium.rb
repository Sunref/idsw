class Midium < ApplicationRecord
  self.table_name = "midia"

  belongs_to :ator_principal, class_name: "Ator", foreign_key: "ator_principal"
  belongs_to :ator_coadjuvante, class_name: "Ator", foreign_key: "ator_coadjuvante"
  belongs_to :genero
  belongs_to :classificacao_etaria, class_name: "ClassificacaoEtarium"
  belongs_to :tipo
  belongs_to :classificacao_interna

  has_many :exemplares, foreign_key: "midia_id", class_name: "Exemplar"

  validates :titulo, :ano_lancamento, :codigo_barras, :duracao_em_minutos, :custo, presence: true
  validates :codigo_barras, uniqueness: true
  validates :ano_lancamento, numericality: { only_integer: true, greater_than: 1800 }
  validates :duracao_em_minutos, numericality: { only_integer: true, greater_than: 0 }
  validates :custo, numericality: { greater_than_or_equal_to: 0 }

  # Retorna o valor de aluguel baseado na classificação interna
  def valor_aluguel
    classificacao_interna&.valor_aluguel || 0
  end

  # Verifica se a mídia tem estoque disponível para locação
  def tem_estoque?
    Exemplar.tem_estoque?(id)
  end

  # Quantidade disponível para locação (1 é mostruário)
  def quantidade_disponivel
    Exemplar.quantidade_disponivel_para_locacao(id)
  end

  # Total de exemplares
  def total_exemplares
    exemplares.count
  end

  # Exemplares disponíveis
  def exemplares_disponiveis
    exemplares.where(disponivel: true).count
  end
end