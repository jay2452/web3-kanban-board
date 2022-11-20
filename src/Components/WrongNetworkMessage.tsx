import { Box } from "@material-ui/core";

const WrongNetworkMessage = () => (
  <Box display="flex" flexDirection="column" alignItems="center" mb="20px">
    {/* Prompt to change network to Rinkeby */}
    <Box>----------------------------------------</Box>
    <Box>Please connect to the Rinkeby Testnet</Box>
    <Box>and reload the page</Box>
    <Box>----------------------------------------</Box>
  </Box>
);

export default WrongNetworkMessage;
