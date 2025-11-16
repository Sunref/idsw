class Cliente < ApplicationRecord
  self.table_name = "cliente"

  belongs_to :cidade
  has_many :locacao
end