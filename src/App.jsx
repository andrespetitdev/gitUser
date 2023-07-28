import {
  Button,
  Container,
  Grid,
  List,
  ListItem,
  Input,
  Box,
} from "@mui/material";

import { useState } from "react";
const boxPrimary = [{ background: "#596772", height: "21.3cm" }];
const gridPrimary = [
  {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
];
const boxSecondary = [
  {
    marginTop: "2cm",
    width: "25cm",
    height: "10cm",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
];
const gridSecondary = [
  {
    background: "#4C5A65",
    marginTop: "10cm",
    marginBottom: "3cm",
    width: "20cm",
    height: "4cm",
    border: "2",
    borderStyle: "hidden",
    borderRadius: "25px",
    borderColor: "white",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
];
const inputStyle = [
  {
    marginRight: "10px",
    background: "white",
    borderRadius: "5px",
    textAlign: "center",
    width: "15cm",
  },
];
const buttonStyle = [
  {
    background: "#E2E2E2",
    color: "black",
  },
];
const listItemStyle = [
  {
    display: "flex",
    flexDirection: "column",
    background: "#596772",
    width: "44.56cm",
  },
];
function App() {
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetch(
      `https://api.github.com/search/users?q=${inputValue}&page=${page}&per_page=3`
    )
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box sx={boxPrimary}>
      <Container>
        <Grid sx={gridPrimary}>
          <Box sx={boxSecondary}>
            <Grid sx={gridSecondary}>
              <form onSubmit={handleSearch}>
                <Input
                  sx={inputStyle}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                <Button type="submit" sx={buttonStyle}>
                  Search
                </Button>
              </form>
            </Grid>
          </Box>
          <List>
            {users.map((user) => (
              <ListItem key={user.id} sx={listItemStyle}>
                <p>{user.login}</p>
                <img src={user.avatar_url} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Container>
    </Box>
  );
}

export default App;
