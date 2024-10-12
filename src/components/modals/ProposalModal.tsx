import React, { useState } from "react";
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

const ProposalModal = ({
  buttonText,
  backGroundOverLay,
  ...restProps
}: any) => {
  const [title, setTitle] = useState(""); // Title state
  const [description, setDescription] = useState<any>(""); // Markdown text state
  const [isPreview, setIsPreview] = useState(false); // Toggle for preview mode
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Toggle Preview mode
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

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
                      <Button colorScheme="blue">
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
