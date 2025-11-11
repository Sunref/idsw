class Midium < ApplicationRecord
 self.table_name = "midia"
  belongs_to :ator_principal, class_name: "Ator", foreign_key: "ator_principal"
  belongs_to :ator_coadjuvante, class_name: "Ator", foreign_key: "ator_coadjuvante"
  belongs_to :genero
  belongs_to :classificacao_etaria
  belongs_to :tipo
  belongs_to :classificacao_interna
  has_many :exemplar, foreign_key: "midia_id"
end