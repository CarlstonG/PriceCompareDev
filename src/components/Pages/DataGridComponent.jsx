import React from 'react';
import DataGrid, { Column, Paging, Pager } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import { useMsal } from '@azure/msal-react';
import axios from 'axios';

const DataGridComponent = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

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
          searchQuery: '7001875',
          advanceSearchEnabled: false,
          skip: textObj.skip,
          size: textObj.take,
        };

        const tokenRequest = {
          account: activeAccount,
          scopes: ['api://4bdc6b82-01c9-4ef9-858b-8badb622ad9c/api.scope'], // Replace with your scope
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

        console.log(response.data); // Log the response data to verify structure

        return {
          data: response.data.itemCollection,
          totalCount: response.data.totalCount,
        };
      } catch (err) {
        console.error(err); // Log any errors
        throw new Error('Data Loading Error');
      }
    },
  });

  const allowedPageSizes = [8, 12, 20];

  return (
    <div className="dx-viewport p-4">
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
