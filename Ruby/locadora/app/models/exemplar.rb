class Exemplar < ApplicationRecord
  self.table_name = "exemplar"
  self.primary_key = 'codigo_interno'

  belongs_to :midia

  has_many :itens_locacao, foreign_key: "exemplar_codigo_interno"
end
