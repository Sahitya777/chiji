import { ethers } from "ethers";
import governanceTokenAbi from '../abis/GovernanceTokenAbi.json';
import governanceAbi from '../abis/GovernanceContractAbi.json'
export async function readDelegateLimit(tokenAddress: string, address: string) {
  try {
    // Set up your provider (you can use Infura, Alchemy, or other providers)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Create a contract instance
    const contract = new ethers.Contract(tokenAddress, governanceTokenAbi, provider);
    
    // Call the 'delegates' function
    const delegateLimit = await contract.delegates(address);
    
    return delegateLimit;
  } catch (error) {
    console.error('Error reading delegate limit:', error);
    throw error;
  }
}

export async function readBalance(tokenAddress: string, address: string) {
  try {
    // Set up your provider (Infura, Alchemy, or other providers can also be used)
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Create a contract instance
    const contract = new ethers.Contract(tokenAddress, governanceTokenAbi, provider);

    // Call the 'balanceOf' function to get the balance of the address
    const balance = await contract.balanceOf(address);

    // Convert the balance from a BigNumber to a human-readable format if necessary
    return Number(balance); // Assuming the token has 18 decimals
  } catch (error) {
    console.error('Error reading balance:', error);
    throw error;
  }
}