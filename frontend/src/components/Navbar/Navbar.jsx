// export default Navbars;
import React from "react";

import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router";
import "./Navbar.css";
// import ToggleMode from "./ToggleMode";
import { FaBars } from "react-icons/fa";
import { useColorMode, Button } from "@chakra-ui/react";
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import GroupChatModal from "../modal/GroupChatModal";
import { AddIcon } from "@chakra-ui/icons";
import { ChatState } from "./../../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
function Navbars() {
  const history = useHistory();
  const { colorMode, toggleColorMode } = useColorMode("dark");
  const { user } = ChatState();
  function logout() {
    localStorage.clear();
    window.location.reload();
  }
  function handle1() {}
  function handle3() {}

  function handle4() {}
  return (
    // <div>
    <div className="topx">
      {/* bg="dark bg-transparent" */}
      <Navbar collapseOnSelect bg="bg-transparent" expand="lg" className="navbarhome" /* variant="dark"*/>
        {/* <Container> */}

        <Navbar.Brand href="#" className="logo_title_comb">
          <Link to="/main" className="logo_title" style={{ marginLeft: "40px" }}>
            <Box shadow="dark-lg" p="1"  ml="10" mt="-8">
              <span className="brand logo title_new">FUMBLE</span>
            </Box>
          </Link>
        </Navbar.Brand>

        {/* "navbarScroll" */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <FaBars size={30} style={{ color: "white" }} />
        </Navbar.Toggle>

        {/* id ="click" "navbarScroll" */}
        <Navbar.Collapse id="responsive-navbar-nav" className="xyz" style={{ marginRight: "30px" }}>
          <Nav className="me-auto  nav_list_outer" navbarScroll>
            <Nav.Link onClick={handle4} className="nav_list_optionsx ax1" data-after="About Us">
              <span onClick={toggleColorMode} className="nav_list_links ax">
                {colorMode === "light" ? <FaMoon size={30} /> : <FaSun size={30} />}
              </span>
            </Nav.Link>
            <Nav.Link onClick={handle1} className="nav_list_options ax1" data-after="About Us">
              <span className="nav_list_links ax">About us</span>
            </Nav.Link>
            <Nav.Link onClick={handle3} className="nav_list_options ax2" data-after="Contact">
              <span className="nav_list_links ax">Contact</span>
            </Nav.Link>
            {"expert" == "expert" ? (
              <GroupChatModal>
                <Button d="flex" fontSize={{ base: "15px", md: "10px", lg: "17px" }} rightIcon={<AddIcon />}>
                  New Forum
                </Button>
              </GroupChatModal>
            ) : (
              <></>
            )}
            <Nav.Link className="nav_list_options ax5" data-after="Logout">
              <span onClick={logout} className="nav_list_links ax">
                Logout
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Navbars;
