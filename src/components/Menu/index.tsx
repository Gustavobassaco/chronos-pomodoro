import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    return (localStorage.getItem('theme') as AvailableThemes) || 'dark';
  });

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }

  // useEffect(() => {
  //   console.log('use sem dependência');
  // }); // executado toda vez que o componente renderiza

  // useEffect(() => {
  //   console.log('use com array sem dependencias');
  // }, []); // executado apenas quando o react monta o componente na tela pela primeira vez

  useEffect(() => {
    // console.log('theme changed');
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    // return () => {
    //   console.log('este componente será atualizado')
    // }
  }, [theme]); // executa apenas quando o valor da dependencia muda

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  return (
    <div className={styles.menu}>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='ir para a home'
        title='Home'
      >
        <HouseIcon />
      </a>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='ver histórico'
        title='Histórico'
      >
        <HistoryIcon />
      </a>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='ir para a configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </a>
      <a
        className={styles.menuLink}
        href='#'
        aria-label='alterar tema'
        title='Tema'
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </a>
    </div>
  );
}
