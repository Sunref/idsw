class Genero < ApplicationRecord
  self.table_name = "genero"

  has_many :midias, foreign_key: "genero_id"
end
