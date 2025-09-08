import { useState, useRef, useEffect } from 'react';

// Recebe as funções 'onSearch' e 'setDarkMode' do componente App
const Header = ({ onSearch, setDarkMode }) => {
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const searchInputRef = useRef(null);

  // Foca no input quando ele se torna visível
  useEffect(() => {
    if (isMobileSearchVisible && window.innerWidth < 768) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchVisible]);

  // função 'mostrarInput'
  const handleShowMobileInput = () => {
    setIsMobileSearchVisible(true);
  };

  // função 'esconderInput'
  const handleHideMobileInput = () => {
    if (window.innerWidth < 768) {
      setIsMobileSearchVisible(false);
    }
  };

  return (
    <header
      id="header"
      className="bg-white shadow-lg dark:bg-black dark:shadow-slate-900 flex justify-between items-center px-4 md:px-[60px] py-4 duration-150"
    >
      <div className="flex flex-1 md:flex-initial items-center gap-4 md:gap-[70px]">
        {/* O título some no mobile quando a pesquisa está ativa */}
        <h1 className={`font-bold text-[26px] dark:text-slate-300 ${isMobileSearchVisible && 'hidden'} md:block`}>
          Tarefas
        </h1>

        {/* O input de pesquisa */}
        <input
          ref={searchInputRef}
          onKeyUp={(e) => onSearch(e.target.value)} // Avisa o App sobre a pesquisa
          onBlur={handleHideMobileInput} // Esconde no mobile ao perder o foco
          id="search-input"
          className={`w-full bg-black/5 md:w-[500px] h-[46px] rounded pl-4 dark:border-2 border-slate-400 dark:text-white
            ${isMobileSearchVisible ? 'block' : 'hidden'} md:block`}
          type="text"
          placeholder="Pesquisar"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* O ícone de pesquisa só aparece se o input estiver escondido no mobile */}
        {!isMobileSearchVisible && (
          <box-icon name='search' class="md:hidden dark:fill-slate-400 cursor-pointer" onClick={handleShowMobileInput}></box-icon>
        )}
        
        {/* Ícones de tema que chamam a função do App */}
        <box-icon type='solid' name='moon' class="duration-150 dark:hidden cursor-pointer" onClick={() => setDarkMode(true)}></box-icon>
        <box-icon type='solid' name='sun' class="fill-slate-400 duration-150 hidden dark:block cursor-pointer" onClick={() => setDarkMode(false)}></box-icon>
      </div>
    </header>
  );
}

export default Header;

// filepath: c:\Users\construtora\Documents\projeto-tarefas-react\tailwind.config.js
module.exports = {
  darkMode: 'class',
  // ...outros configs...
}