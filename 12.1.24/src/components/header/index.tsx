import React from 'react'
import './header.css'
import LogoImg from '../../assets/images/mettlerTitle.png'
const Header = () => {
  return (
    <div className="row mHeader d-flex justify-content-center align-items-center w-100">
        <img src={LogoImg} alt="Logo" className='img-fluid' style={{ width:'200px', height: '25px' }} />
    </div>
  )
}

export default Header


// import React from 'react';
// import { Container, Navbar } from 'react-bootstrap';
// import './header.css'
// import LogoImg from '../../assets/images/mettlerTitle.png'
// const Header = () => {
//   const navbarStyle = {
//     backgroundColor: ' #0f3995', // Change this to your desired color code
//   };

// return (
//   <>
//     <Navbar  expand="xs" variant="dark" style={navbarStyle}>
//       <Container fluid className="d-flex justify-content-center">
//         <Navbar.Brand>
//           <img src={LogoImg} alt="Logo" className="img-fluid" />
//         </Navbar.Brand>
//       </Container>
//     </Navbar>
//   </>
// );
// };

// export default Header;