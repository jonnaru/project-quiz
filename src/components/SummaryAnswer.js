import React from "react";
import Lottie from "react-lottie";
import styled from "styled-components";

const SummaryParagraph = styled.p`
  text-align: center;
  font-size: 36px;
  width: 80%;
`;

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export const SummaryAnswer = ({ lottie, text }) => {
  return (
    <>
      <Lottie
        options={(defaultOptions, { animationData: lottie })}
        height={375}
        width={375}
      />
      <SummaryParagraph>{text}</SummaryParagraph>
    </>
  );
};
