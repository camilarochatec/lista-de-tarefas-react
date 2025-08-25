const Header = () => {
    return (
        <header id="header" className="bg-white dark:bg-black shadow-lg flex justify-between items-center px-[60px] py-4 duration-150">
            <div className="flex items-center gap-[70px]">
                <h1 className="font-bold text-[26px] dark:text-white">Tarefas</h1>
                <input onkeyup="pesquisar(event.target.value)" className="bg-black/5 w-[500px] h-[46px] rounded pl-4 dark:bg-white/5 dark:placeholder-white/50 dark:text-white" type="text" placeholder="Pesquisar"/>
            </div>
            <box-icon type='solid' name='moon' className="duration-150 dark:hidden" onclick="mudarTema()"></box-icon>
            <box-icon type='solid' name='sun' className="fill-verde duration-150 hidden dark:block" onclick="mudarTema()"></box-icon>
        </header>
    );
}

export default Header;