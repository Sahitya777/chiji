import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import ConnectWallet from "./modals/ConnectWallet";
import { useAccount, useDisconnect } from "wagmi";
import Image from "next/image";
import DropdownIcon from "@/assets/icons/DropdownIcon";
import { useRouter } from "next/router";

const Navbar = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [walletDropdown, setwalletDropdown] = useState(false);
  const router=useRouter()
  return (
    <Box
      bgColor="#0B0C14"
      height="4rem"
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      position="fixed"
      padding="12px 32px"
    >
      <Box display="flex" gap="2rem">
        <Box color="#C9D3EE" fontSize="18px" cursor="pointer" onClick={()=>{
            router.push('/')
        }}>Logo</Box>
        <Box display="flex" gap="1rem">
          <Box color={router.pathname==='/createSpace'? '#3FE0B2':"#C9D3EE"} fontSize="18px" onClick={()=>{
            router.replace('/createSpace')
          }} cursor="pointer" _hover={{color:'white'}} fontWeight="500">Create Spaces</Box>
          <Box color={router.pathname==='/enlist'? '#3FE0B2':"#C9D3EE"} fontSize="18px" onClick={()=>{
            router.replace('/enlist')
          }} cursor="pointer" _hover={{color:'white'}} fontWeight="500">Enlist</Box>
        </Box>
      </Box>
      <Box display="flex" gap="1rem" alignItems="center">
        {!address ? (
          <ConnectWallet
            buttonText="Connect Wallet"
            width="100%"
            padding="1.2rem"
            backgroundColor="black"
            color="#3FE0B2"
            height={"2rem"}
            fontSize={"14px"}
            lineHeight="14px"
            border="1px solid #3FE0B2"
            _hover={{ bg: "#3FE0B2", color: "black" }}
            borderRadius={"6px"}
            backGroundOverLay="#FAFAFA33"
          ></ConnectWallet>
        ) : (
          <Box>
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="6px"
              // bg="black"
              border="1px solid #3FE0B2"
              cursor="pointer"
              padding="4px"
            //   padding="1.2rem"
              gap={2.5}
              onClick={() => {
                setwalletDropdown(!walletDropdown);
              }}
            >
              <Image
                alt=""
                src={"/base.jpg"}
                width="16"
                height="16"
                style={{ cursor: "pointer",marginLeft:'0.2rem' }}
              />
              <Text
                fontSize="14px"
                fontWeight="500"
                color="#FFFFFF"
                lineHeight="20px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                {`${address.substring(0, 3)}...${address.substring(
                  address.length - 9,
                  address.length
                )}`}
              </Text>
              <Box mr="0.4rem">
                <DropdownIcon />
              </Box>
            </Box>
            {walletDropdown && (
              <Box
                position="absolute"
                top="3.3rem"
                right="7rem"
                mt="0.4rem"
                bg="#0B0C14"
                border="1px solid #727DA133"
                borderRadius="6px"
                zIndex="10"
                padding="16px"
                width="230px"
                display="flex"
                justifyContent="flex-end"
              >
                <Text
                  bg="transparent"
                  color="#FFFFFF"
                  cursor="pointer"
                  onClick={() => {
                    localStorage.setItem("lastUsedConnector", "");
                    localStorage.setItem("connected", "");
                    disconnect();
                    setwalletDropdown(false); // Close dropdown after disconnect
                  }}
                >
                  Disconnect
                </Text>
              </Box>
            )}
          </Box>
        )}
        <Box color="#C9D3EE" fontSize="18px" cursor="pointer">Settings</Box>
      </Box>
    </Box>
  );
};

export default Navbar;
