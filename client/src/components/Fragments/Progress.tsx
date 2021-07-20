/**
 * @listens 
 */


import React from 'react'
import styled from 'styled-components'


const Frame = styled.div`
    height: 23px;
    margin-bottom: -19px;
    width: 61px;
`

const Bar = styled.div`
    height: 42px;
    position: absolute;
    left: 25px;
    border: 1px solid #2047ff;
    -moz-box-shadow: 3px 3px 5px 6px #ccc;
    -webkit-box-shadow: 3px 3px 5px 6px #ccc;
    box-shadow: 1px 1px 2px 3px rgba(61, 51, 107, 0.171);
    box-shadow: inset 0.4px 0px 0.4px 3px rgba(121, 95, 236, 0.199);
    box-sizing: border-box;
    border-radius: 13px;
    margin-top: 32px;
    min-width: 320px;
    padding: 0px 3px;
`
const Porcentage = styled.div`
    background-color: var(--rookie-pink);
    color: blanchedalmond;
    text-shadow: rgba(91, 51, 107, 0.384);
    box-shadow: 2px 2px 2px 1px rgba(91, 51, 107, 0.384);
    border: 1px inset #50284e;
    border-radius: 13px;
    height: 33px;
    min-width: 50px;
    position: absolute;
    left: 4px;
    margin-top: 2px;
    padding: 5px 15px;
`

const Progress = ({ porcentage }: { porcentage: number }) => {
    return (
        <Frame>
            <Bar>
                <Porcentage style={{width:`${porcentage * 10}px`}}>{`${JSON.stringify(porcentage)}%`}</Porcentage>
            </Bar>
        </Frame>
    )
}

export default Progress
