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
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import Image from "next/image";

import Link from "next/link";

// import { toast } from "react-toastify";
// import CopyToClipboard from "react-copy-to-clipboard";

import { useRouter } from "next/router";
import { useAccount, useConnect, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import MetamaskIcon from "@/assets/icons/MetamaskIcon";
import CoinbaseIcon from "@/assets/icons/CoinbaseIcon";
import { config } from "@/services/wagmi/config";
const ProposalModal = ({
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
  const { address } = useAccount();
  const router = useRouter();
  const { writeContractAsync:writeContractAsyncApprove, data:dataApprove,status:statusApprove } = useWriteContract({
    config,
  })
  const { isLoading:approveLoading, isSuccess:approveSuccess,data } = useWaitForTransactionReceipt({
    hash: dataApprove,
  })

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
  useEffect(() => {
    if (address) {
      onClose();
    }
  }, [address]);
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
              Create Proposal
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
                  pb="2rem"
                >
                  <Box display="flex" flexDirection="column" gap="0.5rem">
                    <Box>
                      <Text color="#C9D3EE">Title</Text>
                      <Input
                        placeholder="Enter proposal title"
                        mt="0.2rem"
                        color="white"
                        border="1px solid #727DA133"
                        _placeholder={{
                          color: "#3E415C",
                          fontSize: ".89rem",
                          fontWeight: "600",
                          outline: "none",
                        }}
                        _focus={{
                          outline: "0",
                          boxShadow: "none",
                        }}
                      />
                    </Box>
                    <Box mt="1rem">
                      <Text color="#C9D3EE">Description</Text>
                      <Textarea
                      border="1px solid #727DA133"
                        placeholder="Enter proposal title"
                        mt="0.2rem"
                        color="white"
                        _placeholder={{
                          color: "#3E415C",
                          fontSize: ".89rem",
                          fontWeight: "600",
                          outline: "none",
                        }}
                        _focus={{
                          outline: "0",
                          boxShadow: "none",
                        }}
                      />
                    </Box>
                    <Button mt="0.5rem" onClick={()=>{

                    }}>
                      Submit
                    </Button>
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
export default ProposalModal;
