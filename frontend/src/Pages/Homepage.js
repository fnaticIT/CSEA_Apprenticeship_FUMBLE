import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.replace("/main");
  }, [history]);

  return (
    <Container maxW="100%" centerContent bg="black">
      <Box bg="white" w="55%" p={8} borderRadius="lg" borderWidth="1px" opacity="0.9" borderColor="black" background="linear-gradient(90deg, rgba(30, 177, 196, 1) 0%, rgba(0, 1, 22, 1) 0%, rgba(48, 52, 176, 1) 54%, rgba(143, 146, 196, 1) 100%)" color="white" alignContent="center" position="absolute" top="10%" display="flex" minHeight="60%">
        <Box d="flex" alignContent="center" top="50%" justifyContent="center" p={2} w="100%" mt="20%" color="cyan" fontWeight="400" flex="1" display={{ md: "block", sm: "none" }} >
          <Text fontSize="5xl" fontFamily="Work sans" fontWeight="bold">
            FUMBLE
          </Text>
        </Box>
        <Tabs isFitted variant="soft-rounded" flex="1.5" padding={10}>
          <TabList mb="1em">
            <Tab>
              <Text color="black">Login</Text>
            </Tab>
            <Tab>
              <Text color="black">Sign Up</Text>
            </Tab>
          </TabList>
          <TabPanels padding={6}>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
