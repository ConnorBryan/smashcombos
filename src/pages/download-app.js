import React from "react";
import platform from "platform";
import { Item, List } from "semantic-ui-react";

import { Hero, Layout } from "../components";
import mobile from "../img/mobile.svg";

export default function DownloadApp({ navigate }) {
  return (
    <Layout navigate={navigate}>
      <Hero
        image={mobile}
        header="Download the app for easy SmashCombos access"
        description={
          <>
            Accessing the website is great, but sometimes you want something a
            little more convenient. SmashCombos makes use of a technology called{" "}
            <em>progressive web applications</em>, which allows you to download
            the site as if it were an app. Find instructions specific to your
            device below.
          </>
        }
      />
      <Item.Group relaxed="very">
        <Item
          style={{
            padding: "2rem",
            background: "#1B1C1C"
          }}
        >
          {(() => {
            switch (platform.os.family.toLowerCase()) {
              case "android":
                return (
                  <Item.Content>
                    <Item.Header
                      as="h2"
                      style={{
                        fontSize: "2rem"
                      }}
                      content="It looks like you're using Android."
                    />
                    <Item.Description
                      style={{
                        fontSize: "1.2rem"
                      }}
                    >
                      <List
                        ordered
                        items={[
                          "To download the app on Android, first open this site in Chrome for Android.",
                          "Next, press the Chrome menu button to view a list of options.",
                          'One of these options should be "Add to Home Screen".',
                          "Simply click this button and the app will be available on your device."
                        ]}
                      />
                    </Item.Description>
                  </Item.Content>
                );
              case "ios":
                return (
                  <Item.Content>
                    <Item.Header
                      as="h2"
                      style={{
                        fontSize: "2rem"
                      }}
                      content="It looks like you're using iOS."
                    />
                    <Item.Description
                      style={{
                        fontSize: "1.2rem"
                      }}
                    >
                      <List
                        ordered
                        items={[
                          "To download the app on iOS, first open this site in Safari.",
                          "Next, press the Safari menu button to view a list of options.",
                          'One of these options should be "Add to Home Screen".',
                          "Simply click this button and the app will be available on your device."
                        ]}
                      />
                    </Item.Description>
                  </Item.Content>
                );
              case "os x":
              case "windows":
              case "linux":
                return (
                  <Item.Content>
                    <Item.Header
                      as="h2"
                      style={{
                        fontSize: "2rem"
                      }}
                      content="It looks like you're using a desktop."
                    />
                    <Item.Description
                      style={{
                        fontSize: "1.2rem"
                      }}
                    >
                      <List
                        ordered
                        items={[
                          "To download the app on desktop, first open this site in Chrome.",
                          "Next, at the top of the screen, in the Chrome menu, select View, mouse over Developer, and select Developer Tools.",
                          "Once the Developer Tools are open at the bottom of your screen, click the tab labeled Application.",
                          "On the App Manifest screen, look for the Add to Home Screen button on the right hand side. Click this button.",
                          "Finally, a banner should appear at the top of the Chrome browser window. Click that button and continue to download the app."
                        ]}
                      />
                    </Item.Description>
                  </Item.Content>
                );
              default:
                return (
                  <Item.Content>
                    <Item.Header
                      as="h2"
                      style={{
                        fontSize: "2rem"
                      }}
                      content="We're not sure what device you are using."
                    />
                    <Item.Description
                      style={{
                        fontSize: "1.2rem"
                      }}
                    >
                      To install the app on your device, we recommend searching
                      Google for "install progressive web app (my device)". The
                      top result should give you the information you need to add
                      SmashCombos to your downloaded applications.
                    </Item.Description>
                  </Item.Content>
                );
            }
          })()}
        </Item>
      </Item.Group>
    </Layout>
  );
}
