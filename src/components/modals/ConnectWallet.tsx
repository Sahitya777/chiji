import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  ModalBody,
  ModalCloseButton,
  Card,
  Text,
  Checkbox,
  Tooltip,
  Box,
  NumberInput,
  NumberInputField,
  Portal,
  SliderThumb,
  Skeleton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import Image from "next/image";

import Link from "next/link";

// import { toast } from "react-toastify";
// import CopyToClipboard from "react-copy-to-clipboard";

import { useRouter } from "next/router";
import { useAccount, useConnect } from "wagmi";
import MetamaskIcon from "@/assets/icons/MetamaskIcon";
import CoinbaseIcon from "@/assets/icons/CoinbaseIcon";
const ConnectWallet = ({
  buttonText,
  backGroundOverLay,
  ...restProps
}: any) => {
  const [availableDataLoading, setAvailableDataLoading] = useState(true);
  const [walletConnectedRefresh, setWalletConnectedRefresh] = useState(false);
  const {
    connect: connectWagmi,
    connectors: wagmiConnectors,
    error,
  } = useConnect();
  console.log(wagmiConnectors,'c')
  const {address}=useAccount()
  const router = useRouter();

  // mixpanel.identify("13793");

  // useEffect(() => {
  //   const interval = setInterval(refresh, 200);
  //   return () => clearInterval(interval);
  // }, [refresh]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAvailableDataLoading(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, []);
  ////console.log(account ,"index page")
  ////console.log("Index reload check",account);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(()=>{
    if(address){
        onClose()
    }
  },[address])
  const { ref } = router.query;
  // if(ref){
  //   dispatch(setReferral(ref));
  // }

  return (
    <div>
      <Button onClick={onOpen} {...restProps}>
        {buttonText}
      </Button>
      <Portal>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            // if (setIsOpenCustom) setIsOpenCustom(false);
          }}
          size={{ width: "800px", height: "100px" }}
          isCentered
        >
          <ModalOverlay bg={backGroundOverLay} mt="3.8rem" />
          <ModalContent
            background="#151621"
            color="white"
            borderRadius="20px"
            maxW="462px"
            zIndex={1}
            mt="8rem"
            className="modal-content"
          >
            <ModalHeader
              mt="1rem"
              fontSize="14px"
              fontWeight="600"
              fontStyle="normal"
              lineHeight="20px"
            >
              Connect Wallet
            </ModalHeader>
            <ModalCloseButton
              // onClick={() => {
              //   if (setIsOpenCustom) setIsOpenCustom(false);
              // }}
              mt="1rem"
              mr="1rem"
            />
            <ModalBody>
              <Box>
                <Card
                  //   p="1rem"
                  background="#151621"
                  width="400px"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="1rem"
                    mb="1.5rem"
                  >
                    {availableDataLoading ? (
                      // Always render this loading state until data is fully loaded
                      <></>
                    ) : (
                      wagmiConnectors.filter((connector: any) => 
                        connector.id === 'metaMaskSDK' || connector.id === 'coinbaseWalletSDK' || connector.id === 'walletConnect'
                      ).map((connector: any) => (
                        <Box
                          w="full"
                          border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                          py="2"
                          borderRadius="20px"
                          gap="0.3rem"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          // justifyContent="space-between"
                          cursor="pointer"
                          // mb="16px"
                          // onClick={() => router.push("/market")}
                          key={connector.id}
                          onClick={() => {
                            localStorage.setItem(
                              "lastUsedConnector",
                              "MetaMask"
                            );
                            localStorage.setItem("connected", "MetaMask");
                            localStorage.setItem("networkConnected", "Base");
                            connectWagmi({ connector });
                            //   router.replace(marketHref2)
                          }}
                        >
                          <Box p="1">
                            {connector.id == "metaMaskSDK" ? (
                              <MetamaskIcon />
                            ) : (
                              <CoinbaseIcon />
                            )}
                          </Box>
                          <Box color="white">
                            {availableDataLoading ? (
                              <Skeleton
                                width="6rem"
                                height="1.4rem"
                                startColor="#101216"
                                endColor="#2B2F35"
                                borderRadius="6px"
                              />
                            ) : connector.id == "metaMaskSDK" ? (
                              "MetaMask"
                            ) : connector.id == "coinbaseWalletSDK" ? (
                              "Coinbase"
                            ) : (
                              "Wallet Connect"
                            )}
                          </Box>
                        </Box>
                      ))
                    )}
                  </Box>
                </Card>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Portal>
    </div>
  );
};
export default ConnectWallet;
