class ItemLocacao < ApplicationRecord
  self.table_name = "item_locacao"
  belongs_to :locacao, foreign_key: "locacao_id"
  belongs_to :exemplar, foreign_key: "exemplar_codigo_interno"
end
