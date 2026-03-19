function Header({ theme }) {
  const isDark = theme === "dark";

  return (
    <h1
      className={`flex text-3xl font-bold font-serif mb-6 justify-center pt-3 animate-text-pop ${
        isDark
          ? "text-white animate-text-glow-dark"
          : "text-slate-900 animate-text-glow-light"
      }`}
    >
      Task Manager
    </h1>
  );
}

export default Header;