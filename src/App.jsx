import React, { useCallback } from 'react';
import './App.css'


// devextreme imports
import 'devextreme/dist/css/dx.light.css';
//import Button from 'devextreme-react/button';
import TableData from './components/TableData';



const App = () => {
  const sayHelloWorld = useCallback(() => {
    alert('Hello world!');
  }, []);

  return (
    <>
      <div>
          <TableData/>
      </div>
    </>
  );
}

export default App


