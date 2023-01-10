import React,{useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Menu = styled.ul`
    display: flex;
    flex-direction: row;
    justify-items:center;
    align-items: center;
    list-style:none;

    .submenu{
        width: 100% auto;
        padding: 10px 10px;
        cursor:pointer;
    }
`;

const Header = ()=>{
    const [currentTab, setCurrentTab] = useState(0);
    const navigate = useNavigate();
    const menuArr = [ /*임시 */
        {name: '회원관리'},
        {name: '수강관리'},
        {name: '세번째 탭'},
    ]
    const selectMenu = (index) =>{
        console.log(index);
        setCurrentTab(index);
        if(index===0){
            navigate('/');
        }else if(index===1){
            navigate('/calendar');
        }else if(index==2){
            navigate('/test');
        }
    };

    return (
        <>
            <Menu>
            {menuArr.map((el,index)=>(
                <li className={index ===  currentTab ? "submenu focused" : "submenu" } onClick={() => selectMenu(index)}>{el.name}</li>
            ))}
            </Menu>
        </>
    )


}
export default Header;