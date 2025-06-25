import RoutesConfig from './routes/Routes';
import { applySavedTheme } from './utils/theme/toogleTheme';

function App() {
  applySavedTheme();
  return (
    <>
      <main className='content' id="main-content">
        <RoutesConfig />
      </main>
    </>
  );
}

export default App;
