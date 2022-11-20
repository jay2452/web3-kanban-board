import { KanbanContractAddress } from "../config.js";

import KanbanAbi from "./Store/KanbanContract.json";

export default async function getKanbanContract() {
  let KanbanContract;
  try {
    const { ethereum, ethers } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      KanbanContract = new ethers.Contract(
        KanbanContractAddress,
        KanbanAbi.abi,
        signer
      );
    } else {
      console.error("Etherium wallet doesnot exist");
    }
  } catch (error) {
    console.error(error);
  } finally {
    return KanbanContract;
  }
}
