import { HeaderComponent } from '../components';
import logo from '../logo.svg';
import { TableView } from '../pages';
import './App.css';
import { RoutersComponent } from '../router/router';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HeaderComponent />
      </header>
      <main role='main'>
        <TableView />
        {/* <RoutersComponent /> */}
      </main>
    </div>
  );
}

export default App;
