import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
        <Main />
      </header>
    </div>
  );
}

export default App;
