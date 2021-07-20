import React from 'react'
import styled from 'styled-components'

// TODO logo must be move outside the component

/**
 * Challenge: 
 * 
 * Make the image a props that can be pass into
 * the component.
 * 
 * HINT: Check on Button Component
 * 
 */


import logo from '../../assets/img/logo.png'

const Divider = styled.div`
    background-color: var(--background);
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 812px;
    width: 375px;
`

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 102px;
    width: 375px;
    background: linear-gradient(244.58deg, #da3675 0%, #2047ff 100%);
`

const Image = styled.img`
    height: 41px;
    width: 121px;
    margin-right: 5px;
    margin-top: 47px;
    object-fit: cover;
`

type Props = { children: React.ReactNode }

const Main: React.FC<Props> = ({ children }) => {
    return (
        <Divider>
            <Flex>
                <Image src={logo}></Image>
            </Flex>
            {children}
        </Divider>
    )
}
export default Main
