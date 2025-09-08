import { useState, useEffect, useCallback } from 'react';
import Card from './components/Card';
import Header from './components/Header';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-slate-100 dark:bg-slate-900 min-h-screen">
        <Header
          setDarkMode={setDarkMode}
          onSearch={setSearchTerm}
        />
        <main>
          <Card
            tasks={filteredTasks}
            onTasksUpdate={fetchTasks}
          />
        </main>
      </div>
    </div>
  );
}

export default App;