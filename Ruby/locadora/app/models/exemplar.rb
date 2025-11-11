class Exemplar < ApplicationRecord
  self.table_name = "exemplar"
  belongs_to :midia
  has_many :item_locacao, foreign_key: "exemplar_codigo_interno"
end
