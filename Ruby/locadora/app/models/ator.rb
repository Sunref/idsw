class Ator < ApplicationRecord
  self.table_name = "ator"

  has_many :midia_principal, class_name: "Midium", foreign_key: "ator_principal"
  has_many :midia_coadjuvante, class_name: "Midium", foreign_key: "ator_coadjuvante"

  validates :nome, :sobrenome, :data_estreia, presence: true
end
