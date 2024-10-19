import {
  Box,
  Text,
  Table,
  TableContainer,
  Thead,
  Td,
  Tr,
  Tooltip,
  Tbody,
  HStack,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Image from "next/image";
import BackIcon from "@/assets/icons/BackIcon";
import { useRouter } from "next/router";
import CastVoteModal from "./modals/CastVoteModal";
import { useAccount } from "wagmi";
import ConnectWallet from "./modals/ConnectWallet";

const ProposalDashboard = () => {
  const [currentProposalState, setcurrentProposalState] = useState("Active");
  const [proposalDetails, setproposalDetails] = useState({});
  const columnItems = ["Member", "Action", "Votes"];
  const router = useRouter();
  const [proposalMembers, setproposalMembers] = useState([
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
      votes: 343,
      actionPerformed: "YES",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
      votes: 343,
      actionPerformed: "YES",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
      votes: 343,
      actionPerformed: "YES",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
      votes: 343,
      actionPerformed: "YES",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
      votes: 343,
      actionPerformed: "YES",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
      votes: 343,
      actionPerformed: "YES",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
      votes: 343,
      actionPerformed: "YES",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
      votes: 343,
      actionPerformed: "YES",
    },
  ]);
  const { address } = useAccount();
  const [currentVoteCasting, setcurrentVoteCasting] = useState("");
  return (
    <Box display="flex" padding="2rem 3rem" gap="4rem" pt="6rem">
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
        <Box display="flex" gap="0.2rem" cursor="pointer">
          <Box display="flex" justifyContent="center" alignItems="center">
            <BackIcon />
          </Box>
          <Box
            color="#C9D3EE"
            fontSize="18px"
            onClick={() => {
              router.push(`/protocol/${router.query.id}`);
            }}
          >
            All Proposals
          </Box>
        </Box>
        <Box
          display="flex"
          gap="0.5rem"
          alignItems="center"
          border="1px solid #727DA133"
          bg="#303646"
          padding="8px"
          borderRadius="6px"
        >
          <Image
            src="/APY_favicon.png"
            alt=""
            height="24"
            width="24"
            style={{ borderRadius: "24px" }}
          />
          <Text color="#C9D3EE" fontWeight="600" fontSize="18px">
            Aave
          </Text>
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
          Overview
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
        width="50%"
        ml="18rem"
      >
        <Box
          border={
            currentProposalState === "Active"
              ? "1px solid green"
              : "1px solid red"
          }
          padding="4px 8px"
          width="70px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg={currentProposalState === "Active" ? "green" : "red"}
          color="white"
          borderRadius="16px"
        >
          {currentProposalState}
        </Box>
        <Box display="flex" flexDirection="column" gap="0.5rem">
          <Box>
            <Text fontSize="24px" fontWeight="500" color="#C9D3EE">
              AIP-466: Proposal To Close Non-Essential Working Groups
            </Text>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" gap="0.4rem">
              <Image
                src="/APY_favicon.png"
                alt=""
                height="24"
                width="24"
                style={{ borderRadius: "24px" }}
              />
              <Text color="#727DA1">Protocol by address</Text>
            </Box>
            <Box color="#727DA1">Additional info</Box>
          </Box>
          <Box fontSize="24px" fontWeight="500" color="#C9D3EE" mt="2rem">
            PROPOSAL DETAILS
          </Box>
          <Box fontSize="18px" fontWeight="500" color="#C9D3EE" mt="2rem">
            Author: Sahi
          </Box>
          <Box fontSize="18px" fontWeight="500" color="#C9D3EE" mt="0.2rem">
            Date:24 Oct 2024
          </Box>
          <Box display="flex" flexDirection="column" gap="0.5rem">
            <Text color="#C9D3EE">Summary</Text>
            <Text>Summary text</Text>
            <Accordion borderStyle="none" defaultIndex={[0]} allowMultiple>
              <AccordionItem borderStyle="none">
                <h2>
                  <AccordionButton padding="0" margin="0">
                    <Box as="span" flex="1" textAlign="left">
                      Section 1 title
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel p="0" m="0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="1rem"
        padding="1rem 2rem"
        borderRadius="6px"
      >
        <Box
          display="flex"
          flexDirection="column"
          gap="0.5rem"
          border="1px solid #727DA133"
          bg="#151621"
          padding="16px"
          borderRadius="6px"
          width="300px"
        >
          <Box>
            <Text color="#C9D3EE" fontWeight="700">
              Protocol Info
            </Text>
          </Box>
          <Box display="flex" justifyContent="space-between" color="#C9D3EE">
            <Box>
              <Text>Voting System</Text>
            </Box>
            <Box>
              <Text>ERC20 balanceOf</Text>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" color="#C9D3EE">
            <Box>
              <Text>Start Date</Text>
            </Box>
            <Box>
              <Text>Oct 5, 2024, 4:21 PM</Text>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" color="#C9D3EE">
            <Box>
              <Text>End Date</Text>
            </Box>
            <Box>
              <Text>Oct 8, 2024, 4:21 PM</Text>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" color="#C9D3EE">
            <Box>
              <Text>Snapshot</Text>
            </Box>
            <Box>
              <Text>ERC20 balanceOf</Text>
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="0.5rem"
          border="1px solid #727DA133"
          bg="#151621"
          padding="16px"
          borderRadius="6px"
          width="300px"
        >
          <Text color="#C9D3EE" fontWeight="700">
            Current Results
          </Text>
          <Box display="flex" justifyContent="space-between" color="#C9D3EE">
            <Box>
              <Text>For</Text>
            </Box>
            <Box>
              <Text>1.4M STRK 92%</Text>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" color="#C9D3EE">
            <Box>
              <Text>Against</Text>
            </Box>
            <Box>
              <Text>1.4M STRK 5%</Text>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" color="#C9D3EE">
            <Box>
              <Text>Abstain</Text>
            </Box>
            <Box>
              <Text>1.4M STRK 3%</Text>
            </Box>
          </Box>
        </Box>
        {currentProposalState !== "Active" && (
          <Box
            color="white"
            borderRadius="8px"
            display="flex"
            // bg="#D9D9D9"
            flexDirection="column"
            border="1px solid #727DA133"
            overflowX="hidden"
          >
            <TableContainer
              color="white"
              borderRadius="md"
              display="flex"
              justifyContent="flex-start"
              alignItems="flex-start"
              overflowY="scroll"
              height="500px"
              bg="#151621"
              // paddingX={"2rem"}
            >
              <Table variant="unstyled" mb="0.5rem">
                <Thead width={"100%"} height={"3rem"}>
                  <Tr
                    width={"100%"}
                    onClick={() => {
                      // setmobileDropdownSelected(true);
                    }}
                  >
                    {columnItems.map((val: any, idx1: any) => (
                      <Td
                        key={idx1}
                        width={"14%"}
                        fontSize={"12px"}
                        fontWeight={400}
                        pb={0}
                        px={idx1 === 0 ? "1.2rem" : "2rem"}
                        // px="2rem"
                        bg="#0B0C14"
                      >
                        <Text
                          whiteSpace="nowrap"
                          overflowWrap="break-word"
                          width={"100%"}
                          height={"2rem"}
                          fontSize="14px"
                          textAlign={
                            idx1 == 0
                              ? "left"
                              : idx1 == columnItems?.length - 1
                              ? "right"
                              : "center"
                          }
                          // pl={idx1 == 0 ? 2 : idx1 == 1 ? '55%' : '32%'}
                          pr={idx1 == columnItems.length - 1 ? "30%" : 0}
                          color={"#727DA1"}
                          cursor="context-menu"
                        >
                          <Tooltip
                            hasArrow
                            label={""}
                            placement={
                              (idx1 === 0 && "bottom-start") ||
                              (idx1 === columnItems.length - 1 &&
                                "bottom-end") ||
                              "bottom"
                            }
                            rounded="md"
                            boxShadow="dark-lg"
                            bg="#02010F"
                            fontSize={"13px"}
                            fontWeight={"400"}
                            borderRadius={"lg"}
                            padding={"2"}
                            color="#F0F0F5"
                            border="1px solid"
                            borderColor="#23233D"
                            arrowShadowColor="#2B2F35"
                          >
                            {val}
                          </Tooltip>
                        </Text>
                      </Td>
                    ))}
                  </Tr>
                </Thead>

                <Tbody position="relative" overflowX="hidden" p="0">
                  {proposalMembers.map((member: any, idx: any) => {
                    return (
                      <>
                        <Tr
                          // key={lower_bound + strategy.idx}
                          key={idx}
                          width={"100%"}
                          // position="relative"
                          p={0}
                          cursor="pointer"
                          bg={"#151621"}
                          // bg={
                          //   degenId && lower_bound + idx === 0
                          //     ? 'linear-gradient(90deg, #34345600 0%, #34345688 50%, #34345600 100%, #34345600 100%)'
                          //     : ''
                          // }
                          // border={
                          //   degenId && lower_bound + idx === 0
                          //     ? '1px solid #4c59e8'
                          //     : ''
                          // }
                        >
                          <Td
                            width={"12.5%"}
                            fontSize={"14px"}
                            fontWeight={400}
                            padding={2}
                            pl="1rem"
                            textAlign="center"
                          >
                            <HStack
                              height="3rem"
                              width="3rem"
                              alignItems="center"
                              justifyContent="flex-start"
                              textAlign="center"
                            >
                              <Box
                                display="flex"
                                justifyContent="center"
                                width="100%"
                              >
                                <Image
                                  src="/APY_favicon.png"
                                  alt=""
                                  height="24"
                                  width="24"
                                  style={{ borderRadius: "24px" }}
                                />
                              </Box>
                              <Text
                                fontSize="14px"
                                fontWeight="400"
                                color={"#C9D3EE"}
                              >
                                {member?.id}
                              </Text>
                            </HStack>
                          </Td>

                          <Td
                            width={"12.5%"}
                            fontSize={"14px"}
                            fontWeight={400}
                            overflow={"hidden"}
                            textAlign={"center"}
                          >
                            <Box
                              width="100%"
                              // pl="20%"
                              height="100%"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              fontWeight="400"
                              textAlign="center"
                            >
                              <Text
                                fontSize="14px"
                                fontWeight="400"
                                color={"#C9D3EE"}
                              >
                                {member.actionPerformed}
                              </Text>
                            </Box>
                          </Td>
                          <Td
                            width={"12.5%"}
                            maxWidth={"5rem"}
                            fontSize={"14px"}
                            fontWeight={400}
                            textAlign={"center"}
                          >
                            <Text
                              fontSize="14px"
                              fontWeight="400"
                              color={"#C9D3EE"}
                            >
                              {member.votes}
                            </Text>
                          </Td>
                        </Tr>

                        <Tr
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "1px",
                            borderBottom: "1px solid #34345699",
                            display: `${
                              idx == proposalMembers.length - 1
                                ? "none"
                                : "block"
                            }`,
                          }}
                        />
                      </>
                    );
                  })}
                  {/* {(() => {
                    const rows = []
                    for (
                      let i: number = 0;
                      i < 6 - (upper_bound - lower_bound + 1);
                      i++
                    ) {
                      rows.push(<Tr height="5.15rem" bgColor="red"></Tr>)
                    }
                    return rows
                  })()} */}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        )}
        {currentProposalState === "Active" && (
          <Box
            display="flex"
            flexDirection="column"
            gap="1rem"
            border="1px solid #727DA133"
            bg="#151621"
            padding="16px"
            borderRadius="6px"
            width="300px"
          >
            <Text color="#C9D3EE" fontWeight="700">
              Cast your vote
            </Text>
            <Box
              mt="0.5rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="#C9D3EE"
              border={
                currentVoteCasting === "For"
                  ? "1px solid white"
                  : "1px solid #727DA133"
              }
              borderRadius="6px"
              padding="8px"
              cursor="pointer"
              onClick={() => {
                setcurrentVoteCasting("For");
              }}
            >
              <Box>
                <Text>For</Text>
              </Box>
            </Box>
            <Box
              mt="0.5rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="#C9D3EE"
              border={
                currentVoteCasting === "Against"
                  ? "1px solid white"
                  : "1px solid #727DA133"
              }
              borderRadius="6px"
              padding="8px"
              cursor="pointer"
              onClick={() => {
                setcurrentVoteCasting("Against");
              }}
            >
              <Box>
                <Text>Against</Text>
              </Box>
            </Box>
            <Box
              mt="0.5rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="#C9D3EE"
              border={
                currentVoteCasting === "Abstain"
                  ? "1px solid white"
                  : "1px solid #727DA133"
              }
              borderRadius="6px"
              padding="8px"
              cursor="pointer"
              onClick={() => {
                setcurrentVoteCasting("Abstain");
              }}
            >
              <Box>
                <Text>Abstain</Text>
              </Box>
            </Box>
            {currentVoteCasting !== "" ? (
              address ? (
                <CastVoteModal
                  voteChoice={currentVoteCasting}
                  tokenAddress="0xDbf641F3a981D6Ea74F079C4B989098588De3326"
                  buttonText="Cast Vote"
                  mt="0.5rem"
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
                ></CastVoteModal>
              ) : (
                <ConnectWallet
                  buttonText="Cast Vote"
                  mt="0.5rem"
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
              )
            ) : (
              <Button
                mt="0.5rem"
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
                isDisabled={currentVoteCasting === ""}
              >
                Cast Vote
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProposalDashboard;
