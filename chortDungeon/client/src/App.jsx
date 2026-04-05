import Desktop from './Desktop';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="App">
          <Desktop/>
      </div>
    </AppProvider>
  );
}

export default App;
