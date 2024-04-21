import './App.css';
import { Link } from 'react-router-dom';
function About() {
  
  return (
    <div className="App">
    <header className="App-header">
      <h1>About</h1>
      <nav>
        <Link to="/">Pokedex</Link>
      </nav>
    </header>
    <body>
      <p>This is my implementation of Pokedex in React using PokeApi</p>
    </body>
    </div>
  );
}

export default About;
