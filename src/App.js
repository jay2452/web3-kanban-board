import { Box, IconButton, Tooltip, Typography } from "@material-ui/core";
import { ArrowsClockwise, Plus } from "phosphor-react";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ConnectWalletButton from "./Components/ConnectWalletButton";
import CreateEditTaskModal from "./Components/CreateEditTaskModal";

import KanbanBoard from "./Components/KanbanBoard";
import WrongNetworkMessage from "./Components/WrongNetworkMessage";
import { fetchBoardData } from "./Store/actionCreators/taskCreator";
import { toggleCreateEditModal } from "./Store/actionCreators/uiActionCreator";

export default function App() {
  const dispatch = useDispatch();

  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    dispatch(fetchBoardData());
    connectWallet();
  }, []);

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to chain ", chainId);

      const goerliChainId = "0x5";
      if (chainId !== goerliChainId) {
        alert("You are not connected to Goerli test net");
        setCorrectNetwork(false);
        return;
      } else {
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts"
      });

      console.log("Found account ", accounts[0]);
      setLoggedIn(true);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      alert(error.message);
      setCurrentAccount("");
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <ConnectWalletButton connectWallet={connectWallet} />
      ) : correctNetwork ? (
        <>
          <Box
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Typography variant="h4">Kanban Board</Typography>
            <Tooltip title="Add new Task" arrow>
              <IconButton onClick={() => dispatch(toggleCreateEditModal())}>
                <Plus />
              </IconButton>
            </Tooltip>

            <Tooltip title="Reload data" arrow>
              <IconButton onClick={() => dispatch(fetchBoardData())}>
                <ArrowsClockwise size={20} color="#7060e6" weight="fill" />
              </IconButton>
            </Tooltip>
          </Box>

          <KanbanBoard />
          <CreateEditTaskModal onAddClick />
        </>
      ) : (
        <WrongNetworkMessage />
      )}
    </div>
  );
}
