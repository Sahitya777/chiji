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
  Select,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import governancTokenAbi from "../../Blockchain/abis/GovernanceTokenAbi.json";
import Image from "next/image";
import { toast } from "react-toastify";
import Link from "next/link";

// import { toast } from "react-toastify";
// import CopyToClipboard from "react-copy-to-clipboard";

import { useRouter } from "next/router";
import {
  useAccount,
  useConnect,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import MetamaskIcon from "@/assets/icons/MetamaskIcon";
import CoinbaseIcon from "@/assets/icons/CoinbaseIcon";
import { config } from "@/services/wagmi/config";
import useBalanceofWagmi from "@/Blockchain/hooks/reads/useBalanceOf";
import { baseSepolia } from "viem/chains";
import { governorTokenContractAddress } from "@/constants/base-constants";
const GovernanceTokenModal = ({
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
  const [name, setname] = useState<string>('')
  const [symbol, setsymbol] = useState<string>('')
  const [owner, setowner] = useState<string>('')
  const [initialSupply, setinitialSupply] = useState<number>(0)
  const [maxSupply, setmaxSupply] = useState<number>(0)
  const [tokenChoice, settokenChoice] = useState('erc20')
  const Votecharge: any = {
    Against: 0,
    For: 1,
    Abstain: 2,
  };
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
  const { address } = useAccount();
  const router = useRouter();
  const {
    writeContractAsync: writeContractAsyncApprove,
    data: dataApprove,
    status: statusApprove,
  } = useWriteContract({
    config,
  });
  const {
    isLoading: approveLoading,
    isSuccess: approveSuccess,
    data,
  } = useWaitForTransactionReceipt({
    hash: dataApprove,
  });
  const handleTransaction = async () => {
    try {
      {
        const approve = await writeContractAsyncApprove({
          abi: governancTokenAbi,
          address: governorTokenContractAddress as any,
          functionName:tokenChoice==='erc20'? "deployERC20Token":'deployUpgradeableERC20Token',
          args: [
            {name:name,
            symbol:symbol,
            initialOwner:owner,
            initialSupply:initialSupply,
            maxSupply: maxSupply}
          ],
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
          scrollBehavior="inside"
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
            mt="5.5rem"
            className="modal-content"
          >
            <ModalHeader
              mt="1rem"
              fontSize="14px"
              fontWeight="600"
              fontStyle="normal"
              lineHeight="20px"
            >
              Deploy Governance Token
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
                  color="#C9D3EE"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="0rem"
                    padding="16px"
                    borderRadius="6px"
                    border="1px solid #727DA133"
                  >
                    <Box padding="8px 16px">
                      <Text>Select token</Text>
                      <Select value={tokenChoice} onChange={(e)=>{
                        settokenChoice(e.target.value)
                      }}>
                        <option value="erc20">Erc 20</option>
                        <option value="erc20Upgradeable">Erc 20 Upgradeable</option>
                      </Select>
                    </Box>
                    <Box
                      // display="flex"
                      alignItems="center"
                      borderRadius="16px"
                      padding="8px 16px"
                    >
                      <Text whiteSpace="nowrap">Name</Text>
                      <Input
                          value={name}
                          onChange={(e) => {
                            setname(e.target.value);
                          }}
                        placeholder="Basic usage"
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
                    <Box
                      // display="flex"
                      alignItems="center"
                      borderRadius="16px"
                      padding="8px 16px"
                    >
                      <Text whiteSpace="nowrap">Symbol</Text>
                      <Input
                          value={symbol}
                          onChange={(e) => {
                            setsymbol(e.target.value);
                          }}
                        placeholder="Basic usage"
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
                    <Box
                      // display="flex"
                      alignItems="center"
                      borderRadius="16px"
                      padding="8px 16px"
                    >
                      <Text whiteSpace="nowrap">Initial Owner</Text>
                      <Input
                          value={owner}
                          onChange={(e) => {
                            setowner(e.target.value);
                          }}
                        placeholder="Basic usage"
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
                    <Box
                      // display="flex"
                      alignItems="center"
                      borderRadius="16px"
                      padding="8px 16px"
                    >
                      <Text whiteSpace="nowrap">Initial Supply</Text>
                      <Input
                        type="number"
                          value={initialSupply ?initialSupply:''}
                          onChange={(e) => {
                            setinitialSupply(Number(e.target.value));
                          }}
                        placeholder="Basic usage"
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
                    <Box
                      // display="flex"
                      alignItems="center"
                      borderRadius="16px"
                      padding="8px 16px"
                    >
                      <Text whiteSpace="nowrap">Max Supply</Text>
                      <Input
                          value={maxSupply ?maxSupply:''}
                          onChange={(e) => {
                            setmaxSupply(Number(e.target.value));
                          }}
                        type="number"
                        placeholder="Basic usage"
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
                    <Button mt="1rem" onClick={()=>{
                      handleTransaction()
                    }}>Deploy</Button>
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
export default GovernanceTokenModal;
