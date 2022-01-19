import React from "react";
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
} from "@mui/material";
import axios from "axios";
import config from "../config/config";
import { Box } from "@mui/system";

const ShipmentList = ({ shipmentList, signalRefresh }) => {
  const handleDelete = async (shipment) => {
    await axios.delete(`${config.API_URL}/shipments/${shipment._id}`);
    signalRefresh();
  };

  const clearAll = async () => {
    await axios.delete(`${config.API_URL}/shipments`);
    signalRefresh();
  };

  return (
    <>
      <Card>
        <CardContent>
          <Box container justifyContent="space-between">
            <Typography variant="h5">Shipments</Typography>
            <Button onClick={clearAll}>Clear All</Button>
          </Box>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Items Shipped</TableCell>
                <TableCell>Shipment Direction</TableCell>
                <TableCell>
                  Delete (Shipment already made, deleting won't affect inventory
                  items)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipmentList.map((shipment) => (
                <TableRow
                  key={shipment._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {shipment.inventoryList.map((item) => (
                      <Box key={`${item.name}_${item.count}`}>
                        {item.name} * {item.count}
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell>{shipment.direction}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleDelete(shipment);
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

export default ShipmentList;
