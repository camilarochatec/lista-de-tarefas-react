// src/components/Gaveta.jsx

import { useRef, useEffect } from 'react';

// O componente recebe todas as informações e funções que precisa do componente pai via props
function Gaveta({ isOpen, onClose, mode, tarefaParaEditar, onTasksUpdate }) {
    const formCriarRef = useRef(null);
    const formEditarRef = useRef(null);

    // Efeito para limpar o formulário de criação quando a gaveta é fechada
    useEffect(() => {
        if (!isOpen) {
            formCriarRef.current?.reset();
        }
    }, [isOpen]);

    // Função para criar tarefa
    const handleCriarTarefa = async (event) => {
        event.preventDefault();
        const dados = new FormData(formCriarRef.current);
        const novaTarefa = Object.fromEntries(dados.entries());
        
        await fetch("http://localhost:8000/tarefas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novaTarefa)
        });

        onTasksUpdate(); // Avisa o App para buscar as tarefas novamente
        onClose(); // Fecha a gaveta usando a função do pai
    };

    // Função para editar tarefa
    const handleEditarTarefa = async (event) => {
        event.preventDefault();
        const dados = new FormData(formEditarRef.current);
        const tarefaAtualizada = Object.fromEntries(dados.entries());

        await fetch(`http://localhost:8000/tarefas/${tarefaParaEditar.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tarefaAtualizada)
        });

        onTasksUpdate(); // Avisa o App para buscar as tarefas novamente
        onClose(); // Fecha a gaveta usando a função do pai
    };

    return (
        <>
            {/* Sombra (Overlay) */}
            <div
                onClick={onClose} // Fecha ao clicar no fundo
                className={`w-full h-screen bg-black/90 fixed top-0 left-0 duration-150 transition-opacity ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}
            ></div>

            {/* Painel da Gaveta */}
            <div
                className={`w-[90%] sm:w-[400px] h-screen bg-white dark:bg-slate-800 dark:text-white p-4 fixed top-0 right-0 duration-300 ease-in-out transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Formulário de Criar */}
                <form ref={formCriarRef} onSubmit={handleCriarTarefa} className={mode === 'create' ? '' : 'hidden'}>
                    <h3 className="flex justify-between items-center text-[20px] font-bold">
                        Cadastrar
                        <box-icon name='x' class="cursor-pointer" onClick={onClose}></box-icon>
                    </h3>
                    <label htmlFor="titulo" className="block mb-1 mt-4 font-bold">Titulo</label>
                    <input name="titulo" className="w-full h-[40px] mb-3 pl-3 border-2 border-slate-300 focus:border-black rounded dark:text-black" type="text" placeholder="Digite um titulo" required />
                    <label htmlFor="descricao" className="block mb-1 font-bold">Descrição</label>
                    <textarea name="descricao" className="w-full h-[120px] mb-3 p-3 border-2 border-slate-300 focus:border-black rounded dark:text-black" required></textarea>
                    <button type="submit" className="w-full h-[40px] rounded bg-black dark:bg-slate-400 text-white dark:text-black text-center font-bold cursor-pointer">Criar</button>
                </form>

                {/* Formulário de Editar */}
                <form ref={formEditarRef} onSubmit={handleEditarTarefa} className={mode === 'edit' ? '' : 'hidden'}>
                    <h3 className="flex justify-between items-center text-[20px] font-bold">
                        Atualizar
                        <box-icon name='x' class="cursor-pointer" onClick={onClose}></box-icon>
                    </h3>
                    <label htmlFor="titulo" className="block mb-1 mt-4 font-bold">Título</label>
                    <input name="titulo" className="w-full h-[40px] mb-3 pl-3 border-2 border-slate-300 focus:border-black rounded dark:text-black" type="text" placeholder="Digite um título" defaultValue={tarefaParaEditar?.titulo} required />
                    <label htmlFor="descricao" className="block mb-1 font-bold">Descrição</label>
                    <textarea name="descricao" className="w-full h-[120px] mb-3 p-3 border-2 border-slate-300 focus:border-black rounded dark:text-black" placeholder="Digite aqui" defaultValue={tarefaParaEditar?.descricao} required></textarea>
                    <button type="submit" className="w-full h-[40px] rounded bg-black dark:bg-slate-400 text-white dark:text-black text-center font-bold cursor-pointer">Editar</button>
                </form>
            </div>
        </>
    );
}

export default Gaveta;