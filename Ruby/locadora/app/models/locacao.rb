class Locacao < ApplicationRecord
  self.table_name = "locacao"

  belongs_to :cliente
  has_many :item_locacoes, class_name: "ItemLocacao", foreign_key: "locacao_id"
end
