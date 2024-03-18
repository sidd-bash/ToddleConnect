import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ChatSquareTextFill, Hash, Eye, PieChart, Gear } from 'react-bootstrap-icons';
import { RiFlag2Line } from "react-icons/ri";

export default function NavBar() {
 const navigate = useNavigate();
 return (
    <Navbar expand="lg" className="bg-light pt-5 d-flex flex-column align-items-center">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto d-flex flex-column align-items-center">
            <Nav.Link onClick={() => navigate('/main')} className="d-flex flex-column align-items-center">
              <ChatSquareTextFill />
              Chats
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/channels')} className="d-flex flex-column align-items-center">
              <Hash className='fs-4' />
              Channels
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/flagged')} className="d-flex flex-column align-items-center">
              <RiFlag2Line />
              Flagged
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/overview')} className="d-flex flex-column align-items-center">
              <Eye />
              Overview
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/analytics')} className="d-flex flex-column align-items-center">
              <PieChart />
              Analytics
            </Nav.Link>
            <Nav.Link onClick={() => navigate('/settings')} className="d-flex flex-column align-items-center">
              <Gear />
              Settings
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 );
}
