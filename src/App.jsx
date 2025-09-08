import { useState, useEffect, useCallback } from 'react';
import Card from './components/Card';
import Header from './components/Header';


function App() {
  // Estados principais que controlam toda a aplicação
  const [allTasks, setAllTasks] = useState([]); // Lista original de tarefas
  const [searchTerm, setSearchTerm] = useState(''); // Termo da pesquisa
  const [darkMode, setDarkMode] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/tarefas");
      const data = await response.json();
      setAllTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }, []);

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

  const filteredTasks = allTasks.filter(task =>
    (task.titulo || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-100 dark:bg-slate-900 min-h-screen">
      <Header
        pesquisa={setSearchTerm}
        setDarkMode={setDarkMode}
      />

        <main>
          <Card
            tasks={filteredTasks}
            onTasksUpdate={fetchTasks}
          />
        </main>
      </div>
    
  );
}

export default App;