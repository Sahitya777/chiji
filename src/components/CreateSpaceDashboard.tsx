import { Box, Button, Input, Switch, Text, Tooltip } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSignTypedData } from "wagmi";
import StrategyDashboard from "./modals/StrategyModal";
import axios from "axios";
import { governorTokenContractAddress } from "@/constants/base-constants";
import InfoIconBig from "@/assets/icons/InfoIcon";
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
  const [paramsFilled, setparamsFilled] = useState(false)
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

  useEffect(()=>{
    if(authorAddresses.length>0 && adminAddresses.length>0 && spaceName!=='' &&about!=='' &&tokenSymbol!=='' &&tokenAddress!=='' &&governanceContractAddress!==''){
      setparamsFilled(true)
    }else{
      setparamsFilled(false)
    }

  },[authorAddresses,adminAddresses,spaceName,about,tokenSymbol,avatar,tokenAddress,governanceContractAddress])

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
                <Tooltip
                  hasArrow
                  arrowShadowColor="#2B2F35"
                  placement="right"
                  boxShadow="dark-lg"
                  label="Enter a unique and descriptive name for your space. This will be the primary identifier for your DAO or community."
                  bg="#02010F"
                  fontSize={"13px"}
                  fontWeight={"400"}
                  borderRadius={"lg"}
                  padding={"2"}
                  color="#F0F0F5"
                  border="1px solid"
                  borderColor="#23233D"
                >
                  <Box>
                    <InfoIconBig />
                  </Box>
                </Tooltip>
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
                <Tooltip
                  hasArrow
                  arrowShadowColor="#2B2F35"
                  placement="right"
                  boxShadow="dark-lg"
                  label="Provide a brief description of your space's purpose, goals, and community guidelines. This helps members understand what your space is about."
                  bg="#02010F"
                  fontSize={"13px"}
                  fontWeight={"400"}
                  borderRadius={"lg"}
                  padding={"2"}
                  color="#F0F0F5"
                  border="1px solid"
                  borderColor="#23233D"
                >
                  <Box>
                    <InfoIconBig />
                  </Box>
                </Tooltip>
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
              {/* <Box
                display="flex"
                alignItems="center"
                gap="0.5rem"
                border="1px solid #727DA133"
                borderRadius="16px"
                padding="8px 16px"
              >
                <Text>Avatar</Text>
                <Tooltip
                  hasArrow
                  arrowShadowColor="#2B2F35"
                  placement="right"
                  boxShadow="dark-lg"
                  label="Upload a profile picture or logo that represents your space. Recommended size: 400x400 pixels."
                  bg="#02010F"
                  fontSize={"13px"}
                  fontWeight={"400"}
                  borderRadius={"lg"}
                  padding={"2"}
                  color="#F0F0F5"
                  border="1px solid"
                  borderColor="#23233D"
                >
                  <Box>
                    <InfoIconBig />
                  </Box>
                </Tooltip>
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
              </Box> */}
              <Box
                display="flex"
                alignItems="center"
                gap="0.5rem"
                border="1px solid #727DA133"
                borderRadius="16px"
                padding="8px 16px"
              >
                <Text>Symbol</Text>
                <Tooltip
                  hasArrow
                  arrowShadowColor="#2B2F35"
                  placement="right"
                  boxShadow="dark-lg"
                  label="Enter the token symbol associated with your space's governance token (e.g., 'ETH' for Ethereum)."
                  bg="#02010F"
                  fontSize={"13px"}
                  fontWeight={"400"}
                  borderRadius={"lg"}
                  padding={"2"}
                  color="#F0F0F5"
                  border="1px solid"
                  borderColor="#23233D"
                >
                  <Box>
                    <InfoIconBig />
                  </Box>
                </Tooltip>
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
                <Tooltip
                  hasArrow
                  arrowShadowColor="#2B2F35"
                  placement="right"
                  boxShadow="dark-lg"
                  label="Enter the smart contract address of your governance token. This token will be used for voting and proposal creation."
                  bg="#02010F"
                  fontSize={"13px"}
                  fontWeight={"400"}
                  borderRadius={"lg"}
                  padding={"2"}
                  color="#F0F0F5"
                  border="1px solid"
                  borderColor="#23233D"
                >
                  <Box>
                    <InfoIconBig />
                  </Box>
                </Tooltip>
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
                <Tooltip
                  hasArrow
                  arrowShadowColor="#2B2F35"
                  placement="right"
                  boxShadow="dark-lg"
                  label="Enter the address of your governance contract that manages proposals and voting mechanisms for your space."
                  bg="#02010F"
                  fontSize={"13px"}
                  fontWeight={"400"}
                  borderRadius={"lg"}
                  padding={"2"}
                  color="#F0F0F5"
                  border="1px solid"
                  borderColor="#23233D"
                >
                  <Box>
                    <InfoIconBig />
                  </Box>
                </Tooltip>
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
                <Tooltip
                  hasArrow
                  arrowShadowColor="#2B2F35"
                  placement="right"
                  boxShadow="dark-lg"
                  label="Add your space's Twitter handle to help members stay updated with announcements and community discussions."
                  bg="#02010F"
                  fontSize={"13px"}
                  fontWeight={"400"}
                  borderRadius={"lg"}
                  padding={"2"}
                  color="#F0F0F5"
                  border="1px solid"
                  borderColor="#23233D"
                >
                  <Box>
                    <InfoIconBig />
                  </Box>
                </Tooltip>
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
                <Tooltip
                  hasArrow
                  arrowShadowColor="#2B2F35"
                  placement="right"
                  boxShadow="dark-lg"
                  label="Add your Discord server invite link to facilitate community discussions and engagement."
                  bg="#02010F"
                  fontSize={"13px"}
                  fontWeight={"400"}
                  borderRadius={"lg"}
                  padding={"2"}
                  color="#F0F0F5"
                  border="1px solid"
                  borderColor="#23233D"
                >
                  <Box>
                    <InfoIconBig />
                  </Box>
                </Tooltip>
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
                <Tooltip
                  hasArrow
                  arrowShadowColor="#2B2F35"
                  placement="right"
                  boxShadow="dark-lg"
                 label="Add a link to your space's terms of service or community guidelines document."
                  bg="#02010F"
                  fontSize={"13px"}
                  fontWeight={"400"}
                  borderRadius={"lg"}
                  padding={"2"}
                  color="#F0F0F5"
                  border="1px solid"
                  borderColor="#23233D"
                >
                  <Box>
                    <InfoIconBig />
                  </Box>
                </Tooltip>
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
            <Box display="flex" alignItems='center' gap="0.4rem">
              <Text fontSize="24px">Admins*</Text>
              <Tooltip
                  hasArrow
                  arrowShadowColor="#2B2F35"
                  placement="right"
                  boxShadow="dark-lg"
                  label="Add wallet addresses of administrators who will have special permissions to manage the space and its governance settings."
                  bg="#02010F"
                  fontSize={"13px"}
                  fontWeight={"400"}
                  borderRadius={"lg"}
                  padding={"2"}
                  color="#F0F0F5"
                  border="1px solid"
                  borderColor="#23233D"
                >
                  <Box>
                    <InfoIconBig />
                  </Box>
                </Tooltip>
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
            <Box display="flex" alignItems="center" gap="0.4rem">
              <Text fontSize="24px">Authors*</Text>
              <Tooltip
                  hasArrow
                  arrowShadowColor="#2B2F35"
                  placement="right"
                  boxShadow="dark-lg"
                  label="Add wallet addresses of members who can create and submit proposals in your space."
                  bg="#02010F"
                  fontSize={"13px"}
                  fontWeight={"400"}
                  borderRadius={"lg"}
                  padding={"2"}
                  color="#F0F0F5"
                  border="1px solid"
                  borderColor="#23233D"
                >
                  <Box>
                    <InfoIconBig />
                  </Box>
                </Tooltip>
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
                <Tooltip
                  hasArrow
                  arrowShadowColor="#2B2F35"
                  placement="right"
                  boxShadow="dark-lg"
                  label="Set the minimum token balance required for a member to participate in voting on proposals."
                  bg="#02010F"
                  fontSize="13px"
                  fontWeight="400"
                  borderRadius="lg"
                  padding="2"
                  color="#F0F0F5"
                  border="1px solid"
                  borderColor="#23233D"
                >
                  <Box>
                    <InfoIconBig />
                  </Box>
                </Tooltip>
                <Input
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
          isDisabled={!paramsFilled}
          onClick={() => {
            // handleSpace();
          }}
        >
          Register Space
        </Button>
      </Box>
    </Box>
  );
};

export default CreateSpaceDashboard;
