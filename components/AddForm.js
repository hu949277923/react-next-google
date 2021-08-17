import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";

export default function AddForm(props) {
  const { isOpen, onClose, initialValues, onSubmit } = props;
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const { item } = initialValues;
    if (item) {
      setId(item.id);
      setTitle(item.title);
      setLink(item.link);
    } else {
      setTitle("");
      setLink("");
    }
  }, [isOpen]);

  const isReady = useMemo(() => {
    return Boolean(title && link);
  }, [title, link]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialValues.title}</ModalHeader>
        <ModalBody>
          <VStack spacing={2}>
            <FormControl id="web-name">
              <FormLabel>名称</FormLabel>
              <Input
                placeholder="名称"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </FormControl>
            <FormControl id="web-site">
              <FormLabel>网址</FormLabel>
              <Input
                placeholder="网址"
                value={link}
                onChange={({ target }) => setLink(target.value)}
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button size="sm" variant="ghost" onClick={onClose}>
            取消
          </Button>
          <Button
            ml={3}
            onClick={() => {
              if (isReady) {
                onSubmit({
                  id,
                  title,
                  link,
                });
              }
            }}
            size="sm"
          >
            完成
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
