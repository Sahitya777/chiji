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
const CastVoteModal = ({
  buttonText,
  voteChoice,
  tokenAddress,
  backGroundOverLay,
  ...restProps
}: any) => {
  const [availableDataLoading, setAvailableDataLoading] = useState(true);
  const [walletConnectedRefresh, setWalletConnectedRefresh] = useState(false);
  const [inputAmount, setinputAmount] = useState<number>(0)
  const [sliderValue, setSliderValue] = useState(0)
  const handleChange = (newValue: any) => {
    // Calculate the percentage of the new value relative to the wallet balance
    if (newValue > 9_000_000_000) return
    // check if newValue is float, if it is then round off to 6 decimals

    var percentage = (newValue * 100) / 30
    // if (walletBalance == 0) {
    //   setDepositAmount(0);
    //   setinputAmount(0);
    // }
    percentage = Math.max(0, percentage)
    if (percentage > 100) {
      setSliderValue(100)
      setinputAmount(newValue)
    } else {
      percentage = Math.round(percentage)
      if (isNaN(percentage)) {
      } else {
        setSliderValue(percentage)
        setinputAmount(newValue)
      }
    }
  }
  const balance=useBalanceofWagmi('address')
  console.log(balance,'v')
  const {
    connect: connectWagmi,
    connectors: wagmiConnectors,
    error,
  } = useConnect();
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
                      <Text color="#C9D3EE">Max Voting Power:</Text>
                      <Text color="#727DA1">20k AAVE</Text>
                    </Box>
                    <Box display="flex" flexDirection="column" mt="1rem">
                      <Box display='flex' justifyContent="space-between">
                        <Text color='#727DA1'>
                          Add Votes
                        </Text>
                        <Text color='#727DA1'>
                          Balance:
                        </Text>
                      </Box>
                      <Box
                        width="100%"
                        color="white"
                        borderRadius="6px"
                        display="flex"
                        justifyContent="space-between"
                        mt="0.3rem"
                        border="1px solid white"
                      >
                        <NumberInput
                          border="0px"
                          min={0}
                          keepWithinRange={true}
                          onChange={handleChange}
                          value={inputAmount ? inputAmount : ''}
                          outline="none"
                          precision={1}
                          step={parseFloat(`${inputAmount <= 99999 ? 0.1 : 0}`)}
                          // isDisabled={transactionStarted == true}
                          _disabled={{ cursor: "pointer" }}
                        >
                          <NumberInputField
                            _disabled={{ color: "#00D395" }}
                            border="0px"
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
                        </NumberInput>
                      </Box>
                      
                <Box
                  pt={5}
                  pb={2}
                  pr="0.5"
                  mt="1rem"
                  // width={`${sliderValue > 86 ? "96%" : "100%"}`}
                  // mr="auto"
                  // transition="ease-in-out"
                  display="flex"
                >
                  <Slider
                    aria-label="slider-ex-6"
                    defaultValue={sliderValue}
                    value={sliderValue}
                    onChange={(val) => {
                      setSliderValue(val)
                      var ans = (val / 100) * 40
                      ////console.log(ans);
                      if (val == 100) {
                        setinputAmount(40)
                      } else {
                        // ans = Math.round(ans * 100) / 100;
                        if (ans < 10) {
                          setinputAmount(parseFloat(ans.toFixed(7)))
                        } else {
                          ans = Math.round(ans * 100) / 100
                          setinputAmount(ans)
                        }
                        ////console.log(ans)
                        // dispatch(setInputSupplyAmount(ans));
                      }
                    }}
                    // isDisabled={transactionStarted == true}
                    _disabled={{ cursor: 'pointer' }}
                    focusThumbOnChange={false}
                  >
                

                    <SliderMark
                      value={30}
                      textAlign="center"
                      color="white"
                      mt="-8"
                      // ml={sliderValue !== 100 ? '-5' : '-6'}
                      w="12"
                      fontSize="12px"
                      fontWeight="400"
                      lineHeight="20px"
                      letterSpacing="0.25px"
                    >
                      {/* {sliderValue}% */}
                    </SliderMark>

                    <SliderTrack bg="#3E415C">
                      <SliderFilledTrack
                        bg="white"
                        // w={`${sliderValue}`}
                        _disabled={{ bg: 'white' }}
                      />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </Box>
                    </Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      width="100%"
                      justifyContent="center"
                    >
                      <Button mt="1rem" width="100%" onClick={() => {}}>
                        Cast Vote
                      </Button>
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
