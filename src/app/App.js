import { HeaderComponent } from '../components';
import logo from '../logo.svg';
import { TableView } from '../pages';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderComponent />
      </header>
      <main role='main'>
        <TableView />
      </main>
    </div>
  );
}

export default App;
