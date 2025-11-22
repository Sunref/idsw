# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 0) do
  create_table "ator", id: :integer, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.date "data_estreia", null: false
    t.string "nome", limit: 45, null: false
    t.string "sobrenome", limit: 45, null: false
  end

  create_table "cidade", id: :integer, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.integer "estado_id", null: false
    t.string "nome", limit: 30, null: false
    t.index ["estado_id"], name: "estado_id"
  end

  create_table "classificacao_etaria", id: :integer, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "descricao", limit: 45, null: false
  end

  create_table "classificacao_interna", id: :integer, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "descricao", limit: 45, null: false
    t.decimal "valor_aluguel", precision: 15, scale: 2, null: false
  end

  create_table "cliente", id: :integer, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "bairro", limit: 30, null: false
    t.string "cep", limit: 9, null: false
    t.integer "cidade_id", null: false
    t.string "cpf", limit: 14, null: false
    t.date "data_nascimento", null: false
    t.string "email", limit: 60, null: false
    t.string "logradouro", limit: 50, null: false
    t.string "nome", limit: 45, null: false
    t.string "numero", limit: 6, null: false
    t.string "sobrenome", limit: 45, null: false
    t.index ["cidade_id"], name: "cidade_id"
    t.index ["cpf"], name: "cpf", unique: true
  end

  create_table "estado", id: :integer, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "nome", limit: 30, null: false
    t.string "sigla", limit: 2, null: false
    t.index ["sigla"], name: "sigla", unique: true
  end

  create_table "exemplar", primary_key: "codigo_interno", id: :integer, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.boolean "disponivel", null: false
    t.integer "midia_id", null: false
    t.index ["midia_id"], name: "midia_id"
  end

  create_table "genero", id: :integer, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "descricao", limit: 45, null: false
  end

  create_table "item_locacao", primary_key: ["locacao_id", "exemplar_codigo_interno"], charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.integer "exemplar_codigo_interno", null: false
    t.integer "locacao_id", null: false
    t.decimal "valor", precision: 15, scale: 2, null: false
    t.index ["exemplar_codigo_interno"], name: "exemplar_codigo_interno"
  end

  create_table "locacao", id: :integer, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.boolean "cancelada", null: false
    t.integer "cliente_id", null: false
    t.date "data_fim", null: false
    t.date "data_inicio", null: false
    t.index ["cliente_id"], name: "cliente_id"
  end

  create_table "midia", id: :integer, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.integer "ano_lancamento", null: false
    t.integer "ator_coadjuvante", null: false
    t.integer "ator_principal", null: false
    t.integer "classificacao_etaria_id", null: false
    t.integer "classificacao_interna_id", null: false
    t.string "codigo_barras", limit: 13, null: false
    t.decimal "custo", precision: 15, scale: 2, null: false
    t.integer "duracao_em_minutos", null: false
    t.integer "genero_id", null: false
    t.integer "tipo_id", null: false
    t.string "titulo", limit: 100, null: false
    t.index ["ator_coadjuvante"], name: "ator_coadjuvante"
    t.index ["ator_principal"], name: "ator_principal"
    t.index ["classificacao_etaria_id"], name: "classificacao_etaria_id"
    t.index ["classificacao_interna_id"], name: "classificacao_interna_id"
    t.index ["codigo_barras"], name: "codigo_barras", unique: true
    t.index ["genero_id"], name: "genero_id"
    t.index ["tipo_id"], name: "tipo_id"
  end

  create_table "tipo", id: :integer, charset: "utf8mb4", collation: "utf8mb4_unicode_ci", force: :cascade do |t|
    t.string "descricao", limit: 45, null: false
  end

  add_foreign_key "cidade", "estado", name: "1"
  add_foreign_key "cliente", "cidade", name: "1"
  add_foreign_key "exemplar", "midia", column: "midia_id", name: "1"
  add_foreign_key "item_locacao", "exemplar", column: "exemplar_codigo_interno", primary_key: "codigo_interno", name: "2"
  add_foreign_key "item_locacao", "locacao", name: "1"
  add_foreign_key "locacao", "cliente", name: "1"
  add_foreign_key "midia", "ator", column: "ator_coadjuvante", name: "2"
  add_foreign_key "midia", "ator", column: "ator_principal", name: "1"
  add_foreign_key "midia", "classificacao_etaria", column: "classificacao_etaria_id", name: "4"
  add_foreign_key "midia", "classificacao_interna", name: "6"
  add_foreign_key "midia", "genero", name: "3"
  add_foreign_key "midia", "tipo", name: "5"
end
