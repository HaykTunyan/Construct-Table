import { HeaderComponent } from '../components';
import './App.css';
import { RoutersComponent } from '../router/router';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderComponent />
      </header>
      <main role='main'>
        <RoutersComponent />
      </main>
    </div>
  );
}

export default App;
