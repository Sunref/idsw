class Locacao < ApplicationRecord
  self.table_name = "locacao"
  belongs_to :cliente
  has_many :item_locacoes, class_name: "ItemLocacao", foreign_key: "locacao_id"
  has_many :exemplares, through: :item_locacoes, source: :exemplar

  scope :ativas, -> { where(cancelada: false) }
  scope :atrasadas, -> { where("data_fim < ? AND cancelada = ?", Date.today, false) }

  def valor_total
    item_locacoes.sum(:valor)
  end

  def status
    return "Cancelada" if cancelada
    return "Atrasada" if Date.today > data_fim
    "Ativa"
  end

  def dias_atraso
    return 0 unless Date.today > data_fim && !cancelada
    (Date.today - data_fim).to_i
  end

  def finalizar!
    ActiveRecord::Base.transaction do
      update!(cancelada: true)
      exemplares.each { |e| e.update!(disponivel: true) }
    end
  end

  def cancelar!
    ActiveRecord::Base.transaction do
      update!(cancelada: true)
      exemplares.each { |e| e.update!(disponivel: true) }
    end
  end
end