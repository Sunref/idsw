class Tipo < ApplicationRecord
  self.table_name = "tipo"

  has_many :midias, foreign_key: "tipo_id"
end
