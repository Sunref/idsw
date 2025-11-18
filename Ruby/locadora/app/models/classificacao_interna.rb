class ClassificacaoInterna < ApplicationRecord
  self.table_name = "classificacao_interna"

  has_many :midias, foreign_key: "classificacao_interna_id"
end
