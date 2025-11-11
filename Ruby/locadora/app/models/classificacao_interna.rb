class ClassificacaoInterna < ApplicationRecord
  self.table_name = "classificacao_interna"
  has_many :midia, foreign_key: "classificacao_interna_id"
end
