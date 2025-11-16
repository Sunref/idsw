class Cidade < ApplicationRecord
  self.table_name = "cidade"

  belongs_to :estado
  has_many :cliente
end