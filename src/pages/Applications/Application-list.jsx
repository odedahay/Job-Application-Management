import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Swal from "sweetalert2";
import Modal from '@mui/material/Modal';
import Chip from '@mui/material/Chip';
import Skeleton from '@mui/material/Skeleton';

import { db } from "../../firebase-config"
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";
import { useAppStore } from '../../appStore';
import ApplicationsAdd from './Applications-add';
import ApplicationsEdit from './Applications-edit';



export default function Applicationlist() {
    const formatDate = (value) => {
        if (!value) return "";
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return String(value);
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
            .format(parsed)
            .replace(",", "");
    };
    const getSortTime = (row) => {
        const raw = row?.date_applied || row?.date;
        const parsed = new Date(raw);
        return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
    };
    const statusStyle = {
        pending: { label: "Pending", bg: "#FEF3C7", fg: "#92400E" },
        rejected: { label: "Rejected", bg: "#FEE2E2", fg: "#991B1B" },
        offered: { label: "Offered", bg: "#D1FAE5", fg: "#065F46" },
        "no response": { label: "No Response", bg: "#E5E7EB", fg: "#374151" },
    };
    const renderStatusChip = (status) => {
        const key = String(status || "").toLowerCase();
        const style = statusStyle[key] || { label: status || "Unknown", bg: "#E5E7EB", fg: "#374151" };
        return (
            <Chip
                label={style.label}
                size="small"
                sx={{
                    backgroundColor: style.bg,
                    color: style.fg,
                    fontWeight: 400,
                    fontSize: 11,
                    minWidth: 85
                }}
            />
        );
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    //const [rows, setRows] = useState([]);
    const jobCollectionRef = collection(db, "applications");

    // modal
    const [formId, setFormId] = useState(false);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleEditOpen = () => setEditOpen(true);
    const handleEditClose = () => setEditOpen(false);

    const setRows = useAppStore((state) => state.setRows);
    const rows = useAppStore((state) => state.rows);


    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        setIsLoading(true);
        const data = await getDocs(jobCollectionRef);
        const items = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        items.sort((a, b) => getSortTime(b) - getSortTime(a));
        setRows(items);
        setIsLoading(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                handleDelete(id)
            }
        })
    }

    const handleDelete = async (id) => {
        const userDoc = doc(db, "applications", id);
        await deleteDoc(userDoc);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getUsers();
    };



    const filterData = (v) => {
        if (v) {
            setRows([v])
        } else {
            getUsers();
        }
    }

    const editData = (id, company, position, status) => {
        const data = {
            id,
            company,
            position,
            status
        }
        setFormId(data);
        handleEditOpen();
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };


    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ApplicationsAdd closeEvent={handleClose} />
                </Box>
            </Modal>
            <Modal
                open={editOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ApplicationsEdit closeEvent={handleEditClose} fid={formId} />
                </Box>
            </Modal>
            {isLoading ? (
                <Paper sx={{ width: "98%", overflow: "hidden", padding: "12px" }}>
                    <Box height={20}></Box>
                    <Skeleton variant="rectangular" width={"100%"} height={30}></Skeleton>
                    <Box height={40}></Box>
                    <Skeleton variant="rectangular" width={"100%"} height={60}></Skeleton>
                    <Box height={20}></Box>
                    <Skeleton variant="rectangular" width={"100%"} height={60}></Skeleton>
                    <Box height={20}></Box>
                    <Skeleton variant="rectangular" width={"100%"} height={60}></Skeleton>
                    <Box height={20}></Box>
                </Paper>
            ) : rows?.length ? (
                <Paper sx={{ width: '100%', overflow: 'hidden', padding: "12px" }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ padding: "20px" }}
                    >
                        Job Application List
                    </Typography>
                    <Divider />
                    <Box height={10} />
                    <Stack direction="row" spacing={2} className='my-2 mb-2 '>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={rows}
                            sx={{ width: 300 }}
                            onChange={(e, v) => filterData(v)}
                            getOptionLabel={(rows) => rows.company || ""}
                            renderInput={(params) => (
                                <TextField {...params} size="small" label="Search Company" />
                            )}
                        />
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        ></Typography>
                        <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
                            Add
                        </Button>
                    </Stack>
                    <Box height={10} />
                    <TableContainer sx={{ height: '100%' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left" style={{ minWidth: "150px" }}>Company</TableCell>
                                    <TableCell align="left" style={{ minWidth: "150px" }}>Position</TableCell>
                                    <TableCell align="left" style={{ minWidth: "150px" }}>Application Date</TableCell>
                                    <TableCell align="left" style={{ minWidth: "150px" }}>Status</TableCell>
                                    <TableCell align="left" style={{ minWidth: "150px" }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.id}
                                            >
                                                <TableCell align="left">{row.company}</TableCell>
                                                <TableCell align="left">{row.position}</TableCell>
                                                <TableCell align="left">{formatDate(row.date_applied)}</TableCell>
                                                <TableCell align="left">{renderStatusChip(row.status)}</TableCell>
                                                <TableCell align="left">
                                                    <Stack spacing={2} direction="row">
                                                        <EditIcon
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "blue",
                                                                cursor: "pointer",
                                                            }}
                                                            className="cursor-pointer"
                                                            onClick={() => editData(row.id, row.company, row.position, row.status)}
                                                        />
                                                        <DeleteIcon
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "darkred",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => {
                                                                deleteUser(row.id);
                                                            }}
                                                        />
                                                    </Stack>

                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
          ) : (
                <Paper sx={{ width: "98%", overflow: "hidden", padding: "24px" }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        No applications yet
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
                        Your database is empty. Add a new application to get started.
                    </Typography>
                    <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
                        Add
                    </Button>
                </Paper>
           )}
        </>
    );
}
