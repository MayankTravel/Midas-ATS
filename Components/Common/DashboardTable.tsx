import { Box } from '@mui/material';
import { Jobs } from 'Components/interface/jobs';
import { MRT_ColumnDef } from 'material-react-table';
import Link from 'next/link';
import React, { useEffect, useMemo } from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import { Material } from './Material_Table';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';

const DashBoardTable = () => {
    const dispatch: any = useDispatch();
    const { isLoading, jobdata } = useSelector((state: any) => state.jobFeeds);
    const { userdata } = useSelector((state: any) => state.user);

    const columns = useMemo<MRT_ColumnDef<Jobs>[]>(
        () => [
          {
            id: "Job-details", //id used to define `group` column
            header: "",
            columns: [
            
              {
                accessorKey: "StatusString", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                enableClickToCopy: true,
                filterVariant: "autocomplete",
                header: "Status",
                size: 100,
                Cell: ({ renderedCellValue, row, cell }: any) => (
                  <Box
                    sx={(theme) => ({
                      backgroundColor:
                        cell.getValue() == "Closed"
                          ? theme.palette.error.dark
                          : cell.getValue() == "Cancelled" &&
                            cell.getValue() == "Frozen"
                          ? theme.palette.warning.dark
                          : theme.palette.success.dark,
                      borderRadius: "0.25rem",
                      color: "#fff",
                      maxWidth: "9ch",
                      p: "0.25rem",
                    })}
                  >
                    {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                    <span>
                      {renderedCellValue === "O" ? "Open" : renderedCellValue}
                    </span>
                  </Box>
                ),
              },
              {
                accessorKey: "Priority", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
                enableClickToCopy: true,
                filterVariant: "autocomplete",
                header: "Priority",
                size: 100,
                Cell: ({ renderedCellValue, row }: any) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                    <span>{renderedCellValue}</span>
                  </Box>
                ),
              }
            ],
          },
        ],
        []
      );

      useEffect(() => {
        const fetchData = async () => {
          try {
            // await fetchAllJobs(dispatch);
          } catch (error) {}
        };
        fetchData();
      }, []);
    return (
        <React.Fragment>
            <Card className="card-height-100">
                    <Card.Header className="d-flex">
                        <h5 className="card-title flex-grow-1 mb-0">Open Jobs</h5>
                        </Card.Header>
           {jobdata.length > 0 &&  isLoading === false ?  (
              <Material columns={columns} data={jobdata[0]}  jobDetailModal={true}
              exportData={true} />
            ) : (
              <Loader/>
            )}
            </Card>
        </React.Fragment >
    );
}

export default DashBoardTable;