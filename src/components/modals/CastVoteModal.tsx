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
import governanceAbi from "../../Blockchain/abis/GovernanceContractAbi.json";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";
import governanceTokenAbi from "../../Blockchain/abis/GovernanceTokenAbi.json";
import beackonAbi from '../../Blockchain/abis/beakonproxyAbi.json'
// import { toast } from "react-toastify";
// import CopyToClipboard from "react-copy-to-clipboard";

import { useRouter } from "next/router";
import {
  useAccount,
  useConnect,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import MetamaskIcon from "@/assets/icons/MetamaskIcon";
import CoinbaseIcon from "@/assets/icons/CoinbaseIcon";
import { config } from "@/services/wagmi/config";
import useBalanceofWagmi from "@/Blockchain/hooks/reads/useBalanceOf";
import { baseSepolia } from "viem/chains";
import {
  readBalance,
  readDelegateLimit,
} from "@/Blockchain/scripts/governanceCalls";
import numberFormatter from "@/constants/numberFormatter";
import { ethers } from "ethers";
const CastVoteModal = ({
  buttonText,
  voteChoice,
  tokenAddress,
  governanceContractAddress,
  proposalId,
  backGroundOverLay,
  ...restProps
}: any) => {
  const [availableDataLoading, setAvailableDataLoading] = useState(true);
  const [walletConnectedRefresh, setWalletConnectedRefresh] = useState(false);
  const [inputAmount, setinputAmount] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [balance, setbalance] = useState<number>(0);
  const [delegatedAddress, setdelegatedAddress] = useState<string>("");
  const Votecharge: any = {
    Against: 0,
    For: 1,
    Abstain: 2,
  };
  const { address } = useAccount();
  useEffect(() => {
    const fetchValues = async () => {
      const res = await readDelegateLimit(tokenAddress, address as string);
      const res2 = await readBalance(tokenAddress, address as string);
      if (res) {
        setdelegatedAddress(res);
      }
      if (res2) {
        setbalance(res2);
      }
    };
    fetchValues();
  }, [address, tokenAddress]);
  function getVoteCharge(voteChoice: any) {
    return Votecharge[voteChoice];
  }
  const handleChange = (newValue: any) => {
    // Calculate the percentage of the new value relative to the wallet balance
    if (newValue > 9_000_000_000) return;
    // check if newValue is float, if it is then round off to 6 decimals

    var percentage = (newValue * 100) / 30;
    // if (walletBalance == 0) {
    //   setDepositAmount(0);
    //   setinputAmount(0);
    // }
    percentage = Math.max(0, percentage);
    if (percentage > 100) {
      setSliderValue(100);
      setinputAmount(newValue);
    } else {
      percentage = Math.round(percentage);
      if (isNaN(percentage)) {
      } else {
        setSliderValue(percentage);
        setinputAmount(newValue);
      }
    }
  };
  const {
    connect: connectWagmi,
    connectors: wagmiConnectors,
    error,
  } = useConnect();
  const router = useRouter();
  const {
    writeContractAsync: writeContractAsyncApprove,
    data: dataApprove,
    status: statusApprove,
  } = useWriteContract({
    config,
  });
  const {data:result} = useWaitForTransactionReceipt({
    hash: dataApprove,
    chainId:baseSepolia.id
  })
  const decodeLogs = (receipt:any) => {
    if (receipt && receipt.logs) {
      const contractInterface = new ethers.utils.Interface(beackonAbi);
      
      const events = receipt.logs.map((log: { topics: Array<string>; data: string; }) => {
        try {
          return contractInterface.parseLog(log); // Decodes the log using the contract ABI
        } catch (error) {
          console.error('Failed to parse log', error);
          return null;
        }
      }).filter((event: null) => event !== null); // Filter out null values for logs that don't match the ABI

      return events;
    }
    return [];
  };
  const handleTransaction = async () => {
    try {
      {
        const approve = await writeContractAsyncApprove({
          abi: governanceAbi,
          address: governanceContractAddress,
          functionName: "castVote",
          args: [proposalId, getVoteCharge(voteChoice)],
          chain: baseSepolia,
        });
        const toastid = toast.info(
          // `Please wait your transaction is running in background : supply and staking - ${inputAmount} ${currentSelectedCoin} `,
          `Transaction pending`,
          {
            position: "bottom-right",
            autoClose: false,
          }
        );
        // const uqID = getUniqueId()
        // let data: any = localStorage.getItem('transactionCheck')
        // data = data ? JSON.parse(data) : []
        // if (data && data.includes(uqID)) {
        //   dispatch(setTransactionStatus('success'))
        // }
        ////console.log("Status transaction", deposit);
        //console.log(isSuccessDeposit, "success ?");
      }
    } catch (err: any) {
      console.log(err, "err approve");
      // setTransactionFailed(true);
      // console.log(err,"approve err")
      // const uqID = getUniqueId()
      let data: any = localStorage.getItem("transactionCheck");
      data = data ? JSON.parse(data) : [];
      if (data) {
        // setTransactionStarted(false)
        // dispatch(setTransactionStatus("failed"));
      }
      //console.log(uqID, "transaction check supply transaction failed : ", err);

      const toastContent = (
        <div>
          Transaction declined{" "}
          {/* <CopyToClipboard text={err}>
            <Text as="u">copy error!</Text>
          </CopyToClipboard> */}
        </div>
      );
      toast.error(toastContent, {
        position: "bottom-right",
        autoClose: false,
      });
      //console.log("supply", err);
      // toast({
      //   description: "An error occurred while handling the transaction. " + err,
      //   variant: "subtle",
      //   position: "bottom-right",
      //   status: "error",
      //   isClosable: true,
      // });
      // toast({
      //   variant: "subtle",
      //   position: "bottom-right",
      //   render: () => (
      //     <Box
      //       display="flex"
      //       flexDirection="row"
      //       justifyContent="center"
      //       alignItems="center"
      //       bg="rgba(40, 167, 69, 0.5)"
      //       height="48px"
      //       borderRadius="6px"
      //       border="1px solid rgba(74, 194, 107, 0.4)"
      //       padding="8px"
      //     >
      //       <Box>
      //         <SuccessTick />
      //       </Box>
      //       <Text>You have successfully supplied 1000USDT to check go to </Text>
      //       <Button variant="link">Your Supply</Button>
      //       <Box>
      //         <CancelSuccessToast />
      //       </Box>
      //     </Box>
      //   ),
      //   isClosable: true,
      // });
    }
  };
  const handleDelegate = async () => {
    try {
      {
        const approve = await writeContractAsyncApprove({
          abi: governanceTokenAbi,
          address: tokenAddress,
          functionName: "delegate",
          args: [address],
          chain: baseSepolia,
        });
        const toastid = toast.info(
          // `Please wait your transaction is running in background : supply and staking - ${inputAmount} ${currentSelectedCoin} `,
          `Transaction pending`,
          {
            position: "bottom-right",
            autoClose: false,
          }
        );
        // const uqID = getUniqueId()
        // let data: any = localStorage.getItem('transactionCheck')
        // data = data ? JSON.parse(data) : []
        // if (data && data.includes(uqID)) {
        //   dispatch(setTransactionStatus('success'))
        // }
        ////console.log("Status transaction", deposit);
        //console.log(isSuccessDeposit, "success ?");
      }
    } catch (err: any) {
      console.log(err, "err approve");
      // setTransactionFailed(true);
      // console.log(err,"approve err")
      // const uqID = getUniqueId()
      let data: any = localStorage.getItem("transactionCheck");
      data = data ? JSON.parse(data) : [];
      if (data) {
        // setTransactionStarted(false)
        // dispatch(setTransactionStatus("failed"));
      }
      //console.log(uqID, "transaction check supply transaction failed : ", err);

      const toastContent = (
        <div>
          Transaction declined{" "}
          {/* <CopyToClipboard text={err}>
            <Text as="u">copy error!</Text>
          </CopyToClipboard> */}
        </div>
      );
      toast.error(toastContent, {
        position: "bottom-right",
        autoClose: false,
      });
      //console.log("supply", err);
      // toast({
      //   description: "An error occurred while handling the transaction. " + err,
      //   variant: "subtle",
      //   position: "bottom-right",
      //   status: "error",
      //   isClosable: true,
      // });
      // toast({
      //   variant: "subtle",
      //   position: "bottom-right",
      //   render: () => (
      //     <Box
      //       display="flex"
      //       flexDirection="row"
      //       justifyContent="center"
      //       alignItems="center"
      //       bg="rgba(40, 167, 69, 0.5)"
      //       height="48px"
      //       borderRadius="6px"
      //       border="1px solid rgba(74, 194, 107, 0.4)"
      //       padding="8px"
      //     >
      //       <Box>
      //         <SuccessTick />
      //       </Box>
      //       <Text>You have successfully supplied 1000USDT to check go to </Text>
      //       <Button variant="link">Your Supply</Button>
      //       <Box>
      //         <CancelSuccessToast />
      //       </Box>
      //     </Box>
      //   ),
      //   isClosable: true,
      // });
    }
  };

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
              Cast Vote
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
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="0.5rem"
                    padding="16px"
                    borderRadius="6px"
                    border="1px solid #727DA133"
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Text color="#C9D3EE">Your Choice:</Text>
                      <Text color="#727DA1">YES</Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text color="#C9D3EE">Voting Power:</Text>
                      <Text color="#727DA1">
                        {numberFormatter(balance)} AAVE
                      </Text>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      width="100%"
                      justifyContent="center"
                    >
                      {delegatedAddress ===
                      "0x0000000000000000000000000000000000000000" ? (
                        <Button
                          width="100%"
                          onClick={() => {
                            handleDelegate();
                          }}
                        >
                          Delegate First
                        </Button>
                      ) : (
                        <Button
                          disabled={balance === 0}
                          mt="1rem"
                          width="100%"
                          onClick={() => {
                            handleTransaction();
                          }}
                        >
                          Cast Vote
                        </Button>
                      )}
                    </Box>
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
export default CastVoteModal;
