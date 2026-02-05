import React, { useEffect, useState } from 'react';
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
import { addDoc, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useAppStore } from '../../appStore';
import { db } from "../../firebase-config";

export default function ApplicationsEdit({ fid, closeEvent }) {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [date_applied, setDate_applied] = useState("");
    const [status, setStatus] = useState('');

    // update table
    const setRows = useAppStore((state) => state.setRows);
    const jobCollectionRef = collection(db, "applications");

    // binding data
    useEffect(() => {
        console.log("FID" + fid.id);
        setCompany(fid.company);
        setPosition(fid.position);
        setDate_applied(fid.date_applied);
        setStatus(fid.status);
    }, []);


    const handleCompanyChange = (event) => {
        setCompany(event.target.value);
    }

    const handlePositionChange = (event) => {
        setPosition(event.target.value);
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    }

    const getUsers = async () => {
        const data = await getDocs(jobCollectionRef);
        setRows(data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        })))
    }

    const updateCompany = async () => {
        const userDoc = doc(db, "applications", fid.id)
        const newFields = {
            company,
            position,
            status
        }
        await updateDoc(userDoc, newFields);
        getUsers();
        closeEvent();
        Swal.fire("Updated!", "Your application record has been updated", "success")
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
                    Edit Company Application
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
                            {statusValue.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Stack spacing={2} direction="row" sx={{ marginTop: "20px" }}>
                    <Button variant="contained" onClick={updateCompany}>Submit</Button>
                    <Button variant="outlined" onClick={closeEvent}>Cancel</Button>
                </Stack>
            </Box>
        </>
    )
}
