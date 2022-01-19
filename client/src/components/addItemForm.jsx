import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import config from "../config/config";

const AddItemForm = ({ signalRefresh }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [count, setCount] = useState(0);

  const handleClick = async () => {
    const data = {
      name,
      description: desc,
      count,
    };
    await axios.post(`${config.API_URL}/items`, data);
    signalRefresh();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Add Inventory Item</Typography>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          label="Description"
          variant="outlined"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <TextField
          label="Count"
          type="number"
          variant="outlined"
          value={count}
          onChange={(e) => {
            setCount(e.target.value);
          }}
        />
      </CardContent>
      <CardActions>
        <Button onClick={handleClick}>Add Item</Button>
      </CardActions>
    </Card>
  );
};

export default AddItemForm;
