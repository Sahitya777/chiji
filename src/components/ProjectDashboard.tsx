import BackIcon from "@/assets/icons/BackIcon";
import numberFormatterPercentage from "@/constants/numberFormatterPercentage";
import {
  Box,
  Button,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useSignTypedData } from "wagmi";
import ProposalModal from "./modals/ProposalModal";

const ProjectDashboard = () => {
  const router = useRouter();
  const { signTypedData, data } = useSignTypedData();
  const [proposals, setProposals] = useState([
    {
      protocol: "strkfarm",
      creator: "Sahi",
      title:
        "[ARFC] Onboard sUSDe, USDe and weETH to Aave v3 on zkSync [ARFC] Onboard sUSDe, USDe and weETH to Aave v3 on zkSync",
      description:
        "This proposal aims to onboard sUSDe, USDe, and weETH to the Aave v3 protocol on zkSync. This follows the original plans for further expansion on the network.",
      status: "active",
      timeline: "4 hour left",
      token: "DAI",
      yesvotes: 0,
      novotes: 0,
      abstainvotes: 0,
    },
    {
      protocol: "strkfarm",
      creator: "Sahi",
      title:
        "[ARFC] Onboard sUSDe, USDe and weETH to Aave v3 on zkSync [ARFC] Onboard sUSDe, USDe and weETH to Aave v3 on zkSync",
      description:
        "This proposal aims to onboard sUSDe, USDe, and weETH to the Aave v3 protocol on zkSync. This follows the original plans for further expansion on the network.",
      status: "active",
      token: "STRK",
      timeline: "4 hour left",
      yesvotes: 0,
      novotes: 0,
      abstainvotes: 0,
    },
    {
      protocol: "strkfarm",
      creator: "Sahi",
      title:
        "[ARFC] Onboard sUSDe, USDe and weETH to Aave v3 on zkSync [ARFC] Onboard sUSDe, USDe and weETH to Aave v3 on zkSync",
      description:
        "This proposal aims to onboard sUSDe, USDe, and weETH to the Aave v3 protocol on zkSync. This follows the original plans for further expansion on the network.",
      status: "closed",
      token: "USDC",
      timeline: "4 hour left",
      yesvotes: 300,
      novotes: 20,
      abstainvotes: 2,
    },
  ]);
  const [protocolStatus, setprotocolStatus] = useState("overview");
  const columnItems = ["Member", "User Status", "Profile", "Explorer"];
  const [protocolMembers, setprotocolMembers] = useState([
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "admin",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "admin",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
    },
    {
      id: "sahi",
      avatar: "",
      profileLink: "as",
      explorerLink: "ss",
      statusValue: "author",
    },
  ]);
  return (
    <Box display="flex" padding="2rem 3rem" gap="2rem" pt="6rem">
      <Box
        width="250px"
        display="flex"
        flexDirection="column"
        gap="1rem"
        bg="#151621"
        padding="16px 32px"
        borderRadius="6px"
        height="81vh"
      >
        <Box
          display="flex"
          gap="0.2rem"
          cursor="pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <Box display="flex" alignItems="center" justifyContent="center">
            <BackIcon />
          </Box>
          <Box color="#C9D3EE" fontSize="18px">
            All Projects
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
            setprotocolStatus("overview");
          }}
          cursor="pointer"
          bg={protocolStatus === "overview" ? "#303646" : ""}
          padding="8px"
          borderRadius="6px"
        >
          Overview
        </Box>
        <Box
          color="#C9D3EE"
          onClick={() => {
            setprotocolStatus("members");
          }}
          bg={protocolStatus === "members" ? "#303646" : ""}
          padding="8px"
          borderRadius="6px"
          cursor="pointer"
        >
          Members
        </Box>
        <ProposalModal
          buttonText="Create Proposal"
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
          mt="0.5rem"
        />
      </Box>

      {/* Center box with proposals */}
      <Box width="60%" display="flex" flexDirection="column" gap="2rem">
        <Box>
          <Text fontSize="24px" color="#C9D3EE">
            {protocolStatus === "overview" ? "Proposals" : "Members"}
          </Text>
        </Box>

        {/* Scrollable section */}
        {protocolStatus === "overview" && (
          <Box
            display="flex"
            flexDirection="column"
            gap="2rem"
            height="500px" // Set a fixed height
            overflowY="scroll" // Make the box scrollable
          >
            {proposals.map((proposal, index) => (
              <Box
                key={index}
                display="flex"
                bg="#151621"
                flexDirection="column"
                gap="0.5rem"
                border="1px solid #727DA133"
                padding="1rem 2rem"
                borderRadius="6px"
              >
                <Box display="flex" justifyContent="space-between">
                  <Box
                    display="flex"
                    gap="0.5rem"
                    alignItems="center"
                    cursor="pointer"
                  >
                    <Image
                      src="/APY_favicon.png"
                      alt=""
                      height="24"
                      width="24"
                      style={{ borderRadius: "24px" }}
                    />
                    <Text color="#C9D3EE" fontWeight="600" fontSize="18px">
                      {proposal.creator}
                    </Text>
                  </Box>
                  <Box
                    border={
                      proposal.status === "active"
                        ? "1px solid green"
                        : "1px solid red"
                    }
                    padding="4px 8px"
                    bg={proposal.status === "active" ? "green" : "red"}
                    color="white"
                    borderRadius="16px"
                  >
                    {proposal.status}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  mt="0.5rem"
                  cursor="pointer"
                  onClick={() => {
                    router.push(`/protocol/${router.query.id}/proposal/id`);
                  }}
                >
                  <Text color="#C9D3EE" width="80%" fontWeight="500">
                    {proposal.title}
                  </Text>
                </Box>
                <Box
                  display="flex"
                  color="#C9D3EE"
                  width="100%"
                  mt="0.4rem"
                  cursor="pointer"
                  onClick={() => {
                    router.replace(`/protocol/${router.query.id}/proposal/id`);
                  }}
                >
                  <Text>{proposal.description}</Text>
                </Box>
                {proposal.status !== "active" && (
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="0.5rem"
                    color="#C9D3EE"
                    width="100%"
                    mt="0.4rem"
                    cursor="pointer"
                    onClick={() => {
                      router.replace(
                        `/protocol/${router.query.id}/proposal/id`
                      );
                    }}
                  >
                    <Box display="flex" justifyContent="space-between">
                      <Text>
                        {" "}
                        YES -&gt; {proposal.yesvotes} {proposal.token}
                      </Text>
                      <Text>
                        {numberFormatterPercentage(
                          (proposal.yesvotes /
                            (proposal.yesvotes +
                              proposal.novotes +
                              proposal.abstainvotes)) *
                            100
                        )}
                        %
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text>
                        {" "}
                        NO -&gt; {proposal.novotes} {proposal.token}
                      </Text>
                      <Text>
                        {numberFormatterPercentage(
                          (proposal.novotes /
                            (proposal.yesvotes +
                              proposal.novotes +
                              proposal.abstainvotes)) *
                            100
                        )}
                        %
                      </Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Text>
                        {" "}
                        ABSTAIN -&gt; {proposal.abstainvotes} {proposal.token}
                      </Text>
                      <Text>
                        {numberFormatterPercentage(
                          (proposal.abstainvotes /
                            (proposal.yesvotes +
                              proposal.novotes +
                              proposal.abstainvotes)) *
                            100
                        )}
                        %
                      </Text>
                    </Box>
                  </Box>
                )}
                <Box display="flex" mt="0.5rem">
                  <Text color="#646E87">{proposal.timeline}</Text>
                </Box>
              </Box>
            ))}
          </Box>
        )}
        {protocolStatus === "members" && (
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
                          whiteSpace="pre-wrap"
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
                  {protocolMembers.map((member: any, idx: any) => {
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
                                {member.statusValue}
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
                              {member.profileLink}
                            </Text>
                          </Td>
                          <Td
                            width={"12.5%"}
                            maxWidth={"3rem"}
                            fontSize={"14px"}
                            fontWeight={400}
                            overflow={"hidden"}
                            textAlign={"center"}
                          >
                            <Text
                              fontSize="14px"
                              fontWeight="400"
                              color={"#C9D3EE"}
                            >
                              {member?.explorerLink}
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
                              idx == protocolMembers.length - 1
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
      </Box>

      {/* Fixed right-side box */}
      <Box display="flex" flexDirection="column" gap="2rem" width="200px">
        <Box>
          <Text fontSize="24px" color="#C9D3EE">
            Project Overview
          </Text>
        </Box>
        <Box
          display="flex"
          bg="#151621"
          flexDirection="column"
          gap="0.5rem"
          border="1px solid #727DA133"
          padding="1rem 2rem"
          borderRadius="6px"
        >
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" gap="0.5rem" alignItems="center">
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
          </Box>
          <Box color={"#C9D3EE"}>100k members</Box>
          <Box color={"#C9D3EE"}>About section</Box>
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
            mt="0.5rem"
          >
            Join
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDashboard;
