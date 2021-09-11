import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';

function App() {
   return (
      <div className="App">
         <header className="App-header">
            <AppNavbar />
            <ShoppingList />
         </header>
      </div>
   );
}

export default App;
