// src/components/Card.jsx

import { useState } from 'react';
import Gaveta from './Gaveta'; // 👈 1. Importe o novo componente

// Componente para um único card de tarefa (permanece igual)
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

// Componente principal que agora gerencia o estado da gaveta
const Card = ({ tasks, onTasksUpdate }) => {
    // ESTADO: Controla a visibilidade e o modo da gaveta
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [formMode, setFormMode] = useState('create'); // 'create' ou 'edit'
    const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);

    // Funções para controlar a gaveta
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

    // Função para deletar tarefa (continua aqui, pois não pertence à gaveta)
    const handleDeletarTarefa = async (idDaTarefa) => {
        if (window.confirm("Deseja realmente apagar este item?")) {
            await fetch(`http://localhost:8000/tarefas/${idDaTarefa}`, {
                method: "DELETE",
            });
            onTasksUpdate();
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

            {/* 2. Renderize o componente Gaveta e passe os estados e funções como props */}
            <Gaveta
                isOpen={isDrawerOpen}
                onClose={handleFecharGaveta}
                mode={formMode}
                tarefaParaEditar={tarefaEmEdicao}
                onTasksUpdate={onTasksUpdate}
            />
        </>
    );
}

export default Card;