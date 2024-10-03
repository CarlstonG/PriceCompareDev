import React, { useState } from 'react';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { useMsal } from '@azure/msal-react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon

const DataGridComponent = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const [searchQuery, setSearchQuery] = useState('7001875'); // default search query

  function isNotEmpty(value) {
    return value !== undefined && value !== null && value !== '';
  }

  const store = new CustomStore({
    key: 'ezCode',
    async load(loadOptions) {
      const paramNames = ['skip', 'take', 'requireTotalCount', 'requireGroupCount', 'sort', 'filter', 'totalSummary', 'group', 'groupSummary'];

      const textObj = {};
      paramNames
        .filter((paramName) => isNotEmpty(loadOptions[paramName]))
        .forEach((param) => {
          textObj[param] = loadOptions[param];
        });

      try {
        const paramRequest = {
          searchQuery: searchQuery, // Use the state value here
          advanceSearchEnabled: false,
          skip: textObj.skip,
          size: textObj.take,
        };

        const tokenRequest = {
          account: activeAccount,
          scopes: ['api://4bdc6b82-01c9-4ef9-858b-8badb622ad9c/api.scope'],
        };

        const responsex = await instance.acquireTokenSilent(tokenRequest);
        const accessToken = responsex.accessToken;

        const response = await axios.post(
          `https://gateway.officebrands.com.au/v1/idg/product/productsearchcurrentpricesbyothercodes`,
          paramRequest,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        return {
          data: response.data.itemCollection,
          totalCount: response.data.totalCount,
        };
      } catch (err) {
        console.error(err);
        throw new Error('Data Loading Error');
      }
    },
  });

  // Define the handleSearch function to update the search query state
  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };

  const allowedPageSizes = [8, 12, 20];

  return (
    <div className="dx-viewport p-4">
      <div className="flex items-center mb-4">
        {/* Search Input with Icon */}
        <div className="relative flex items-center">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Search product..."
          />
        </div>
      </div>

      <DataGrid dataSource={store} showBorders={true} remoteOperations={true}>
        <Column dataField="ezCode" dataType="number" />
        <Column dataField="amount" dataType="float" format="currency" />
        <Column dataField="productDescription" />
        <Column dataField="buyUOM" />
        <Column dataField="rq" />
        <Column dataField="moq" />
        <Paging defaultPageSize={20} />
        <Pager showPageSizeSelector={true} allowedPageSizes={allowedPageSizes} />
      </DataGrid>
    </div>
  );
};

export default DataGridComponent;
