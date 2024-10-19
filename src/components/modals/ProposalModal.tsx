import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Card,
  Text,
  Box,
  Input,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {marked} from "marked"; // Use marked for markdown
import { toast } from 'react-toastify'
import { useAccount, useWriteContract } from "wagmi";
import { config } from "@/services/wagmi/config";
import governanceAbi from '../../Blockchain/abis/GovernanceContractAbi.json'
import governanceTokenAbi from '../../Blockchain/abis/GovernanceTokenAbi.json'
import { baseSepolia } from "viem/chains";
const ProposalModal = ({
  buttonText,
  backGroundOverLay,
  governanceContractAddress,
  tokenAddress,
  ...restProps
}: any) => {
  const [title, setTitle] = useState(""); // Title state
  const [description, setDescription] = useState<any>(""); // Markdown text state
  const [isPreview, setIsPreview] = useState(false); // Toggle for preview mode
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [paramsFilled, setparamsFilled] = useState<boolean>(false)
  const {address}=useAccount()
  // Toggle Preview mode
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };
  const {
    writeContractAsync: writeContractAsyncApprove,
    data: dataApprove,
    status: statusApprove,
  } = useWriteContract({
    config,
  });

  const handleTransaction = async () => {
    try {
      {
        const approve=await writeContractAsyncApprove({
          abi:governanceAbi,
          address: governanceContractAddress,
          functionName: 'propose',
          args: [
            [],
            [],
            [],
            description
          ],
          chain:baseSepolia
       })
       const toastid = toast.info(
        // `Please wait your transaction is running in background : supply and staking - ${inputAmount} ${currentSelectedCoin} `,
        `Transaction pending`,
        {
          position: 'bottom-right',
          autoClose: false,
        }
      )
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
      console.log(err,"err approve")
      // setTransactionFailed(true);
      // console.log(err,"approve err")
      // const uqID = getUniqueId()
      let data: any = localStorage.getItem('transactionCheck')
      data = data ? JSON.parse(data) : []
      if (data) {
        // setTransactionStarted(false)
        // dispatch(setTransactionStatus("failed"));
      }
      //console.log(uqID, "transaction check supply transaction failed : ", err);

      const toastContent = (
        <div>
          Transaction declined{' '}
          {/* <CopyToClipboard text={err}>
            <Text as="u">copy error!</Text>
          </CopyToClipboard> */}
        </div>
      )
      toast.error(toastContent, {
        position: 'bottom-right',
        autoClose: false,
      })
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
  }

  useEffect(()=>{
    if(title!=='' && description!==''){
      setparamsFilled(true)
    }
  },[title,description])

  return (
    <div>
      <Button onClick={onOpen} {...restProps}>
        {buttonText}
      </Button>
      <Portal>
        <Modal isOpen={isOpen} onClose={onClose} size="5xl" isCentered>
          <ModalOverlay bg={backGroundOverLay} mt="3.8rem" />
          <ModalContent
            background="#151621"
            color="white"
            borderRadius="20px"
            maxW="462px"
            zIndex={1}
            mt="8rem"
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
            <ModalCloseButton mt="1rem" mr="1rem" />
            <ModalBody>
              <Box>
                <Card background="#151621" pb="2rem">
                  <Box display="flex" flexDirection="column" gap="0.5rem">
                    <Box>
                      <Text color="#C9D3EE">Title</Text>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                      <Text color="#C9D3EE">Description (Markdown Supported)</Text>

                      {/* Toggle between input (Textarea) and preview (rendered Markdown) */}
                      {!isPreview ? (
                        <Textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Enter proposal description (Markdown supported)"
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
                          height="200px"
                        />
                      ) : (
                        <Box
                          mt="0.2rem"
                          backgroundColor="transparent"
                           border="1px solid #727DA133"
                          color="white"
                          padding="1rem"
                          borderRadius="md"
                          height="200px"
                          overflowY="auto"
                          className="markdown-preview" // Apply custom styles
                        >
                          {/* Render Markdown content */}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: marked(description) as any,
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    <Box mt="1rem" display="flex" justifyContent="space-between">
                      <Button onClick={togglePreview}>
                        {isPreview ? "Edit" : "Preview"}
                      </Button>
                      <Button colorScheme="blue" onClick={()=>{
                        handleTransaction()
                      }} isDisabled={!paramsFilled}>
                        Submit
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

export default ProposalModal;
