import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

const SpacesDashboard = () => {
  const [spaces, setSpaces] = useState([
    { name: "Avnu", members: 70,id:'Avnu.eth' },
    { name: "Avnu", members: 70,id:'' },
    { name: "Avnu", members: 70,id:'' },
    { name: "Avnu", members: 70,id:'' },
    { name: "Avnu", members: 70,id:'' },
  ]); // Example array of 20 items
  const { signMessage } = useSignMessage();
  const router = useRouter();
  const {address}=useAccount()

  return (
    <Box display="flex" width="100%" padding="2rem">
      <Box width="20%">hello</Box>
      <Box width="70%" padding="1rem">
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
              <Box color="#C9D3EE">{space.members}</Box>
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
                  signMessage({ message: "hello world" });
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
