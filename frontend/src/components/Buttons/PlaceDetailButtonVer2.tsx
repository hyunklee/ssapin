import React from "react";
import styled from "@emotion/styled";
import { pixelToRem } from "../../utils/functions/util";
import { ReactComponent as PinIcon } from "../../assets/svgs/pin-ver2.svg";
import { IButtonProps } from "../../utils/interfaces/buttons.interface";

const StyledPlaceDetail = styled.div`
  width: ${pixelToRem(240)};
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > div {
    position: relative;
  }
`;

const BubbleButton = styled.button`
  position: relative;
  z-index: 0;
  width: 100%;
  height: 45px;
  border-radius: ${pixelToRem(15)};
  font-size: ${(props) => props.theme.fontSizes.paragraph};
  font-family: ${(props) => props.theme.fontFamily.paragraphbold};
  line-height: 1.13;
  letter-spacing: -0.8px;
  text-align: center;
  color: ${(props) => props.theme.colors.mainNavy};
  background-color: ${(props) => props.theme.colors.gray0};
  box-shadow: 0 ${pixelToRem(4)} ${pixelToRem(4)} 0 rgba(0, 0, 0, 0.25);
`;
const SpeechPolygon = styled.div`
  content: "";
  width: 0;
  height: 0;
  border: 15px solid transparent;
  border-top-color: ${(props) => props.theme.colors.gray0};
  border-bottom: 0;
  box-shadow: 0 ${pixelToRem(4)} ${pixelToRem(4)} 0 rgba(0, 0, 0, 0.25) inset;
  margin-bottom: 8px;
`;

const UserEmoji = styled.div<{ size?: number }>`
  position: absolute;
  z-index: 1;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  text-align: center;
  padding-top: ${(props) => `${props.size * 0.35}px`};
  font-size: ${(props) => `${props.size * 0.7}px`};
`;

export default function UpperIconPlaceDetailButton({
  type,
  text,
  func,
  emoji,
}: IButtonProps) {
  return (
    <StyledPlaceDetail>
      <UserEmoji size={45}>
        <a href="https://www.naver.com/">{emoji}</a>
      </UserEmoji>

      <BubbleButton onClick={func}>{text}</BubbleButton>
      <SpeechPolygon />
      <PinIcon />
    </StyledPlaceDetail>
  );
}
