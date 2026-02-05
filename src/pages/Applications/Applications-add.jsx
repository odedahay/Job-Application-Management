import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, IconButton } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import CancelIcon from '@mui/icons-material/Cancel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useAppStore} from '../../appStore';
import { db } from "../../firebase-config";

export default function ApplicationsAdd({ closeEvent }) {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [date_applied, setDate_applied] = useState("");
    const [status, setStatus] = useState('');
    // update table
    const setRows = useAppStore((state) => state.setRows);

    const jobCollectionRef = collection(db, "applications");
    const getSortTime = (row) => {
        const raw = row?.date_applied || row?.date;
        const parsed = new Date(raw);
        return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
    };

    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    }

    const handlePositionChange = (event) => {
        setPosition(event.target.value);
    }

    const handleDateAppliedChange = (event) => {
        setDate_applied(event.target.value);
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }


    const getUsers = async () => {
        const data = await getDocs(jobCollectionRef);
        const items = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        items.sort((a, b) => getSortTime(b) - getSortTime(a));
        setRows(items);
    }

    const createCompany = async() => {
        await addDoc(jobCollectionRef, {
            company: company,
            position: position,
            date_applied: String(new Date()),
            status: status,
            date: String(new Date())
        });
        getUsers();
        closeEvent();
        Swal.fire("Submitted!", "Your application record has been submitted", "success")
    }

    const statusValue = [
        {
            value: "no response",
            label: "No Response"
        },
        {
            value: "pending",
            label: "Pending"
        },
         {
            value: "offered",
            label: "Offered"
        },
        {
            value: "rejected",
            label: "Rejected"
        },
         
    ]

    return (

        <>
            <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Company
                </Typography>
                <IconButton style={{ position: "absolute", top: "4px", right: "4px" }} onClick={closeEvent}>
                    <CancelIcon />
                </IconButton>

                <Grid container spacing={2}>
                    <Grid size={12}>
                        <TextField
                            value={company}
                            onChange={handleCompanyChange}
                            id="outlined-basic" label="Company" variant="outlined" size='small' sx={{ minWidth: "100%" }} />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            value={position}
                            onChange={handlePositionChange}
                            id="outlined-basic" label="Position" variant="outlined" size='small' sx={{ minWidth: "100%" }} />
                    </Grid>

                    {/* <Grid size={6}>
                        <TextField
                            value={date_applied}
                            onChange={handleDateAppliedChange}
                            id="outlined-basic" label="Date Applied" variant="outlined" size='small' sx={{ minWidth: "100%" }} />
                    </Grid> */}
                    <Grid size={6}>

                        <TextField
                             value={status}
                            onChange={handleStatusChange}
                            select
                            id="outlined-basic" label="Status" variant="outlined" size='small' sx={{ minWidth: "100%" }}>
                                {statusValue.map( (option)=> (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Stack spacing={2} direction="row" sx={{ marginTop: "20px" }}>
                    <Button variant="contained" onClick={createCompany}>Submit</Button>
                    <Button variant="outlined" onClick={closeEvent}>Cancel</Button>
                </Stack>
            </Box>
        </>
    )
}
