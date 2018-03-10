import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import Reboot from 'material-ui/Reboot';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#a5ec75',
      main: '#73b946',
      dark: '#418813',
      contrastText: '#303030',
    },
    secondary: {
      light: '#ffa460',
      main: '#fb7332',
      dark: '#c14300',
      contrastText: '#f5f5f5',
    },
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
        <Reboot />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
