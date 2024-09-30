// TableData.js
import React, { useEffect, useState } from 'react';
import { DataGrid, Column, Paging, Pager, SearchPanel } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { mockData } from './mockData'; // Import the mock data
import Modal from '../../constants/Modal'; // Import the Modal component

const fetchData = async () => {
  try {
    const response = await fetch('https://gateway.officebrands.com.au/v1/idg/product/productsearchcurrentpricesbyothercodes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add other necessary headers
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API failed, using mock data:", error);
    return mockData; // Return mock data in case of error
  }
};

const TableData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null); // State to hold modal data
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

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

  const handleButtonClick = async (item) => {
    // Set the item data to show in the modal
    setModalData(item);
    setModalOpen(true); // Open the modal
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="responsive-table">
      <DataGrid
        dataSource={data}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        columnAutoWidth={true}
        showBorders={false}
        showColumnLines={false}
        showRowLines={false}
      >
        <SearchPanel visible={true} highlightCaseSensitive={true} />

        {/* Define your columns */}
        <Column dataField="prdEzCode" caption="EzCode" alignment="left" />
        <Column dataField="compdataCompetitorDescription" caption="Description" alignment="right" />
        <Column
          dataField="compdataImageUrl"
          caption="Image"
          cellRender={({ data }) => (
            <img src={data.compdataImageUrl} alt={data.prdEzCode} style={{ width: '70px', height: '70px' }} />
          )}
        />
         <Column
          alignment="left"
          dataField="Actions"
          caption="Actions"
          headerCellRender={() => (
            <div className="actions-header">Actions</div>
          )}
          cellRender={({ data }) => (
            <div style={{
              borderRight: '1px solid black',
              textAlign: 'center',
              height: '70px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <button
                style={{ padding: '5px 10px' }}
                onClick={() => handleButtonClick(data)} // Open modal on button click
              >
                ...
              </button>
            </div>
          )}
        />
        <Column dataField="compdataCompetitor" caption="Competitor" alignment="right" />
        <Column dataField="compdataCompetitorStock" caption="Stock" alignment="right" />
        <Column dataField="compdataPriceScrapeDate" caption="Last Scrape" dataType="date" />

        {/* Actions column with a button containing '...' */}
       

        {/* Additional columns */}
        <Column dataField="compdataCompetitorBarcode" caption="Barcode" alignment="right" />
        <Column dataField="compdataCompetitorManufacturerCode" caption="Manufacturer Code" alignment="right" />
        <Column dataField="compdataPriceScrapeDate" caption="Price Inc" alignment="right" />

        <Paging defaultPageSize={7} />
       
      </DataGrid>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} data={modalData} />
    </div>
  );
};

export default TableData;
