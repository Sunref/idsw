class Estado < ApplicationRecord
	self.table_name = "estado"
	has_many :cidades, class_name: "Cidade", foreign_key: "estado_id"
end
