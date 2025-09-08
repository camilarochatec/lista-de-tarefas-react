import { useState, useRef } from 'react';

// Componente para um único card de tarefa
function Tarefa({ tarefa, onEdit, onDelete }) {
    const formatarData = (data) => {
        if (!data) return '';
        const dataObj = new Date(data + 'T00:00:00');
        return dataObj.toLocaleDateString('pt-BR');
    };

    return (
        <div className="bg-white shadow rounded p-4 dark:bg-slate-400 flex flex-col justify-between">
            <div>
                <h3 className="font-bold text-slate-800 dark:text-black">{tarefa.titulo}</h3>
                <p className="text-[14px] text-gray-500 line-clamp-3 mb-4 dark:text-black/80">{tarefa.descricao}</p>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-300 dark:border-black/20">
                <span className="font-bold text-[10px] text-slate-600 dark:text-black">{formatarData(tarefa.data)}</span>
                <div className="flex gap-3">
                    <box-icon name='pencil' class="cursor-pointer" onClick={() => onEdit(tarefa)}></box-icon>
                    <box-icon name='trash' class="cursor-pointer" onClick={() => onDelete(tarefa.id)}></box-icon>
                </div>
            </div>
        </div>
    );
}

// Componente principal que contém toda a lógica da lista e da gaveta
const Card = ({ tasks, onTasksUpdate }) => {
    // ESTADO: Controla apenas o que é relevante para este componente
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [formMode, setFormMode] = useState('create');
    const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);

    // REFS: Para acessar os formulários
    const formCriarRef = useRef(null);
    const formEditarRef = useRef(null);

    // Funções para controlar a gaveta (abrir/fechar)
    const handleAbrirGaveta = (tarefaParaEditar = null) => {
        if (tarefaParaEditar) {
            setFormMode('edit');
            setTarefaEmEdicao(tarefaParaEditar);
        } else {
            setFormMode('create');
            setTarefaEmEdicao(null);
        }
        setIsDrawerOpen(true);
    };

    const handleFecharGaveta = () => {
        setIsDrawerOpen(false);
    };

    // Função para criar tarefa
    const handleCriarTarefa = async (event) => {
        event.preventDefault();
        const dados = new FormData(formCriarRef.current);
        const novaTarefa = Object.fromEntries(dados.entries());
        novaTarefa.data = new Date().toISOString().split('T')[0];

        await fetch("http://localhost:8000/tarefas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaTarefa)
        });

        onTasksUpdate(); // Avisa o App para buscar as tarefas novamente
        handleFecharGaveta();
    };

    // Função para editar tarefa
    const handleEditarTarefa = async (event) => {
        event.preventDefault();
        const dados = new FormData(formEditarRef.current);
        const tarefaAtualizada = Object.fromEntries(dados.entries());
        tarefaAtualizada.data = tarefaEmEdicao.data;

        await fetch(`http://localhost:8000/tarefas/${tarefaEmEdicao.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tarefaAtualizada)
        });

        onTasksUpdate(); // Avisa o App para buscar as tarefas novamente
        handleFecharGaveta();
    };

    // Função para deletar tarefa
    const handleDeletarTarefa = async (idDaTarefa) => {
        if (window.confirm("Deseja realmente apagar este item?")) {
            await fetch(`http://localhost:8000/tarefas/${idDaTarefa}`, {
                method: "DELETE",
            });
            onTasksUpdate(); // Avisa o App para buscar as tarefas novamente
        }
    };

    return (
        <>
            {/* Conteúdo Principal */}
            <div className="px-4 md:px-[60px] pt-[60px]">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-2xl md:text-[36px] text-black/50 dark:text-slate-100">Lista de tarefas</h2>
                    <button
                        onClick={() => handleAbrirGaveta()}
                        className="h-[46px] flex gap-4 items-center bg-black dark:bg-slate-400 text-white dark:text-black duration-150 rounded px-4 fill-black uppercase font-bold text-[12px]">
                        <box-icon type='solid' name='plus-circle' class="fill-white dark:fill-black duration-150"></box-icon>
                        Nova tarefa
                    </button>
                </div>

                {/* Grid das listas de tarefas criadas */}
                <div id="lista-de-tarefas" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    {tasks.map(tarefa => (
                        <Tarefa
                            key={tarefa.id}
                            tarefa={tarefa}
                            onEdit={handleAbrirGaveta}
                            onDelete={handleDeletarTarefa}
                        />
                    ))}
                </div>
            </div>

            {/* Gaveta (Drawer) e Sombra (Overlay) */}
            <div
                onClick={handleFecharGaveta}
                className={`w-full h-screen bg-black/90 fixed top-0 left-0 duration-150 transition-opacity ${isDrawerOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
            </div>
            <div
                className={`w-[90%] sm:w-[400px] h-screen bg-white dark:bg-slate-800 dark:text-white p-4 fixed top-0 right-0 duration-300 ease-in-out transform transition-transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Formulários de Criar e Editar */}
                <form ref={formCriarRef} onSubmit={handleCriarTarefa} className={formMode === 'create' ? '' : 'hidden'}>
                    <h3 className="flex justify-between items-center text-[20px] font-bold">
                        Cadastrar
                        <box-icon name='x' class="cursor-pointer" onClick={handleFecharGaveta}></box-icon>
                    </h3>
                    <label htmlFor="titulo" className="block mb-1 mt-4 font-bold">Titulo</label>
                    <input name="titulo" className="w-full h-[40px] mb-3 pl-3 border-2 border-slate-300 focus:border-black rounded dark:text-black" type="text" placeholder="Digite um titulo" required />
                    <label htmlFor="descricao" className="block mb-1 font-bold">Descrição</label>
                    <textarea name="descricao" className="w-full h-[120px] mb-3 p-3 border-2 border-slate-300 focus:border-black rounded dark:text-black" required></textarea>
                    <button type="submit" className="w-full h-[40px] rounded bg-black dark:bg-slate-400 text-white dark:text-black text-center font-bold cursor-pointer">Criar</button>
                </form>

                <form ref={formEditarRef} onSubmit={handleEditarTarefa} className={formMode === 'edit' ? '' : 'hidden'}>
                    <h3 className="flex justify-between items-center text-[20px] font-bold">
                        Atualizar
                        <box-icon name='x' class="cursor-pointer" onClick={handleFecharGaveta}></box-icon>
                    </h3>
                    <label htmlFor="edit-titulo" className="block mb-1 mt-4 font-bold">Título</label>
                    <input name="titulo" className="w-full h-[40px] mb-3 pl-3 border-2 border-slate-300 focus:border-black rounded dark:text-black" type="text" placeholder="Digite um título" defaultValue={tarefaEmEdicao?.titulo} required />
                    <label htmlFor="edit-descricao" className="block mb-1 font-bold">Descrição</label>
                    <textarea name="descricao" className="w-full h-[120px] mb-3 p-3 border-2 border-slate-300 focus:border-black rounded dark:text-black" placeholder="Digite aqui" defaultValue={tarefaEmEdicao?.descricao} required></textarea>
                    <button type="submit" className="w-full h-[40px] rounded bg-black dark:bg-slate-400 text-white dark:text-black text-center font-bold cursor-pointer">Editar</button>
                </form>
            </div>
        </>
    );
}

export default Header;