class Locacao < ApplicationRecord
  self.table_name = "locacao"
  belongs_to :cliente
  has_many :item_locacao
end
