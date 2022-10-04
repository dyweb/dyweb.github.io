import React, { useEffect, useState } from 'react';
import './index.css';
import {
  GithubOutlined,
  ZhihuOutlined
} from "@ant-design/icons";
import { Collapse, Fade, HStack, VStack } from "@chakra-ui/react";
import Triangle from "../../components/triangle";

function Index() {
  const [show, setShow] = useState(false)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
      setTimeout(() => setFade(true), 500)
    }, 500)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src='/logo.svg' className="App-logo" alt="logo"/>
        <Collapse
          in={show}
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          transition={{ enter: { duration: 0.5 } }}
        >
          <Fade in={fade} transition={{ enter: { duration: 0.5 } }}>
            <VStack spacing={0}>
              <p className="eng-name">
                <span style={{ color: 'grey' }}>&gt;&nbsp;</span>
                <span>Dongyue Web Studio</span>
                <span className='animate-flicker'>&nbsp;_</span>
              </p>
              <div className="chs-name">
                东岳网络工作室
              </div>
              <HStack className="links" spacing={6}>
                <a href='https://blog.dongyueweb.com/' target='_blank' rel="noreferrer" className='triangle-link'>
                  <Triangle className='triangle'/>
                </a>
                <a href='https://github.com/dyweb' target='_blank' rel="noreferrer">
                  <GithubOutlined/>
                </a>
                <a href='https://zhuanlan.zhihu.com/dongyue' target='_blank' rel="noreferrer">
                  <ZhihuOutlined/>
                </a>
              </HStack>
            </VStack>
          </Fade>
        </Collapse>
      </header>
    </div>
  );
}

export default Index;
