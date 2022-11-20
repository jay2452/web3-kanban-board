import { Box, Button } from "@material-ui/core";

const styles = {
  display: "flex",
  justifyContent: "center",
  width: "100%"
};

const ConnectWalletButton = ({ connectWallet }) => (
  <Box style={styles}>
    <Button
      variant="contained"
      color="primary"
      size="large"
      onClick={connectWallet}
      // Add an onClick functionality
    >
      Connect Wallet
    </Button>
  </Box>
);

export default ConnectWalletButton;
