import { Box, Button, SimpleGrid ,Text} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { baseSepolia } from "viem/chains";
import { useAccount, useEnsName, useSignMessage, useSignTypedData } from "wagmi";
import { useAvatar, useName } from '@coinbase/onchainkit/identity';
import axios from 'axios'
const SpacesDashboard = () => {
  const [spaces, setSpaces] = useState([
    { name: "Avnu", members: 70,id:'Avnu.eth',avatarImage:''},
    { name: "Avnu", members: 70,id:'Avnu.eth',avatarImage:'' },
    { name: "Avnu", members: 70,id:'Avnu.eth',avatarImage:''},
    { name: "Avnu", members: 70,id:'Avnu.eth' ,avatarImage:''},
    { name: "Avnu", members: 70,id:'Avnu.eth',avatarImage:''},
  ]); // Example array of 20 items
  const {signTypedData,data}=useSignTypedData()
  const router = useRouter();
  const {address}=useAccount()
  const [userDetails, setuserDetails] = useState<any>()
  const addNetwork = async () => {
    try {
      // Check if window.ethereum is available
      if (window.ethereum) {
        let provider;
  
        // Check if multiple providers are present (MetaMask, Coinbase, etc.)
        if (window.ethereum.providers && window.ethereum.providers.length) {
          // Try to find the Coinbase Wallet provider
          provider = window.ethereum.providers.find((p: any) => p.isCoinbaseWallet) || window.ethereum.providers.find((p:any) => p.isMetaMask) || window.ethereum;
        } else {
          // Fallback to the default provider if there's no array of providers
          provider = window.ethereum;
        }
  
        // Log the detected provider to help troubleshoot
        console.log('Using provider:', provider.isCoinbaseWallet ? 'Coinbase Wallet' : provider.isMetaMask ? 'MetaMask' : 'Other');
  
        // Request to add the network using the detected provider
        await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x14a34', // Chain ID for Base Sepolia
              chainName: 'Base Sepolia',
              nativeCurrency: {
                name: 'SepoliaETH',
                symbol: 'ETH', // Symbol for Sepolia ETH
                decimals: 18,
              },
              rpcUrls: ['https://sepolia.base.org'], // Replace with the actual RPC URL
              blockExplorerUrls: ['https://sepolia.etherscan.io'], // Replace with the actual block explorer URL
            },
          ],
        });
  
      } else {
        console.error('No Ethereum provider found. Please install MetaMask or Coinbase Wallet.');
      }
    } catch (error) {
      console.error('Failed to add network:', error);
    }
  };
  const { data: name, isLoading: nameIsLoading } =  useName({ address:address as any, chain: baseSepolia as any });
  // const handleJoin=async()=>{
  //   const res=await axios.get(`https://5e27-106-51-118-108.ngrok-free.app/api/join/space/${address}/2`)
  //   console.log(res?.data,'data')
  // }
  // useEffect(()=>{
  //   if(address){
  //     const fetchDetails=async()=>{
  //       const res=await axios.get(`https://5e27-106-51-118-108.ngrok-free.app/api/activity/user/spaces/${address}`)
  //       console.log(res?.data,"fetch deatils")
  //     }
  //     fetchDetails()
  //   }
  // },[address])
  return (
    <Box display="flex" width="100%" padding="2rem" pt="5rem">
      <Box
        width="250px"
        display="flex"
        flexDirection="column"
        gap="1rem"
        bg="#151621"
        padding="16px 32px"
        borderRadius="6px"
        height="81vh"
        position="fixed"
      >
        <Box display="flex" gap="0.2rem">
          <Box display="flex" justifyContent="center" alignItems="center">
            {/* <BackIcon /> */}
          </Box>
          <Box
            color="#C9D3EE"
            fontSize="18px"
          >
            All Protocols
          </Box>
        </Box>
        <Box height="1px" border="1px solid white"></Box>
        <Box
          color="#C9D3EE"
          onClick={() => {
            // setprotocolStatus("overview");
          }}
          cursor="pointer"
          bg={"#303646"}
          padding="8px"
          borderRadius="6px"
        >
          Joined Spaces
        </Box>
      </Box>
      <Box width="70%" padding="1rem" ml="18rem">
        <SimpleGrid columns={4} spacingX={2} spacingY={5}>
          {/* Reduced horizontal spacing with spacingX */}
          {spaces.map((space, index) => (
            <Box
              key={index}
              cursor="pointer"
              bg="#151621"
              padding="1rem"
              height="220px"
              width="90%" // Reduced width for closer columns
              gap="0.5rem"
              borderRadius="8px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              boxShadow="md"
              onClick={() => {
                router.push(`/protocol/${space.id}`);
              }}
            >
              <Box>
                <Image
                  src={"/base.jpg"}
                  alt=""
                  height="44"
                  width="44"
                  style={{ cursor: "pointer", borderRadius: "40px" }}
                />
              </Box>
              <Box fontSize="18px" color="#C9D3EE">
                {space.name}
              </Box>
              <Box color="#C9D3EE">{space.members} members</Box>
              {address &&<Button
                width="80%"
                padding="1.2rem"
                bg="black"
                color="#3FE0B2"
                height={"2rem"}
                fontSize={"14px"}
                lineHeight="14px"
                border="1px solid #3FE0B2"
                _hover={{ bg: "#3FE0B2", color: "black" }}
                borderRadius={"6px"}
                onClick={(event) => {
                  event.stopPropagation(); 
                  // handleJoin()
                  // Prevents the Box's onClick from being triggered
                  // signTypedData({
                  //   types: {
                  //     Person: [
                  //       { name: 'name', type: 'string' },
                  //       { name: 'wallet', type: 'address' },
                  //     ],
                  //     Mail: [
                  //       { name: 'from', type: 'Person' },
                  //       { name: 'to', type: 'Person' },
                  //       { name: 'contents', type: 'string' },
                  //     ],
                  //   },
                  //   primaryType: 'Mail',
                  //   message: {
                  //     from: {
                  //       name: 'Cow',
                  //       wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                  //     },
                  //     to: {
                  //       name: 'Bob',
                  //       wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                  //     },
                  //     contents: 'Hello, Bob!',
                  //   },
                  // })
                }}
              >
                Join
              </Button>}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default SpacesDashboard;
