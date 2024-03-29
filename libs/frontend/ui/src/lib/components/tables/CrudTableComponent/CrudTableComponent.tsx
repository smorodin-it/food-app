import React, { Fragment, ReactElement, ReactNode } from 'react';
import { CrudTableProps, MinimalDataModel } from './types';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { observer } from 'mobx-react-lite';
import { CRUD_TABLE_ACTIONS, paginationDefaultSettings } from './constants';
import { Pagination, Stack } from '@mui/material';
import { LinearLoaderCentered } from '../../loaders/LinearLoaderCentered/LinearLoaderCentered';

export const CrudTableComponent = observer(function CrudTableComponent<
  DataModel extends MinimalDataModel
>(props: CrudTableProps<DataModel>): ReactElement {
  const rowsPerPage = props.perPage ?? paginationDefaultSettings.ROWS_PER_PAGE;

  // Pagination functions
  const handleChangePage = async (_: unknown, newPage: number) => {
    if (props.handlePaginationChange) {
      props.handlePaginationChange(newPage);
    }
  };

  const renderActionAddComponent = (): ReactNode[] => {
    return props.settings.actions.reduce<ReactNode[]>((result, action) => {
      if (
        action.type === CRUD_TABLE_ACTIONS.TOP &&
        (typeof action.access === 'undefined' ? true : action.access)
      ) {
        result.push(action.renderComponent());
      }

      return result;
    }, []);
  };

  const renderActionsCellComponents = (object: DataModel): ReactNode[] => {
    return props.settings.actions.reduce<ReactNode[]>((result, action) => {
      if (
        action?.renderComponent &&
        action.type !== CRUD_TABLE_ACTIONS.TOP &&
        (typeof action.access === 'undefined' ? true : action.access)
      ) {
        result.push(action.renderComponent(object));
      }
      return result;
    }, []);
  };

  // Table rows & fields generation functions

  const allActionsList = props.settings.actions.map((action) => action.type);

  const actionsInCell = allActionsList.filter(
    (action) => action !== CRUD_TABLE_ACTIONS.TOP
  );

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
    const fields = props.settings.fields;

    return props.storeData.list.map((row, index) => (
      <TableRow key={row.id}>
        {fields.map((field, idx) => (
          <Fragment key={field.header as string}>
            {props.addNumberingColumn && idx === 0 && (
              <TableCell>
                {index + 1 + rowsPerPage * (props.currentPage - 1)}
              </TableCell>
            )}
            <TableCell>{field.render(props.storeData.list[index])}</TableCell>
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
      <Stack justifyContent={'space-between'} alignItems={'flex-start'}>
        <>
          {renderActionAddComponent()}
          {props.withPagination && (
            <Pagination
              boundaryCount={5}
              color={'primary'}
              count={Math.ceil(props.storeData.total / rowsPerPage)}
              onChange={handleChangePage}
              page={props.currentPage}
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
    </Stack>
  );
});
