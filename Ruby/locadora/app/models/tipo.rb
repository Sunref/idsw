class Tipo < ApplicationRecord
  self.table_name = "tipo"
  has_many :midia, foreign_key: "tipo_id"
end
