import React, { Fragment, ReactElement } from 'react';
import { CrudTableProps, MinimalDataModel } from './types';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { observer } from 'mobx-react-lite';
import { paginationDefaultSettings } from './constants';
import { Pagination, Stack } from '@mui/material';
import { LinearLoaderCentered } from '../../loaders/LinearLoaderCentered/LinearLoaderCentered';

export const CrudTableComponent = observer(function CrudTableComponent<
  DataModel extends MinimalDataModel
>(props: CrudTableProps<DataModel>): ReactElement {
  const rowsPerPage = props.perPage ?? paginationDefaultSettings.ROWS_PER_PAGE;

  // Pagination functions
  const handleChangePage = async (event: unknown, newPage: number) => {
    if (props.handlePaginationChange) {
      props.handlePaginationChange(newPage);
    }
  };

  const renderActionAddComponent = (): ReactElement | void => {
    const addComponent = props.settings.actions.find(
      (action) => action.type === 'add'
    );

    if (addComponent?.renderAddComponent) {
      return addComponent.renderAddComponent();
    }
  };

  const renderActionsCellComponents = (object: DataModel): ReactElement[] => {
    const componentsArray = [] as ReactElement[];
    props.settings.actions.forEach((action) => {
      if (action?.renderRowComponent) {
        switch (action.type) {
          case 'edit':
            componentsArray.push(action.renderRowComponent(object));
            break;

          case 'details':
            componentsArray.push(action.renderRowComponent(object));
            break;

          case 'delete':
            componentsArray.push(action.renderRowComponent(object));
            break;

          default:
            return;
        }
      }
    });

    return componentsArray;
  };

  // Table rows & fields generation functions

  const getDataObjectFields = (): (keyof DataModel)[] => {
    return props.settings.fields.map((field) => field.name);
  };

  const allActionsList = props.settings.actions.map((action) => action.type);
  const actionsInCell = ['edit', 'delete', 'details'];
  const haveOneOfCellActions = allActionsList.some((v) =>
    actionsInCell.includes(v)
  );

  const getHeader = (): JSX.Element[] => {
    const fields = props.settings.fields.map((field) => (
      <TableCell key={field.header}>{field.header}</TableCell>
    ));

    if (props.addNumberingColumn) {
      fields.unshift(<TableCell>№</TableCell>);
    }

    if (haveOneOfCellActions) {
      fields.push(<TableCell>Действия</TableCell>);
    }

    return fields;
  };

  const getRowsData = (): JSX.Element[] => {
    const fields = getDataObjectFields();

    return props.storeData.list.map((row, index) => (
      <TableRow key={row.id}>
        {fields.map((field, idx) => (
          <Fragment key={field as string}>
            {props.addNumberingColumn && idx === 0 && (
              <TableCell>
                {index + 1 + rowsPerPage * (props.currentPage - 1)}
              </TableCell>
            )}
            <TableCell>
              {props.settings.fields[idx].render(props.storeData.list[index])}
            </TableCell>
            {haveOneOfCellActions && idx === fields.length - 1 && (
              <TableCell>
                <Stack flexDirection={'row'}>
                  {renderActionsCellComponents(row)}
                </Stack>
              </TableCell>
            )}
          </Fragment>
        ))}
      </TableRow>
    ));
  };

  return (
    <Stack>
      <Stack justifyContent={'space-between'}>
        <>
          {renderActionAddComponent()}
          {props.withPagination && (
            <Pagination
              count={Math.ceil(props.storeData.total / rowsPerPage)}
              page={props.currentPage}
              onChange={handleChangePage}
              boundaryCount={5}
              color={'primary'}
            />
          )}
        </>
      </Stack>
      <TableContainer component={Paper}>
        <>
          <Table size={'small'}>
            <TableHead>
              <TableRow>{getHeader()}</TableRow>
            </TableHead>
            {!props.loading && <TableBody>{getRowsData()}</TableBody>}
          </Table>
          {props.loading && <LinearLoaderCentered />}
        </>
      </TableContainer>
      {props.withBottomPagination && (
        <Stack flexDirection={'row'} justifyContent={'flex-end'}>
          <Pagination
            count={Math.ceil(props.storeData.total / rowsPerPage)}
            page={props.currentPage}
            onChange={handleChangePage}
            boundaryCount={5}
            color={'primary'}
          />
        </Stack>
      )}
    </Stack>
  );
});
