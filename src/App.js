import './App.css';
import Routers from './Pages/Routes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./redux/store";
// import 'antd/dist/antd.css';



function App() {

  console.log = () => { }
  // const primaryTheme = createTheme({
  //   palette: {
  //     background: {
  //       paper: "#1F1D2B",
  //       default: "#252836",
  //     },
  //     primary: {
  //       light: "#2d52ad",
  //       main: "#23418a",
  //       dark: "#152347",
  //     }, secondary: {
  //       light: "#63dbc9",
  //       main: "#17af98",
  //       dark: "#1d6157",
  //     }
  //   },
  // });

  return (
    // <ThemeProvider theme={primaryTheme}>
    <div className="App">
      <Provider store={store} >
        <PersistGate persistor={persistor}>
          <Routers />
        </PersistGate>
      </Provider>
    </div>
    // </ThemeProvider >
  );
}

export default App;
