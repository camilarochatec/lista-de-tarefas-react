import { useState, useEffect, useCallback } from 'react';

import Card from './components/Card';
import Header from './components/Header';


function App() {
  // Estados principais que controlam toda a aplicação
  const [allTasks, setAllTasks] = useState([]); // Lista original de tarefas
  const [searchTerm, setSearchTerm] = useState(''); // Termo da pesquisa
  const [darkMode, setDarkMode] = useState(false);

  // Função para buscar as tarefas (igual a sua, mas usando async/await)
  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/tarefas");
      const data = await response.json();
      setAllTasks(data); // Guarda a lista completa no estado
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }, []);

  // Busca as tarefas uma vez quando a aplicação carrega
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Filtra as tarefas com base no termo de pesquisa
  const filteredTasks = allTasks.filter(task =>
    task.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen">
      <Header
        pesquisa={setSearchTerm}
        setDarkMode={setDarkMode}
      />
      <main>
        <Card
          tasks={filteredTasks} // Passa apenas as tarefas filtradas
          onTasksUpdate={fetchTasks} // Passa uma função para o Card poder recarregar a lista
        />
      </main>
    </div>
  );
}

export default App;