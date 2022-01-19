import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import config from "../config/config";

const CreateShipmentForm = ({ itemList, signalRefresh }) => {
  const [direction, setDirection] = useState("");
  const [inventoryList, setInventoryList] = useState([]);

  const addItem = () => {
    const newInventoryList = [...inventoryList];
    const firstUnselected = itemList.filter(
      (i) => inventoryList.findIndex((inv) => inv.name === i.name) === -1
    )[0];
    newInventoryList.push({
      name: firstUnselected.name,
      count: 0,
    });
    setInventoryList(newInventoryList);
  };

  const handleClick = async () => {
    const data = {
      inventoryList,
      direction,
    };
    await axios.post(`${config.API_URL}/shipments`, data);
    signalRefresh();
  };

  const handleChange = async (name, index) => {
    const newInventoryList = [...inventoryList];
    newInventoryList[index].name = name;
    setInventoryList(newInventoryList);
  };

  const handleCountChange = async (count, index) => {
    const newInventoryList = [...inventoryList];
    newInventoryList[index].count = count;
    setInventoryList(newInventoryList);
    console.log(inventoryList);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Create a Shipment</Typography>
        <Typography variant="h6">Direction</Typography>

        <Select
          value={direction}
          label="Direction"
          onChange={(e) => {
            setDirection(e.target.value);
          }}
        >
          <MenuItem value={"in"}>Ship into Warehouse</MenuItem>
          <MenuItem value={"out"}>Ship out of Warehouse</MenuItem>
        </Select>

        <Button
          onClick={addItem}
          disabled={inventoryList.length === itemList.length}
        >
          Add Item
        </Button>
        {inventoryList.map((item, index) => {
          return (
            <Box key={`${item.name}-${index}`}>
              Name
              <Select
                value={item.name}
                label="Name"
                onChange={(e) => {
                  handleChange(e.target.value, index);
                }}
              >
                {itemList
                  .filter(
                    (i) =>
                      inventoryList.findIndex((inv) => inv.name === i.name) ===
                      -1
                  )
                  .map((i) => (
                    <MenuItem key={i.name} value={i.name}>
                      {i.name}
                    </MenuItem>
                  ))}
                <MenuItem value={item.name}>{item.name}</MenuItem>
              </Select>
              Count
              <TextField
                label="Count"
                type="number"
                variant="outlined"
                value={item.count}
                onChange={(e) => {
                  handleCountChange(e.target.value, index);
                }}
              />
            </Box>
          );
        })}
      </CardContent>
      <CardActions>
        <Button disabled={inventoryList.length === 0} onClick={handleClick}>
          Complete Shipment
        </Button>
      </CardActions>
    </Card>
  );
};

export default CreateShipmentForm;
