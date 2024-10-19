import { Box, Button, Input, Switch, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSignTypedData } from "wagmi";
import StrategyDashboard from "./modals/StrategyModal";
import axios from "axios";
import { governorTokenContractAddress } from "@/constants/base-constants";
const CreateSpaceDashboard = () => {
  const { signTypedData } = useSignTypedData();
  const [authorAddresses, setAuthorAddresses] = useState<any>([]);
  const [adminAddresses, setadminAddresses] = useState<any>([]);
  const [finalAdminAddresses, setfinalAdminAddresses] = useState<any>([]);
  const [spaceName, setspaceName] = useState<string>("");
  const [about, setabout] = useState<string>("");
  const [tokenSymbol, settokenSymbol] = useState<string>("");
  const [tokenAddress, settokenAddress] = useState<string>("");
  const [avatar, setavatar] = useState<any>("");
  const [updatedAdminData, setupdatedAdminData] = useState<boolean>(false);
  const [optionEditAdminAddresses, setoptionEditAdminAddresses] =
    useState<boolean>(false);
  const [governanceContractAddress, setgovernanceContractAddress] =
    useState("");

  useEffect(() => {
    setfinalAdminAddresses((prevAddresses: any[]) => [
      ...prevAddresses,
      ...adminAddresses,
    ]);
  }, [updatedAdminData]);

  // Handle adding a new author
  const addAuthor = () => {
    setAuthorAddresses([...authorAddresses, ""]);
  };

  const addAdmin = () => {
    setadminAddresses([...adminAddresses, ""]);
  };

  // Handle changing an address for an author
  const handleAddressChange = (index: number, value: string) => {
    const updatedAddresses = [...authorAddresses];
    updatedAddresses[index] = value;
    setAuthorAddresses(updatedAddresses);
  };

  const handleAdminAddressChange = (index: number, value: string) => {
    const updatedAddresses = [...adminAddresses];
    updatedAddresses[index] = value;
    setadminAddresses(updatedAddresses);
  };

  const removeAuthor = (index: any) => {
    const updatedAuthors = authorAddresses.filter(
      (_: any, i: any) => i !== index
    );
    setAuthorAddresses(updatedAuthors);
  };

  const removeAdmin = (index: any) => {
    const updatedAuthors = adminAddresses.filter(
      (_: any, i: any) => i !== index
    );
    setadminAddresses(updatedAuthors);
  };
  // const handleSpace = async () => {
  //   try {
  //     const res = await axios.post(
  //       "https://5e27-106-51-118-108.ngrok-free.app/api/create/space",
  //       {
  //         id:20,
  //         name:spaceName, // space name string
  //         about:about, // about string
  //         symbol:tokenSymbol, // token symbol string
  //         token_address:tokenAddress,
  //         governor_contract_address:governorTokenContractAddress, // token address string
  //         avatar:avatar, // avatar (can be a string or file, depending on how you're handling it)
  //         authors:authorAddresses, // array of author addresses
  //         admins:finalAdminAddresses, // array of admin addresses
  //       }
  //     );
  //     console.log(res?.data, "response data");
  //   } catch (error) {
  //     console.error("Error creating space:", error);
  //   }
  // };
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
            Create a Space
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
              <Text fontSize="24px">Profile</Text>
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
                <Text>Name</Text>
                <Input
                  value={spaceName}
                  onChange={(e) => {
                    setspaceName(e.target.value);
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
                <Text>About</Text>
                <Input
                  value={about}
                  onChange={(e) => {
                    setabout(e.target.value);
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
                <Text>Avatar</Text>
                <Input
                  value={avatar}
                  onChange={(e) => {
                    setavatar(e.target.value);
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
                <Input
                  // hidden={true}
                  type={"file"}
                  placeholder="Choose Avatar"
                  accept="image/*"
                  style={{
                    background: "",
                    marginTop: "0.3rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0.3rem",
                    paddingLeft: "1rem",
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
                <Text>Symbol</Text>
                <Input
                  value={tokenSymbol}
                  onChange={(e) => {
                    settokenSymbol(e.target.value);
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
                <Text whiteSpace="nowrap">Token Address</Text>
                <Input
                  value={tokenAddress}
                  onChange={(e) => {
                    settokenAddress(e.target.value);
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
                <Text whiteSpace="nowrap">Governance Contract Address</Text>
                <Input
                  value={governanceContractAddress}
                  onChange={(e) => {
                    setgovernanceContractAddress(e.target.value);
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
                <Text>Twitter</Text>
                <Input
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
                <Text>Discord</Text>
                <Input
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
                <Text>Terms</Text>
                <Input
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
              <Text fontSize="24px">Admins*</Text>
            </Box>
            {adminAddresses.length > 0 && (
              <Box mt="1rem" display="flex" flexDirection="column" gap="1rem">
                {adminAddresses.map((admin: any, index: number) => (
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
                      value={admin}
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
                      isDisabled={adminAddresses.length === 0}
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
            <Box display="flex" gap="1rem">
              <Button
                mt="1rem"
                onClick={() => {
                  addAdmin();
                }}
              >
                + Add Admins
              </Button>
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
              <Text fontSize="24px">Authors</Text>
            </Box>
            {authorAddresses.length > 0 && (
              <Box mt="1rem" display="flex" flexDirection="column" gap="1rem">
                {authorAddresses.map((author: any, index: number) => (
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
                      value={author}
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
                      isDisabled={authorAddresses.length === 0}
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
              + Add Authors
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
              <Text fontSize="24px">Proposals</Text>
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
                <Text>Validation</Text>
                <Input
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
                <Text whiteSpace="nowrap">Proposal threshold</Text>
                <Input
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
                borderRadius="16px"
                padding="8px 16px"
              >
                <Switch id="email-alerts" />
                <Text>Allow only authors to submit a proposal</Text>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* <Box mt="2rem">
          <Box
            border="1px solid #727DA133"
            borderRadius="6px"
            padding="16px"
            bg="#151621"
            color="#C9D3EE"
          >
            <Box>
              <Text fontSize="24px">Strategies</Text>
            </Box>
            <Box mt="1rem" display="flex" flexDirection="column" gap="1rem">
              <StrategyDashboard
                buttonText="Add Strategies"
                width="100%"
                padding="1.2rem"
                backgroundColor="black"
                color="#3FE0B2"
                height={"2rem"}
                fontSize={"14px"}
                lineHeight="14px"
                border="1px solid #3FE0B2"
                _hover={{ bg: "#3FE0B2", color: "black" }}
                borderRadius={"6px"}
                backGroundOverLay="#FAFAFA33"
              />
            </Box>
          </Box>
        </Box> */}
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
        height="200px"
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
        >
          Reset
        </Button>
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
          onClick={() => {
            // handleSpace();
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default CreateSpaceDashboard;
