import React from "react";
import Typography from "@material-ui/core/Typography";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";

var theme = createMuiTheme();
theme = responsiveFontSizes(theme);

function Page404() {
  return (
    <div>
      <ThemeProvider>
        <Typography variant="h1" theme={theme} style={{ marginTop: "50%" }}>
          404 ERROR
        </Typography>
      </ThemeProvider>
    </div>
  );
}

export default Page404;
