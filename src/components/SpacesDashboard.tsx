import { Box, Button, SimpleGrid ,Text} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAccount, useSignMessage, useSignTypedData } from "wagmi";

const SpacesDashboard = () => {
  const [spaces, setSpaces] = useState([
    { name: "Avnu", members: 70,id:'Avnu.eth',avatarImage:''},
    { name: "Avnu", members: 70,id:'Avnu.eth',avatarImage:'' },
    { name: "Avnu", members: 70,id:'Avnu.eth',avatarImage:''},
    { name: "Avnu", members: 70,id:'Avnu.eth' ,avatarImage:''},
    { name: "Avnu", members: 70,id:'Avnu.eth',avatarImage:''},
  ]); // Example array of 20 items
  const {signTypedData,data}=useSignTypedData()
  const router = useRouter();
  const {address}=useAccount()
  const [userDetails, setuserDetails] = useState<any>()

  return (
    <Box display="flex" width="100%" padding="2rem" pt="5rem">
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
            {/* <BackIcon /> */}
          </Box>
          <Box
            color="#C9D3EE"
            fontSize="18px"
            onClick={() => {
              router.push(`/protocol/${router.query.id}`);
            }}
          >
            All Protocols
          </Box>
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
          Joined Spaces
        </Box>
      </Box>
      <Box width="70%" padding="1rem" ml="18rem">
        <SimpleGrid columns={4} spacingX={2} spacingY={5}>
          {/* Reduced horizontal spacing with spacingX */}
          {spaces.map((space, index) => (
            <Box
              key={index}
              cursor="pointer"
              bg="#151621"
              padding="1rem"
              height="220px"
              width="90%" // Reduced width for closer columns
              gap="0.5rem"
              borderRadius="8px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              boxShadow="md"
              onClick={() => {
                router.push(`/protocol/${space.id}`);
              }}
            >
              <Box>
                <Image
                  src={"/base.jpg"}
                  alt=""
                  height="44"
                  width="44"
                  style={{ cursor: "pointer", borderRadius: "40px" }}
                />
              </Box>
              <Box fontSize="18px" color="#C9D3EE">
                {space.name}
              </Box>
              <Box color="#C9D3EE">{space.members} members</Box>
              {address &&<Button
                width="80%"
                padding="1.2rem"
                bg="black"
                color="#3FE0B2"
                height={"2rem"}
                fontSize={"14px"}
                lineHeight="14px"
                border="1px solid #3FE0B2"
                _hover={{ bg: "#3FE0B2", color: "black" }}
                borderRadius={"6px"}
                onClick={(event) => {
                  event.stopPropagation(); // Prevents the Box's onClick from being triggered
                  signTypedData({
                    types: {
                      Person: [
                        { name: 'name', type: 'string' },
                        { name: 'wallet', type: 'address' },
                      ],
                      Mail: [
                        { name: 'from', type: 'Person' },
                        { name: 'to', type: 'Person' },
                        { name: 'contents', type: 'string' },
                      ],
                    },
                    primaryType: 'Mail',
                    message: {
                      from: {
                        name: 'Cow',
                        wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                      },
                      to: {
                        name: 'Bob',
                        wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                      },
                      contents: 'Hello, Bob!',
                    },
                  })
                }}
              >
                Join
              </Button>}
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default SpacesDashboard;
