import { Box, Button, Input, Switch, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSignTypedData, useWriteContract } from "wagmi";
import StrategyDashboard from "./modals/StrategyModal";
import { config } from "@/services/wagmi/config";
import beckonproxyAbi from "../Blockchain/abis/beakonproxyAbi.json";
import { baseSepolia } from "viem/chains";
import { toast } from "react-toastify";
import { beaconFactoryAddress } from "@/constants/base-constants";
import GovernanceTokenModal from "./modals/GovernanceTokenModal";
const EnlistDashboard = () => {
  const { signTypedData } = useSignTypedData();
  const [executorAddresses, setexecutorAddresses] = useState<any>([]);
  const [proposerAddresses, setproposerAddresses] = useState<any>([]);
  const [adminAddres, setadminAddres] = useState<string>("");
  const [minDelay, setminDelay] = useState<number>(0);
  const [governancename, setgovernancename] = useState<string>("");
  const [governanceTokenAddress, setgovernanceTokenAddress] =
    useState<string>("");
  const [quorum, setquorum] = useState<number>(0);
  const [initialOwnerAddress, setinitialOwnerAddress] = useState<string>("");
  const [initialVotingDelay, setinitialVotingDelay] = useState<number>(0);
  const [initialVotingPeriod, setinitialVotingPeriod] = useState<number>(0);
  const [initialProposalThreshold, setinitialProposalThreshold] =
    useState<number>(0);
  const [transactionDetailsFullfiled, settransactionDetailsFullfiled] =
    useState(false);
  const {
    writeContractAsync: writeContractAsyncApprove,
    data: dataApprove,
    status: statusApprove,
  } = useWriteContract({
    config,
  });

  const {
    writeContractAsync: writeContractAsync,
    data: dataToken,
    status: statusToken,
  } = useWriteContract({
    config,
  });

  useEffect(() => {
    if (
      executorAddresses.length !== 0 &&
      proposerAddresses.length !== 0 &&
      adminAddres !== "" &&
      minDelay !== 0 &&
      governancename !== "" &&
      governanceTokenAddress !== "" &&
      quorum !== 0 &&
      initialOwnerAddress !== "" &&
      initialVotingDelay !== 0 &&
      initialVotingPeriod !== 0 &&
      initialProposalThreshold !== 0
    ) {
      settransactionDetailsFullfiled(true);
    }else{
      settransactionDetailsFullfiled(false)
    }
  }, [
    executorAddresses,
    proposerAddresses,
    adminAddres,
    minDelay,
    governanceTokenAddress,
    governancename,
    quorum,
    initialOwnerAddress,
    initialProposalThreshold,
    initialVotingDelay,
    initialVotingPeriod,
  ]);

  const handleTransaction = async () => {
    try {
      {
        const approve = await writeContractAsyncApprove({
          abi: beckonproxyAbi,
          address: '0xDbf641F3a981D6Ea74F079C4B989098588De3326',
          functionName: "createProxy",
          args: [
            {
              admin: adminAddres,
              minDelay: minDelay, // Minimum delay for timelock (in seconds // List of addresses allowed to execute
              proposers: proposerAddresses,
              executors: executorAddresses,
            },
            {
              name: governancename, // Custom governor name
              token: governanceTokenAddress, // Address of the voting token (IVotes)
                initialVotingDelay: initialVotingDelay, // Example value in seconds or blocks
                initialVotingPeriod: initialVotingPeriod, // Example value in blocks
                initialProposalThreshold: initialProposalThreshold, // Example value in tokens // The token clock mode initialized above
              quorum: quorum, // Quorum value (e.g., number of tokens required for quorum)
              initialOwner: initialOwnerAddress, // Address of the initial owner of the governo/
            },
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
  // Handle adding a new author
  const addAuthor = () => {
    setexecutorAddresses([...executorAddresses, ""]);
  };

  const addAdmin = () => {
    setproposerAddresses([...proposerAddresses, ""]);
  };

  // Handle changing an address for an author
  const handleAddressChange = (index: number, value: string) => {
    const updatedAddresses = [...executorAddresses];
    updatedAddresses[index] = value;
    setexecutorAddresses(updatedAddresses);
  };

  const handleAdminAddressChange = (index: number, value: string) => {
    const updatedAddresses = [...proposerAddresses];
    updatedAddresses[index] = value;
    setproposerAddresses(updatedAddresses);
  };

  const removeAuthor = (index: any) => {
    const updatedAuthors = executorAddresses.filter(
      (_: any, i: any) => i !== index
    );
    setexecutorAddresses(updatedAuthors);
  };

  const removeAdmin = (index: any) => {
    const updatedAuthors = proposerAddresses.filter(
      (_: any, i: any) => i !== index
    );
    setproposerAddresses(updatedAuthors);
  };
  return (
    <Box display="flex" gap="4rem" width="100%" padding="1rem 4rem" pt="5rem">
      <Box
        display="flex"
        flexDirection="column"
        mt="1rem"
        mb="2rem"
        width="60%"
      >
        <Box>
          <Text fontSize="32px" color="#C9D3EE" fontWeight="500">
            Deploy your Governance Model
          </Text>
        </Box>
        <Box mt="2rem">
          <Box
            border="1px solid #727DA133"
            borderRadius="6px"
            padding="16px"
            bg="#151621"
            color="#C9D3EE"
          >
            <Box>
              <Text fontSize="24px">Info</Text>
            </Box>
            <Box mt="1rem" display="flex" flexDirection="column" gap="1rem">
              <Box
                display="flex"
                alignItems="center"
                gap="0.5rem"
                border="1px solid #727DA133"
                borderRadius="16px"
                padding="8px 16px"
              >
                <Text whiteSpace="nowrap">Admin Address</Text>
                <Input
                  placeholder="Basic usage"
                  isRequired={true}
                  value={adminAddres}
                  onChange={(e) => {
                    setadminAddres(e.target.value);
                  }}
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
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap="0.5rem"
                border="1px solid #727DA133"
                borderRadius="16px"
                padding="8px 16px"
              >
                <Text whiteSpace="nowrap">Min Delay</Text>
                <Input
                  value={minDelay ? minDelay : ""}
                  onChange={(e) => setminDelay(Number(e.target.value))} // Converts string to number
                  placeholder="Basic usage"
                  border="0px"
                  type="number"
                  _placeholder={{
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
                display="flex"
                alignItems="center"
                gap="0.5rem"
                border="1px solid #727DA133"
                borderRadius="16px"
                padding="8px 16px"
              >
                <Text whiteSpace="nowrap">Name</Text>
                <Input
                  value={governancename}
                  onChange={(e) => {
                    setgovernancename(e.target.value);
                  }}
                  placeholder="Basic usage"
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
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap="0.5rem"
                border="1px solid #727DA133"
                borderRadius="16px"
                padding="8px 16px"
              >
                <Text whiteSpace="nowrap">Governance token Address</Text>
                <Input
                  value={governanceTokenAddress}
                  onChange={(e) => {
                    setgovernanceTokenAddress(e.target.value);
                  }}
                  placeholder="Basic usage"
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
                <GovernanceTokenModal
                  buttonText="Deploy token"
                  padding="1.2rem"
                  bg="black"
                  width="100%"
                  color="#3FE0B2"
                  height={"2rem"}
                  fontSize={"14px"}
                  lineHeight="14px"
                  border="1px solid #3FE0B2"
                  _hover={{ bg: "#3FE0B2", color: "black" }}
                  borderRadius={"6px"}
                />
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap="0.5rem"
                border="1px solid #727DA133"
                borderRadius="16px"
                padding="8px 16px"
              >
                <Text whiteSpace="nowrap">Quorum</Text>
                <Input
                  value={quorum ? quorum : ""}
                  onChange={(e) => {
                    setquorum(Number(e.target.value));
                  }}
                  placeholder="Basic usage"
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
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap="0.5rem"
                border="1px solid #727DA133"
                borderRadius="16px"
                padding="8px 16px"
              >
                <Text whiteSpace="nowrap">Initial Owmer Address</Text>
                <Input
                  value={initialOwnerAddress}
                  onChange={(e) => {
                    setinitialOwnerAddress(e.target.value);
                  }}
                  placeholder="Basic usage"
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
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap="0.5rem"
                border="1px solid #727DA133"
                borderRadius="16px"
                padding="8px 16px"
              >
                <Text whiteSpace="nowrap">Initial Voting Delay</Text>
                <Input
                  value={initialVotingDelay ? initialVotingDelay : ""}
                  onChange={(e) => {
                    setinitialVotingDelay(Number(e.target.value));
                  }}
                  placeholder="Basic usage"
                  border="0px"
                  type="number"
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
                display="flex"
                alignItems="center"
                gap="0.5rem"
                border="1px solid #727DA133"
                borderRadius="16px"
                padding="8px 16px"
              >
                <Text whiteSpace="nowrap">Initial Voting Period</Text>
                <Input
                  value={initialVotingPeriod ? initialVotingPeriod : ""}
                  onChange={(e) => {
                    setinitialVotingPeriod(Number(e.target.value));
                  }}
                  placeholder="Basic usage"
                  border="0px"
                  type="number"
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
                display="flex"
                alignItems="center"
                gap="0.5rem"
                border="1px solid #727DA133"
                borderRadius="16px"
                padding="8px 16px"
              >
                <Text whiteSpace="nowrap">Initial Proposal Threshold</Text>
                <Input
                  value={
                    initialProposalThreshold ? initialProposalThreshold : ""
                  }
                  onChange={(e) => {
                    setinitialProposalThreshold(Number(e.target.value));
                  }}
                  placeholder="Basic usage"
                  type="number"
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
              </Box>
            </Box>
          </Box>
        </Box>
        <Box mt="2rem">
          <Box
            border="1px solid #727DA133"
            borderRadius="6px"
            padding="16px"
            bg="#151621"
            color="#C9D3EE"
          >
            <Box>
              <Text fontSize="24px">Proposers</Text>
            </Box>
            {proposerAddresses.length > 0 && (
              <Box mt="1rem" display="flex" flexDirection="column" gap="1rem">
                {proposerAddresses.map((proposer: any, index: number) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    gap="0.5rem"
                    border="1px solid #727DA133"
                    borderRadius="16px"
                    padding="8px 16px"
                  >
                    <Input
                      placeholder="0x....ff"
                      value={proposer}
                      onChange={(e) =>
                        handleAdminAddressChange(index, e.target.value)
                      }
                      border="0px"
                      _placeholder={{
                        color: "#3E415C",
                        fontSize: ".89rem",
                        fontWeight: "600",
                      }}
                      _focus={{ outline: "0", boxShadow: "none" }}
                    />
                    <Button
                      backgroundColor="#676D9A1A"
                      border="1px solid #676D9A4D"
                      _hover={{ backgroundColor: "transparent" }}
                      color="#f2f2f2"
                      onClick={() => {
                        removeAdmin(index);
                      }}
                      isDisabled={proposerAddresses.length === 0}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 1L7 7M7 7L1 13M7 7L13 13M7 7L1 1"
                          stroke="#F0F0F5"
                          stroke-width="1.31"
                          stroke-linecap="round"
                        />
                      </svg>
                    </Button>
                  </Box>
                ))}
              </Box>
            )}
            <Button
              mt="1rem"
              onClick={() => {
                addAdmin();
              }}
            >
              + Add Proposers
            </Button>
          </Box>
        </Box>
        <Box mt="2rem">
          <Box
            border="1px solid #727DA133"
            borderRadius="6px"
            padding="16px"
            bg="#151621"
            color="#C9D3EE"
          >
            <Box>
              <Text fontSize="24px">Executors</Text>
            </Box>
            {executorAddresses.length > 0 && (
              <Box mt="1rem" display="flex" flexDirection="column" gap="1rem">
                {executorAddresses.map((executor: any, index: number) => (
                  <Box
                    key={index}
                    display="flex"
                    alignItems="center"
                    gap="0.5rem"
                    border="1px solid #727DA133"
                    borderRadius="16px"
                    padding="8px 16px"
                  >
                    <Input
                      placeholder="0x....ff"
                      value={executor}
                      onChange={(e) =>
                        handleAddressChange(index, e.target.value)
                      }
                      border="0px"
                      _placeholder={{
                        color: "#3E415C",
                        fontSize: ".89rem",
                        fontWeight: "600",
                      }}
                      _focus={{ outline: "0", boxShadow: "none" }}
                    />
                    <Button
                      backgroundColor="#676D9A1A"
                      border="1px solid #676D9A4D"
                      _hover={{ backgroundColor: "transparent" }}
                      color="#f2f2f2"
                      onClick={() => {
                        removeAuthor(index);
                      }}
                      isDisabled={executorAddresses.length === 0}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13 1L7 7M7 7L1 13M7 7L13 13M7 7L1 1"
                          stroke="#F0F0F5"
                          stroke-width="1.31"
                          stroke-linecap="round"
                        />
                      </svg>
                    </Button>
                  </Box>
                ))}
              </Box>
            )}
            <Button
              mt="1rem"
              onClick={() => {
                addAuthor();
              }}
            >
              + Add Executors
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        bg="#151621"
        mt="1rem"
        padding="1rem 2rem"
        color="#C9D3EE"
        gap="1.5rem"
        borderRadius="6px"
        height="150px"
        width="25%"
        border="1px solid #727DA133"
      >
        <Box>
          <Text fontSize="24px">Actions</Text>
        </Box>
        <Button
          width="100%"
          padding="1.2rem"
          bg="black"
          color="#3FE0B2"
          height={"2rem"}
          fontSize={"14px"}
          lineHeight="14px"
          border="1px solid #3FE0B2"
          _hover={{ bg: "#3FE0B2", color: "black" }}
          borderRadius={"6px"}
          // isDisabled={!transactionDetailsFullfiled}
          onClick={() => {
            handleTransaction();
          }}
        >
          Deploy
        </Button>
      </Box>
    </Box>
  );
};

export default EnlistDashboard;
