import { H3Error } from 'h3';
import status from 'http-status';
import type { Filter } from './defineApi';

export const defaultFilter: Filter = (event, error, resp) => {
  if (error instanceof H3Error) {
    resp.status(error.statusCode).json({ message: error.message });
    return;
  }
  resp.status(status.INTERNAL_SERVER_ERROR).json({ message: status[500] });
};
