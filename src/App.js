import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import RoutesConfig from './routes/Routes';
import { applySavedTheme } from './utils/theme/toogleTheme';
import "./index.css";

function App() {
  applySavedTheme();
  return (
    <>
      <ScrollToTop />
      <Toaster
        toastOptions={{ className: "notifications" }}
      />
      <main className='content' id="main-content">
        <RoutesConfig />
      </main>
    </>
  );
}

export default App;
