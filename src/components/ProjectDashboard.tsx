import numberFormatterPercentage from "@/constants/numberFormatterPercentage";
import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ProjectDashboard = () => {
    const router=useRouter()
    console.log(router.query.id,'query')
  const [proposals, setproposals] = useState([
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
  return (
    <Box display="flex" padding="2rem 4rem" gap="4rem">
      <Box>Work</Box>
      <Box width="60%" display="flex" flexDirection="column" gap="2rem">
        <Box>
          <Text fontSize="24px" color="#C9D3EE">
            Proposals
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" gap="2rem">
          {proposals.map((proposal, index) => (
            <Box
              //   width="70%"
              display="flex"
              bg="#151621"
              flexDirection="column"
              gap="0.5rem"
              border="1px solid #727DA133"
              padding="1rem 2rem"
              borderRadius="6px"
              cursor="pointer"
              onClick={()=>{
                router.replace(`/protocol/${router.query.id}/proposal/id`)
              }}
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
              <Box display="flex" mt="0.5rem">
                <Text color="#C9D3EE" width="80%" fontWeight="500">
                  {proposal.title}
                </Text>
              </Box>
              <Box display="flex" color="#C9D3EE" width="100%" mt="0.4rem">
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
              <Box></Box>
            </Box>
          ))}
        </Box>
      </Box>
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
          <Box>
                ABout section
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDashboard;
