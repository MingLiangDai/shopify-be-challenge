import { Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddItemForm from "./components/addItemForm";
import ItemList from "./components/itemList";
import config from "./config/config";

function App() {
  const signalRefresh = async () => {
    // always call this instead of mutating global state
    // cuz we want to test that it actually worked in the backend
    const res = await axios.get(`${config.API_URL}/items`);
    setItemList(res.data);
  };

  useEffect(() => {
    signalRefresh();
  }, []);

  const [itemList, setItemList] = useState([]);

  return (
    <div className="App">
      <Grid container spacing={2} p={2}>
        <Grid item>
          <AddItemForm signalRefresh={signalRefresh} />
        </Grid>
        <Grid item>
          <ItemList itemList={itemList} signalRefresh={signalRefresh} />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
