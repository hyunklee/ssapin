import styled from "@emotion/styled";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/image/ssapin_logo.png";
import CampusButton from "../Buttons/CampusButton";
import { CAMPUS_LIST } from "../../utils/constants/contant";
import { campusState } from "../../store/atom";
import NavToggleContainer from "./NavToggleContainer";
import { LessPC, PC } from "../containers/MediaQueryContainer";

const Container = styled.header`
  background-color: ${(props) => props.theme.colors.mainBlue};
  width: 100vw;
  height: 15vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
`;

const CampusContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;

  ${(props) => props.theme.mq.mobile} {
    width: 100%;
  }
`;

const LogoContainer = styled.h1`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.7rem;

  ${(props) => props.theme.mq.mobile} {
    height: 80%;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 0;
    text-align: center;
    align-items: center;
  }

  .logo {
    height: 100%;
    margin: 0;

    img {
      width: auto;
      height: 100%;
    }

    ${(props) => props.theme.mq.mobile} {
      margin-top: 0.5rem;
      img {
        width: 40%;
        height: auto;
      }
    }
  }

  button {
    height: 35%;
    margin-top: 1.8rem;
    margin-left: 0.5rem;
    background-color: transparent;
    font-family: ${(props) => props.theme.fontFamily.paragraphbold};
    font-size: ${(props) => props.theme.fontSizes.paragraph};
    color: ${(props) => props.theme.colors.subYellow};
    transition: all 0.2s ease-out;

    &:hover {
      scale: 1.05;
      cursor: pointer;
    }
  }
`;

const CampusName = styled.div`
  height: 35%;
  margin-top: 1.8rem;
  margin-left: 0.5rem;
  background-color: transparent;
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  color: ${(props) => props.theme.colors.subYellow};
  transition: all 0.2s ease-out;
  ${(props) => props.theme.mq.mobile} {
    margin-top: 0.5rem;
    margin-left: 0;
  }
`;

function Header() {
  const [campusId, setCampusId] = useRecoilState(campusState);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const changeCampus = (key: number) => {
    setCampusId(key);
  };

  const toggleSide = () => {
    setIsOpen(!isOpen);
  };

  const campus = CAMPUS_LIST;

  const navigate = useNavigate();
  const moveToHome = () => {
    navigate("/");
  };

  if (
    location.pathname.startsWith("/togethermaps") ||
    location.pathname.startsWith("/maps") ||
    location.pathname.startsWith("/places")
  )
    return null;

  return (
    <Container>
      <CampusContainer>
        <LogoContainer>
          <button type="button" onClick={moveToHome} className="logo">
            <img alt="ssapin_logo.png" src={Logo} width="240" height="82" />
          </button>
          <LessPC>
            <CampusName>{campus[campusId]}</CampusName>
          </LessPC>
          <PC>
            {!isOpen && (
              <button type="button" onClick={toggleSide}>
                {campus[campusId]} ▼
              </button>
            )}
            {isOpen && (
              <button type="button" onClick={toggleSide}>
                {campus[campusId]} ▲
              </button>
            )}
          </PC>
        </LogoContainer>
        {isOpen && (
          <CampusButton
            open={toggleSide}
            select={changeCampus}
            campusId={campusId}
          />
        )}
      </CampusContainer>
      <NavToggleContainer />
    </Container>
  );
}
export default Header;
