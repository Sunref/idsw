class Genero < ApplicationRecord
  self.table_name = "genero"
  has_many :midia, foreign_key: "genero_id"
end
