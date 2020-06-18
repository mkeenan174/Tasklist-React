import React from 'react';

function PageHeader(props){
    const title = props.title
    return(
        <header style ={headerStyle}>
            <i className =  {'material-icons'} style = {menuIconStyle}>reorder</i>
            <h1 style = {headerTitleStyle}>{title}</h1>
        </header>
    )
}
  
const headerStyle = {
    display: 'flex',
    width: '100vw',
    height: '8vh',
    margin: '0',
    padding: '0',
    background: '#95f0e2',
    
}

const headerTitleStyle = {
   margin: 'auto auto'

}

const menuIconStyle = {
    fontSize : '7vh',
    marginLeft : '2%' 
    

}

export default PageHeader;


