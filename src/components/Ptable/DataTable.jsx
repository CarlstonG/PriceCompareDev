import React, { useEffect, useState } from 'react';
import { DataGrid, Column, Paging, Pager, SearchPanel } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { mockData } from './mockData'; // Import your mock data

const fetchData = async () => {
  try {
    // Simulate a fetch call (replace with actual API fetch in the future)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockData);
      }, 1000); // Simulate delay
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error so the calling function can handle it
  }
};

const TableData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await fetchData();
        setData(items);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data.");
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="responsive-table">
      <DataGrid
        dataSource={data}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        width="100%"
      >
        <SearchPanel visible={true} highlightCaseSensitive={true} />

        <Column dataField="Product" caption="Product" />
        <Column
          dataField="Image"
          caption="Image"
          cellRender={({ data }) => <img src={data.Image} alt={data.Product} style={{ width: '50px', height: '50px' }} />}
        />
        <Column dataField="Amount" caption="Amount" format="currency" alignment="right" />
        <Column dataField="Discount" caption="Discount %" format="percent" alignment="right" />
        <Column dataField="SaleDate" caption="Sale Date" dataType="date" />
        <Column dataField="Region" caption="Region" />
        <Column dataField="Customer" caption="Customer" />

        <Pager allowedPageSizes={[5, 10, 25]} showPageSizeSelector={true} />
        <Paging defaultPageSize={5} />
      </DataGrid>
    </div>
  );
};

export default TableData;
