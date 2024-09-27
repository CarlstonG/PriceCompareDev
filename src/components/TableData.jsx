import React, { useState, useEffect, useCallback } from 'react';
import ODataStore from 'devextreme/data/odata/store';
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from 'devextreme-react/data-grid';
import DiscountCell from './DiscountedCell';
import './TableData.css'; // Add mobile-responsive styles if needed

const API_URL = import.meta.env.VITE_API_URL; 
console.log("API URL:", API_URL);  

const TableData = () => {
  const [dataSourceOptions, setDataSourceOptions] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  const fetchData = useCallback(() => {
    const store = new ODataStore({
      version: 2,
      url: API_URL,
      key: 'Id',
      beforeSend(request) {
        const year = new Date().getFullYear() - 1;
        request.params.startDate = `${year}-05-10`;
        request.params.endDate = `${year}-5-15`;
      },
    });

    store.load()
      .then((data) => {
        setDataSourceOptions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onContentReady = useCallback(
    (e) => {
      if (collapsed) {
        e.component.expandRow(['EnviroCare']);
        setCollapsed(false);
      }
    },
    [collapsed],
  );

  // Conditional rendering for loading/error states
  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DataGrid
      dataSource={dataSourceOptions}
      allowColumnReordering={true}
      rowAlternationEnabled={true}
      showBorders={true}
      columnAutoWidth={true}         // Automatically adjust column width
      columnHidingEnabled={true}     // Enable automatic hiding of columns on smaller screens
      onContentReady={onContentReady}
      width="100%"
      adaptiveDetailRowEnabled={true}  // Enable adaptive detail row for hidden columns
    >
      <GroupPanel visible={true} />
      <SearchPanel
        visible={true}
        highlightCaseSensitive={true}
      />
      <Grouping autoExpandAll={false} />

      <Column
        dataField="Product"
        groupIndex={0}
      />
      <Column
        dataField="Id"
        caption="ID"
        dataType="number"
        format="number"
        alignment="right"
      />
      <Column
        dataField="Amount"
        caption="Sale Amount"
        dataType="number"
        format="currency"
        alignment="right"
      />
      <Column
        dataField="Discount"
        caption="Discount %"
        dataType="number"
        format="percent"
        alignment="right"
        allowGrouping={false}
        cellRender={DiscountCell}
        cssClass="bullet"
      />
      <Column
        dataField="SaleDate"
        dataType="date"
      />
      <Column
        dataField="Region"
        dataType="string"
      />
      <Column
        dataField="Sector"
        dataType="string"
      />
      <Column
        dataField="Channel"
        dataType="string"
      />
      <Column
        dataField="Customer"
        dataType="string"
        width={150}
      />

      <Pager
        allowedPageSizes={[10, 25, 50, 100]}
        showPageSizeSelector={true}
      />
      <Paging defaultPageSize={10} />
    </DataGrid>
  );
};

export default TableData;
