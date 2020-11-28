const { createGlobalStyle } = require('styled-components');

const GlobalStyle = createGlobalStyle`
  html {
		font-size: 16px;
		box-sizing: border-box;
	}

	*, *:before, *:after {
		padding: 0;
		margin: 0;
		box-sizing: inherit;
	}

  body {
		font-size: 1rem;
		color: ${(props) => props.theme.primaryColor};
		background-color: ${(props) => props.theme.mainBg};
		line-height: 1.8;
	}

  a {
		text-decoration: none;
		color: inherit;
	}

  input {
    outline: none;
  }

  input:focus, textarea:focus, button:focus, video:focus {
			outline: none;
	}

  svg {
    fill: ${(props) => props.theme.secondaryColor}
  }

  ul{
    list-style: none;
  }


  .nav-active {
    font-weight: 500;
    svg {
      fill: ${(props) => props.theme.accent};
    }
    background-color: ${(props) => props.theme.itemActive};
  }

  .avatar {
    width: 40px;
    height: 40px;
    margin-right: 16px;
  }

  .button {
    text-align: center;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 14px;
    font-weight: 450;
    height: 36px;
    padding: 0 14px;
  }

`;

export default GlobalStyle;
