import React, { useEffect, useState } from 'react';
import { DataGrid, Column, Paging, SearchPanel } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import { mockData } from './mockData'; // Import the mock data
import Modal from '../../constants/Modal'; // Import the Modal component

// Function to get the OAuth token
const getToken = async () => {
  try {
                  const response = await fetch(`https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}/oauth2/token`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  },
                          body: new URLSearchParams({
                            grant_type: 'client_credentials',
                            client_id: import.meta.env.VITE_AZURE_CLIENT_ID,
                            client_secret: import.meta.env.VITE_AZURE_CLIENT_SECRET,
                            resource: import.meta.env.VITE_AZURE_RESOURCE,
                                })
                  });
    
                          const tokenData = await response.json();
                          return tokenData.access_token;
                                          } 
                            catch (error) {
                              console.error('Failed to get token:', error);
                                            return null;
                }
              };

// Fetch data with token
const fetchData = async () => {
const token = await getToken(); // Get the OAuth token

              if (!token) {
                console.error('Token not available');
                return mockData; // Fallback to mock data
              }

              try {
                const response = await fetch('https://gateway.officebrands.com.au/v1/idg/product/productsearchcurrentpricesbyothercodes', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Use Bearer token for authentication
                  },
                });

                if (!response.ok) {
                  throw new Error('HTTP error ' + response.status);
                }

                const data = await response.json();
                return data;
              } catch (error) {
                console.error('API failed, using mock data:', error);
                return mockData; // Fallback to mock data in case of error
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
              borderRight: '1px solid grey',
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
        {/* <Column dataField="compdataPriceScrapeDate" caption="Last Scrape" dataType="date" /> */}
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
