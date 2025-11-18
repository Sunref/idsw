class ClassificacaoEtarium < ApplicationRecord
  self.table_name = "classificacao_etaria"

  has_many :midias, foreign_key: "classificacao_etaria_id"
end
