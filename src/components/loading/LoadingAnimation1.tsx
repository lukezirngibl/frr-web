import { P } from '../../html'
import React from 'react'
import styled from 'styled-components'
import { useAppTheme } from '../../theme/theme'
import { createStyled, useCSSStyles } from '../../theme/util'

// source: https://tobiasahlin.com/spinkit/

const Animation1Wrapper = createStyled(styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  > div {
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  > div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  > div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  > div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  > div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`)

const Animation1Item = createStyled(styled.div`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.9);
`)

export const LoadingAnimation1 = (props: { label?: string }) => {
  const theme = useAppTheme()
  const getCSSStyles = useCSSStyles(theme, 'loading')({})

  return (
    <>
      <Animation1Wrapper {...getCSSStyles('wrapper')} data-test-id="loading-animation-1">
        <Animation1Item {...getCSSStyles('item')}></Animation1Item>
        <Animation1Item {...getCSSStyles('item')}></Animation1Item>
        <Animation1Item {...getCSSStyles('item')}></Animation1Item>
        <Animation1Item {...getCSSStyles('item')}></Animation1Item>
      </Animation1Wrapper>
      {props.label && <P label={props.label} {...getCSSStyles('label')} />}
    </>
  )
}

const Animation2Wrapper = createStyled(styled.div`
  width: 70px;
  height: 60px;
  text-align: center;
  
  > div {
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }
  
  @-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
    20% { -webkit-transform: scaleY(1.0) }
  }
  
  @keyframes sk-stretchdelay {
    0%, 40%, 100% { 
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% { 
      transform: scaleY(1.0);
      -webkit-transform: scaleY(1.0);
    }
  }
}
`)
const Animation2Item = createStyled(styled.div`
  background-color: #000;
  height: 100%;
  width: 6px;
  margin: 0 2px;

  &.rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  &.rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  &.rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  &.rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }
`)
export const LoadingAnimation2 = (props: { label?: string }) => {
  const theme = useAppTheme()
  const getCSSStyles = useCSSStyles(theme, 'loading')({})

  return (
    <>
      <Animation2Wrapper
        {...getCSSStyles('wrapper')}
        data-test-id="loading-animation-2"
      >
        <Animation2Item
          className="rect1"
          {...getCSSStyles('item')}
        ></Animation2Item>
        <Animation2Item
          className="rect2"
          {...getCSSStyles('item')}
        ></Animation2Item>
        <Animation2Item
          className="rect3"
          {...getCSSStyles('item')}
        ></Animation2Item>
        <Animation2Item
          className="rect4"
          {...getCSSStyles('item')}
        ></Animation2Item>
        <Animation2Item
          className="rect5"
          {...getCSSStyles('item')}
        ></Animation2Item>
      </Animation2Wrapper>
      {props.label && <P label={props.label} {...getCSSStyles('label')} />}
    </>
  )
}
