import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Button,
  Modal,
  TextField,
  CardActions,
} from "@mui/material";
import axios from "axios";
import config from "../config/config";

const descModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "80%",
  maxHeight: "80%",
};

const ItemList = ({ itemList, signalRefresh }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({});

  const handleChange = (field, value) => {
    const newSelected = { ...selected };
    newSelected[field] = value;
    setSelected(newSelected);
  };

  const handleDelete = async (item) => {
    await axios.delete(`${config.API_URL}/items/${item._id}`);
    signalRefresh();
  };

  const handleSave = async () => {
    const data = selected;
    await axios.put(`${config.API_URL}/items`, data);
    setOpen(false);
    signalRefresh();
  };

  const handleModal = (item) => {
    setOpen(true);
    setSelected(item);
  };
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Card sx={descModalStyle}>
          <CardContent>
            <Typography variant="h5">Add Inventory Item</Typography>
            <TextField
              label="Name"
              variant="outlined"
              value={selected.name}
              onChange={(e) => {
                handleChange("name", e.target.value);
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              value={selected.desc}
              onChange={(e) => {
                handleChange("desc", e.target.value);
              }}
            />
            <TextField
              label="Count"
              type="number"
              variant="outlined"
              value={selected.count}
              onChange={(e) => {
                handleChange("count", e.target.value);
              }}
            />
          </CardContent>
          <CardActions>
            <Button onClick={handleSave}>Save</Button>
          </CardActions>
        </Card>
      </Modal>
      <Card>
        <CardContent>
          <Typography variant="h5">Inventory Items</Typography>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemList.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell align="right">{item.count}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleModal(item);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleDelete(item);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default ItemList;
