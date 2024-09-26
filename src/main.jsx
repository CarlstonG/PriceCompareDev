import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Button from "devextreme-react/button";
import App from './App.jsx'
import './index.css'
export { Button };

import DataGrid, {
  Column as GridColumn,
  Editing as GridEditing,
  Paging as GridPaging,
  Lookup as GridLookup,
} from "devextreme-react/data-grid";
export {
  DataGrid,
  GridColumn,
  GridEditing,
  GridPaging,
  GridLookup,
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
