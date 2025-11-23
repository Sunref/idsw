import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivitySquare,
    BarChart3,
    Disc2,
    Film,
    Loader2,
    LogOut,
    Pencil,
    Plus,
    RefreshCcw,
    Search,
    SquareStack,
    Trash2,
    Users,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import logo from "../assets/images/logo.png";
import {
    createResource,
    deleteResource,
    extractError,
    fetchOptions,
    listResource,
    updateResource,
} from "../api/resources";

const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
};

const formatCurrency = (value) => {
    if (value == null || value === "") return "—";
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
};

const buildInitialValues = (config) => {
    const initial = {};
    config.formFields.forEach((field) => {
        initial[field.name] = field.defaultValue ?? "";
    });
    return initial;
};

const buildPayload = (fields, values) => {
    const payload = {};
    fields.forEach((field) => {
        let value = values[field.name];

        if (field.parser) {
            value = field.parser(value);
        } else if (field.type === "number" && value !== "" && value !== null) {
            value = Number(value);
        } else if (field.cast === "number" && value !== "" && value !== null) {
            value = Number(value);
        } else if (field.cast === "boolean") {
            value = value === true || value === "true";
        }

        if (typeof value === "string" && field.trim !== false) {
            value = value.trim();
        }

        if (value === "" || value === undefined) return;
        payload[field.name] = value;
    });
    return payload;
};

const RESOURCE_CONFIGS = {
    clientes: {
        id: "clientes",
        title: "Clientes",
        description: "Gerencie o cadastro completo dos clientes.",
        endpoint: "clientes",
        entityKey: "cliente",
        columns: [
            { key: "id", label: "ID" },
            {
                key: "nome",
                label: "Cliente",
                render: (row) => `${row.nome} ${row.sobrenome}`,
            },
            { key: "email", label: "E-mail" },
            { key: "cpf", label: "CPF" },
            {
                key: "cidade_id",
                label: "Cidade",
                type: "reference",
                referenceField: "cidade_id",
            },
        ],
        formFields: [
            { name: "nome", label: "Nome", type: "text", required: true },
            { name: "sobrenome", label: "Sobrenome", type: "text", required: true },
            { name: "data_nascimento", label: "Data de Nascimento", type: "date", required: true },
            { name: "cpf", label: "CPF", type: "text", required: true },
            { name: "email", label: "E-mail", type: "email", required: true },
            { name: "logradouro", label: "Logradouro", type: "text", required: true },
            { name: "numero", label: "Número", type: "text", required: true },
            { name: "bairro", label: "Bairro", type: "text", required: true },
            { name: "cep", label: "CEP", type: "text", required: true },
            {
                name: "cidade_id",
                label: "Cidade",
                type: "select",
                required: true,
                cast: "number",
                optionsResource: {
                    endpoint: "cidades",
                    labelFn: (cidade) => cidade.nome,
                    valueKey: "id",
                },
            },
        ],
    },
    atores: {
        id: "atores",
        title: "Atores",
        description: "Registro de atores principais e coadjuvantes.",
        endpoint: "ators",
        entityKey: "ator",
        columns: [
            { key: "id", label: "ID" },
            {
                key: "nome",
                label: "Nome Completo",
                render: (row) => `${row.nome} ${row.sobrenome}`,
            },
            { key: "data_estreia", label: "Estreia", type: "date" },
        ],
        formFields: [
            { name: "nome", label: "Nome", type: "text", required: true },
            { name: "sobrenome", label: "Sobrenome", type: "text", required: true },
            { name: "data_estreia", label: "Data de Estreia", type: "date", required: true },
        ],
    },
    midias: {
        id: "midias",
        title: "Catálogo de Mídias",
        description: "Controle completo de mídias e classificações.",
        endpoint: "midia",
        entityKey: "midium",
        columns: [
            { key: "id", label: "ID" },
            { key: "titulo", label: "Título" },
            { key: "ano_lancamento", label: "Ano" },
            { key: "genero_id", label: "Gênero", type: "reference", referenceField: "genero_id" },
            { key: "tipo_id", label: "Formato", type: "reference", referenceField: "tipo_id" },
            { key: "custo", label: "Custo", type: "currency" },
        ],
        formFields: [
            { name: "titulo", label: "Título", type: "text", required: true },
            { name: "ano_lancamento", label: "Ano de lançamento", type: "number", required: true },
            { name: "codigo_barras", label: "Código de Barras", type: "text", required: true },
            { name: "duracao_em_minutos", label: "Duração (min)", type: "number", required: true },
            { name: "custo", label: "Custo", type: "number", required: true },
            {
                name: "ator_principal",
                label: "Ator principal",
                type: "select",
                required: true,
                cast: "number",
                optionsResource: {
                    endpoint: "ators",
                    labelFn: (ator) => `${ator.nome} ${ator.sobrenome}`,
                    valueKey: "id",
                },
            },
            {
                name: "ator_coadjuvante",
                label: "Ator coadjuvante",
                type: "select",
                required: true,
                cast: "number",
                optionsResource: {
                    endpoint: "ators",
                    labelFn: (ator) => `${ator.nome} ${ator.sobrenome}`,
                    valueKey: "id",
                },
            },
            {
                name: "genero_id",
                label: "Gênero",
                type: "select",
                required: true,
                cast: "number",
                optionsResource: {
                    endpoint: "generos",
                    labelFn: (genero) => genero.descricao,
                    valueKey: "id",
                },
            },
            {
                name: "classificacao_etaria_id",
                label: "Classificação etária",
                type: "select",
                required: true,
                cast: "number",
                optionsResource: {
                    endpoint: "classificacao_etaria",
                    labelFn: (item) => item.descricao,
                    valueKey: "id",
                },
            },
            {
                name: "tipo_id",
                label: "Formato",
                type: "select",
                required: true,
                cast: "number",
                optionsResource: {
                    endpoint: "tipos",
                    labelFn: (tipo) => tipo.descricao ?? tipo.nome,
                    valueKey: "id",
                },
            },
            {
                name: "classificacao_interna_id",
                label: "Classificação interna",
                type: "select",
                required: true,
                cast: "number",
                optionsResource: {
                    endpoint: "classificacao_internas",
                    labelFn: (item) => `${item.descricao} (${formatCurrency(item.valor_aluguel)})`,
                    valueKey: "id",
                },
            },
        ],
    },
    locacoes: {
        id: "locacoes",
        title: "Locações",
        description: "Controle e acompanhamento das locações.",
        endpoint: "locacoes",
        entityKey: "locacao",
        columns: [
            { key: "id", label: "Protocolo" },
            {
                key: "cliente",
                label: "Cliente",
                render: (row) => row.cliente ? `${row.cliente.nome} ${row.cliente.sobrenome}` : `#${row.cliente_id}`,
            },
            { key: "data_inicio", label: "Início", type: "date" },
            { key: "data_fim", label: "Fim", type: "date" },
            {
                key: "status",
                label: "Status",
                render: (row) => row.status ?? (row.cancelada ? "Cancelada" : "Ativa"),
            },
        ],
        formFields: [
            {
                name: "cliente_id",
                label: "Cliente",
                type: "select",
                required: true,
                cast: "number",
                optionsResource: {
                    endpoint: "clientes",
                    labelFn: (cliente) => `${cliente.nome} ${cliente.sobrenome}`,
                    valueKey: "id",
                },
            },
            { name: "data_inicio", label: "Data de início", type: "date", required: true },
            { name: "data_fim", label: "Data prevista para devolução", type: "date", required: true },
            {
                name: "cancelada",
                label: "Situação",
                type: "select",
                cast: "boolean",
                defaultValue: "false",
                options: [
                    { label: "Ativa", value: "false" },
                    { label: "Cancelada", value: "true" },
                ],
            },
        ],
    },
    exemplares: {
        id: "exemplares",
        title: "Exemplares",
        description: "Controle físico das cópias disponíveis.",
        endpoint: "exemplares",
        entityKey: "exemplar",
        columns: [
            { key: "codigo_interno", label: "Código" },
            {
                key: "midia_id",
                label: "Mídia",
                type: "reference",
                referenceField: "midia_id",
            },
            { key: "disponivel", label: "Disponível", type: "boolean" },
        ],
        formFields: [
            {
                name: "midia_id",
                label: "Mídia",
                type: "select",
                required: true,
                cast: "number",
                optionsResource: {
                    endpoint: "midia",
                    labelFn: (midia) => midia.titulo,
                    valueKey: "id",
                },
            },
            {
                name: "disponivel",
                label: "Disponibilidade",
                type: "select",
                cast: "boolean",
                defaultValue: "true",
                options: [
                    { label: "Disponível", value: "true" },
                    { label: "Indisponível", value: "false" },
                ],
            },
        ],
    },
    generos: {
        id: "generos",
        title: "Gêneros",
        description: "Curadoria dos gêneros disponíveis.",
        endpoint: "generos",
        entityKey: "genero",
        columns: [
            { key: "id", label: "ID" },
            { key: "descricao", label: "Descrição" },
        ],
        formFields: [
            { name: "descricao", label: "Descrição", type: "text", required: true },
        ],
    },
};

const MENU_GROUPS = [
    {
        title: "Principal",
        items: [
            { id: "dashboard", label: "Dashboard", icon: <BarChart3 className="h-5 w-5" /> },
        ],
    },
    {
        title: "Gestão",
        items: [
            { id: "clientes", label: "Clientes", icon: <Users className="h-5 w-5" /> },
            { id: "locacoes", label: "Locações", icon: <ActivitySquare className="h-5 w-5" /> },
            { id: "midias", label: "Catálogo", icon: <Film className="h-5 w-5" /> },
            { id: "atores", label: "Atores", icon: <Disc2 className="h-5 w-5" /> },
        ],
    },
    {
        title: "Estoque",
        items: [
            { id: "exemplares", label: "Exemplares", icon: <SquareStack className="h-5 w-5" /> },
            { id: "generos", label: "Gêneros", icon: <ActivitySquare className="h-5 w-5" /> },
        ],
    },
];

const WindowShell = ({ title, subtitle, icon, actions, children }) => (
    <section className="relative rounded-3xl border border-white/15 bg-slate-900/70 p-8 shadow-[0_30px_120px_rgba(2,6,23,0.7)] backdrop-blur-3xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div>
                <div className="flex items-center gap-3 text-white text-xl font-semibold">
                    <span className="text-2xl">{icon}</span>
                    {title}
                </div>
                <p className="text-sm text-white/60">{subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">{actions}</div>
        </div>
        <div className="pt-6">{children}</div>
    </section>
);

const DashboardOverview = () => {
    const [stats, setStats] = useState({
        clientes: 0,
        midias: 0,
        locacoes: 0,
        exemplares: 0,
    });
    const [recentLocacoes, setRecentLocacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                const [clientes, midias, locacoes, exemplares] = await Promise.all([
                    listResource("clientes"),
                    listResource("midia"),
                    listResource("locacoes"),
                    listResource("exemplares"),
                ]);

                setStats({
                    clientes: clientes.length,
                    midias: midias.length,
                    locacoes: locacoes.length,
                    exemplares: exemplares.length,
                });
                setRecentLocacoes(locacoes.slice(0, 5));
            } catch (err) {
                setError(extractError(err));
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    return (
        <WindowShell
            title="Painel Geral"
            subtitle="Resumo automatizado da operação da locadora"
            icon="📊"
            actions={
                <Button variant="secondary" size="sm" onClick={() => window.location.reload()}>
                    <RefreshCcw className="mr-2 h-4 w-4" /> Atualizar
                </Button>
            }
        >
            {error && (
                <div className="mb-6 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    {error}
                </div>
            )}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[
                    { label: "Clientes ativos", value: stats.clientes, accent: "from-indigo-500/60 to-cyan-500/50" },
                    { label: "Mídias no catálogo", value: stats.midias, accent: "from-purple-500/60 to-pink-500/50" },
                    { label: "Locações registradas", value: stats.locacoes, accent: "from-emerald-500/60 to-lime-500/50" },
                    { label: "Exemplares disponíveis", value: stats.exemplares, accent: "from-amber-500/60 to-orange-500/40" },
                ].map((card) => (
                    <Card key={card.label} className="border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-900/40">
                        <CardHeader>
                            <CardTitle className="text-sm uppercase tracking-wide text-white/70">
                                {card.label}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-black" style={{ textShadow: "0 10px 40px rgba(0,0,0,0.45)" }}>
                                {loading ? "…" : card.value}
                            </p>
                            <div className={`mt-4 h-1.5 rounded-full bg-gradient-to-r ${card.accent}`} />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="mt-10">
                <h3 className="mb-4 text-lg font-semibold text-white">Últimas locações</h3>
                <div className="overflow-hidden rounded-2xl border border-white/10">
                    <table className="w-full text-left text-sm text-white/80">
                        <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/60">
                            <tr>
                                <th className="px-5 py-3">Protocolo</th>
                                <th className="px-5 py-3">Cliente</th>
                                <th className="px-5 py-3">Início</th>
                                <th className="px-5 py-3">Fim</th>
                                <th className="px-5 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-6 text-center text-white/60">
                                        Carregando…
                                    </td>
                                </tr>
                            ) : recentLocacoes.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-5 py-6 text-center text-white/60">
                                        Nenhuma locação encontrada.
                                    </td>
                                </tr>
                            ) : (
                                recentLocacoes.map((locacao) => (
                                    <tr key={locacao.id} className="border-t border-white/5">
                                        <td className="px-5 py-4 font-semibold text-white">{locacao.id}</td>
                                        <td className="px-5 py-4">
                                            {locacao.cliente ? `${locacao.cliente.nome} ${locacao.cliente.sobrenome}` : `#${locacao.cliente_id}`}
                                        </td>
                                        <td className="px-5 py-4">{formatDate(locacao.data_inicio)}</td>
                                        <td className="px-5 py-4">{formatDate(locacao.data_fim)}</td>
                                        <td className="px-5 py-4">
                                            <Badge variant={locacao.cancelada ? "danger" : "success"}>
                                                {locacao.status ?? (locacao.cancelada ? "Cancelada" : "Ativa")}
                                            </Badge>
                                        </td>
                                    </tr>
                                )))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </WindowShell>
    );
};

const CrudResource = ({ config }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [formValues, setFormValues] = useState(buildInitialValues(config));
    const [selectOptions, setSelectOptions] = useState({});
    const [error, setError] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadItems = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await listResource(config.endpoint);
            setItems(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(extractError(err));
        } finally {
            setLoading(false);
        }
    }, [config.endpoint]);

    const loadSelectOptions = useCallback(async () => {
        const selectFields = config.formFields.filter(
            (field) => field.type === "select" && field.optionsResource,
        );

        if (!selectFields.length) return;

        const entries = await Promise.all(
            selectFields.map(async (field) => {
                try {
                    const options = await fetchOptions(field.optionsResource);
                    return [field.name, options];
                } catch (err) {
                    console.error(`Falha ao carregar opções de ${field.name}`, err);
                    return [field.name, []];
                }
            }),
        );

        setSelectOptions(Object.fromEntries(entries));
    }, [config.formFields]);

    useEffect(() => {
        setFormValues(buildInitialValues(config));
        setCurrentItem(null);
        setSelectOptions({});
        loadItems();
        loadSelectOptions();
    }, [config, loadItems, loadSelectOptions]);

    const filteredItems = useMemo(() => {
        if (!searchTerm) return items;
        return items.filter((item) =>
            JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [items, searchTerm]);

    const resolveOptionLabel = (fieldName, value) => {
        const options = selectOptions[fieldName] ?? [];
        return (
            options.find((option) => `${option.value}` === `${value}`)?.label ?? value ?? "—"
        );
    };

    const columnHelpers = {
        resolveOptionLabel,
    };

    const renderCell = (column, row) => {
        if (column.render) {
            return column.render(row, columnHelpers);
        }

        const value = row[column.key];

        if (column.type === "reference") {
            return resolveOptionLabel(column.referenceField ?? column.key, value);
        }
        if (column.type === "date") {
            return formatDate(value);
        }
        if (column.type === "boolean") {
            return value ? "Sim" : "Não";
        }
        if (column.type === "currency") {
            return formatCurrency(value);
        }
        return value ?? "—";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFeedback(null);
        try {
            const payload = buildPayload(config.formFields, formValues);
            if (currentItem) {
                await updateResource(config.endpoint, config.entityKey, currentItem.id, payload);
                setFeedback({ type: "success", message: "Registro atualizado com sucesso." });
            } else {
                await createResource(config.endpoint, config.entityKey, payload);
                setFeedback({ type: "success", message: "Registro criado com sucesso." });
            }
            setModalOpen(false);
            setFormValues(buildInitialValues(config));
            setCurrentItem(null);
            loadItems();
        } catch (err) {
            setFeedback({ type: "error", message: extractError(err) });
        } finally {
            setIsSubmitting(false);
        }
    };

    const openModalForCreate = () => {
        setFormValues(buildInitialValues(config));
        setCurrentItem(null);
        setModalOpen(true);
    };

    const openModalForEdit = (item) => {
        const values = {};
        config.formFields.forEach((field) => {
            const value = item[field.name];
            if (value == null) {
                values[field.name] = field.defaultValue ?? "";
                return;
            }
            if (field.type === "select") {
                values[field.name] = `${value}`;
            } else {
                values[field.name] = value;
            }
        });
        setFormValues(values);
        setCurrentItem(item);
        setModalOpen(true);
    };

    const handleDelete = async (item) => {
        const confirmation = window.confirm(
            `Deseja remover "${item[config.columns[1]?.key] ?? item.id}"?`,
        );
        if (!confirmation) return;
        try {
            await deleteResource(config.endpoint, item.id);
            setFeedback({ type: "success", message: "Registro removido." });
            loadItems();
        } catch (err) {
            setFeedback({ type: "error", message: extractError(err) });
        }
    };

    return (
        <WindowShell
            title={config.title}
            subtitle={config.description}
            icon="💿"
            actions={
                <>
                    <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-1.5">
                        <Search className="h-4 w-4 text-white/60" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Filtrar registros"
                            className="bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none"
                        />
                    </div>
                    <Button variant="secondary" size="sm" onClick={loadItems}>
                        <RefreshCcw className="mr-2 h-4 w-4" /> Atualizar
                    </Button>
                    <Button size="sm" onClick={openModalForCreate}>
                        <Plus className="mr-2 h-4 w-4" /> Novo registro
                    </Button>
                </>
            }
        >
            {feedback && (
                <div
                    className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${
                        feedback.type === "error"
                            ? "border-red-400/40 bg-red-500/10 text-red-100"
                            : "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                    }`}
                >
                    {feedback.message}
                </div>
            )}
            {error && (
                <div className="mb-6 rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    {error}
                </div>
            )}
            <div className="overflow-hidden rounded-3xl border border-white/10">
                <table className="w-full text-left text-sm text-white/80">
                    <thead className="bg-white/5 text-xs uppercase tracking-wide text-white/60">
                        <tr>
                            {config.columns.map((column) => (
                                <th key={column.key} className="px-5 py-3">
                                    {column.label}
                                </th>
                            ))}
                            <th className="px-5 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={config.columns.length + 1} className="px-5 py-6 text-center text-white/60">
                                    <Loader2 className="mx-auto mb-2 h-6 w-6 animate-spin" />
                                    Carregando…
                                </td>
                            </tr>
                        ) : filteredItems.length === 0 ? (
                            <tr>
                                <td colSpan={config.columns.length + 1} className="px-5 py-6 text-center text-white/60">
                                    Nenhum registro encontrado.
                                </td>
                            </tr>
                        ) : (
                            filteredItems.map((item) => (
                                <tr key={item.id} className="border-t border-white/5">
                                    {config.columns.map((column) => (
                                        <td key={`${item.id}-${column.key}`} className="px-5 py-4">
                                            {renderCell(column, item)}
                                        </td>
                                    ))}
                                    <td className="px-5 py-4">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="secondary"
                                                size="icon"
                                                onClick={() => openModalForEdit(item)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDelete(item)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="max-h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>{currentItem ? "Editar registro" : "Novo registro"}</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo para {currentItem ? "atualizar" : "cadastrar"} o recurso.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto pr-2">
                        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                            {config.formFields.map((field) => (
                                <div key={field.name} className="space-y-2">
                                    <Label htmlFor={field.name}>{field.label}</Label>
                                    {field.type === "select" ? (
                                        <Select
                                            value={`${formValues[field.name] ?? ""}`}
                                            onValueChange={(value) =>
                                                setFormValues((prev) => ({ ...prev, [field.name]: value }))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {(field.options ?? selectOptions[field.name] ?? []).map((option) => (
                                                    <SelectItem key={option.value} value={`${option.value}`}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input
                                            id={field.name}
                                            type={field.type === "number" ? "number" : field.type ?? "text"}
                                            value={formValues[field.name] ?? ""}
                                            onChange={(event) =>
                                                setFormValues((prev) => ({ ...prev, [field.name]: event.target.value }))
                                            }
                                            required={field.required}
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="ghost" onClick={() => setModalOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Salvando..." : "Salvar"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </WindowShell>
    );
};

const Sidebar = ({ activeItem, onChange }) => (
    <aside className="fixed left-0 top-0 flex h-full w-72 flex-col border-r border-white/10 bg-slate-950/80 px-6 py-8 text-white shadow-2xl shadow-black/70 backdrop-blur-2xl">
        <div className="mb-8 flex items-center gap-3">
            <img src={logo} alt="Locadora" className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5 p-2" />
            <div>
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Old Store Media</p>
                <p className="text-lg font-semibold">Console de gestão</p>
            </div>
        </div>
        <nav className="flex-1 space-y-8 overflow-y-auto pr-2">
            {MENU_GROUPS.map((group) => (
                <div key={group.title}>
                    <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/50">{group.title}</p>
                    <div className="space-y-2">
                        {group.items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onChange(item.id)}
                                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                                    item.id === activeItem
                                        ? "border-indigo-400/60 bg-indigo-500/10 text-white"
                                        : "border-transparent bg-white/5 text-white/70 hover:border-white/20"
                                }`}
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                                    {item.icon}
                                </span>
                                <span className="font-semibold">{item.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </nav>
        <div className="pt-4">
            <Button variant="secondary" className="w-full">
                <LogOut className="mr-2 h-4 w-4" /> Sair
            </Button>
        </div>
    </aside>
);

const Locadora = () => {
    const [activeView, setActiveView] = useState("dashboard");

    const renderView = () => {
        if (activeView === "dashboard") {
            return <DashboardOverview />;
        }
        const config = RESOURCE_CONFIGS[activeView];
        if (!config) {
            return (
                <WindowShell title="Em construção" subtitle="Esta área ainda será implementada." icon="🛠" actions={null}>
                    <p className="text-white/70">Selecione outro módulo para continuar.</p>
                </WindowShell>
            );
        }
        return <CrudResource key={config.id} config={config} />;
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#04040c] via-[#050b19] to-[#0a1327] text-white">
            <Sidebar activeItem={activeView} onChange={setActiveView} />
            <main className="ml-72 flex-1">
                <div className="flex flex-col gap-8 p-10">
                    <header className="rounded-3xl border border-white/10 bg-white/5 px-8 py-6 backdrop-blur-2xl">
                        <h1 className="mt-3 text-3xl font-black">Sistema de locação</h1>
                    </header>
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

export default Locadora;