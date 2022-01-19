import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddItemForm from "./components/addItemForm";
import ItemList from "./components/itemList";
import ShipmentList from "./components/shipmentList";
import CreateShipmentForm from "./components/createShipment";
import config from "./config/config";

function App() {
  const [itemList, setItemList] = useState([]);
  const [shipmentList, setShipmentList] = useState([]);

  const signalRefresh = async () => {
    // always call this instead of mutating global state
    // cuz we want to test that it actually worked in the backend
    const items = await axios.get(`${config.API_URL}/items`);
    setItemList(items.data);
    const shipments = await axios.get(`${config.API_URL}/shipments`);
    setShipmentList(shipments.data);
  };

  useEffect(() => {
    signalRefresh();
  }, []);

  return (
    <div className="App">
      <Grid container spacing={2} p={2}>
        <Grid item>
          <AddItemForm signalRefresh={signalRefresh} />
        </Grid>
        <Grid item>
          <ItemList itemList={itemList} signalRefresh={signalRefresh} />
        </Grid>
        <Grid item>
          <CreateShipmentForm
            itemList={itemList}
            signalRefresh={signalRefresh}
          />
        </Grid>
        <Grid item>
          <ShipmentList
            shipmentList={shipmentList}
            signalRefresh={signalRefresh}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
