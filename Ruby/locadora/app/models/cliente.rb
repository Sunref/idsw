class Cliente < ApplicationRecord
  self.table_name = "cliente"

  belongs_to :cidade
  has_many :locacoes, class_name: "Locacao", foreign_key: "cliente_id", dependent: :restrict_with_error

  # Validações
  validates :nome, :sobrenome, :cpf, :email, presence: true
  validates :cpf, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  # Métodos auxiliares
  def nome_completo
    "#{nome} #{sobrenome}"
  end

  def pode_alugar?
    locacoes_atrasadas.empty?
  end

  def locacoes_atrasadas
    locacoes.where("data_fim < ? AND cancelada = ?", Date.today, false)
  end
end