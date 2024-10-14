import DeployDetailsProd from "../contractAddresses.json";

let contractsEnv:any =  DeployDetailsProd["base-sepolia"] ;

export const governorTokenContractAddress:string=contractsEnv.governanceTokenContract;

export const beaconFactoryAddress:string=contractsEnv.beaconFactory;

