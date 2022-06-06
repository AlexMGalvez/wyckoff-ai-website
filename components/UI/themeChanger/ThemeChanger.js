import { useState, useEffect } from "react";
import { useTheme } from 'next-themes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

import classes from './ThemeChanger.module.css';

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const inputHandler = (event) => {
    if (event.target.checked == true) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null
  return (
    <ul className={classes["navbar-buttons"]}>
      <li>
        <label className={classes["switch"]}>
          <input onChange={inputHandler} type="checkbox"/>
            <span className={`${classes["slider"]} ${classes["round"]}`}></span>
        </label>
      </li>
      {theme == "light" ?  <li><FontAwesomeIcon icon={faSun} /></li> : <li><FontAwesomeIcon icon={faMoon} /></li>}
    </ul>
  )
}

export default ThemeChanger;