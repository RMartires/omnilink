import React from "react";
import Container from "react-bootstrap/Container";
import ToolBar from "./components/ToolBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function (props) {
  return (
    <div>
      <ToolBar buttons={["home"]} />
      <Container fluid style={{ maxWidth: "1200px" }}>
        <Row style={{ margin: "50px" }}>
          <Col>
            <div>
              <h1>Privacy Policy</h1>
              <p>
                linnkninja web app is built by{" "}
                <a href="https://twitter.com/RohitMartires" target="_blank">
                  @RohitMartires
                </a>{" "}
                as a personal project it's services are provided for free
              </p>
              <p>
                note: from here on i will be refering to the linnkninja webapp
                as its/it or our/ours
              </p>
              <p>
                This page is used to inform visitors regarding its policies with
                the collection, use, and disclosure of Personal Information if
                anyone decided to use its Service.
              </p>
              <p>
                If you choose to use its Service, then you agree to the
                collection and use of information in relation to this policy.
                The Personal Information that it collect is used for providing
                and improving the Service. We will not use or share your
                information with anyone except as described in this Privacy
                Policy.
              </p>

              <h2>Information Collection and Use</h2>
              <p>
                For a better experience, while using our Service, we may require
                you to provide us with certain personally identifiable
                information. The information that we request will be retained by
                us and used as described in this privacy policy. The app does
                use third party services that may collect information used to
                identify you. Link to privacy policy of third party service
                providers used by the app
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/legal/FB_Work_Privacy"
                      target="_blank"
                    >
                      Facebook Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://help.instagram.com/325135857663734"
                      target="_blank"
                    >
                      Instagram Basic Display
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.airtable.com/hc/en-us/articles/203466199-Airtable-security-practices"
                      target="_blank"
                    >
                      Airtable
                    </a>
                  </li>
                </ul>
              </p>

              <h2>Information You Provide</h2>
              <p>
                you provide ur email and userID via the facebook login we use
                this to identify u as a user since they are unique to only you
                alos while setting up the linnkninja account you provide us with
                ur instagram username and profilepicture we use this as the
                header of the linnkninja account. None of this data is shared
                with anyone is complety safe with us.
              </p>
              <p>
                You also provide us with ur links to be placed in your
                linnkninja page, these link are publicly displayed on your
                linnkninja page as design/utility of the app
              </p>

              <h2>Cookies</h2>
              <p>
                linnkninja does use cookies to store login information, other
                3rd party services also use cookies for certain functionality
                you may opt-out of using cookies but that will affcect certain
                sections of the service
              </p>

              <h2>Service Providers</h2>
              <p>
                We may employ third-party companies and individuals due to the
                following reasons
                <ul>
                  <li>To facilitate our Service</li>
                  <li>To provide the Service on our behalf</li>
                  <li>
                    To perform Service-related services or To assist us in
                    analyzing how our Service is used.
                  </li>
                </ul>
                we want to inform users of this Service that these third parties
                have access to your Personal Information. The reason is to
                perform the tasks assigned to them on our behalf. However, they
                are obligated not to disclose or use the information for any
                other purpose.
              </p>

              <h2>Security</h2>
              <p>
                We value your trust in providing us your Personal Information,
                thus we are striving to use commercially acceptable means of
                protecting it. But remember that no method of transmission over
                the internet, or method of electronic storage is 100% secure and
                reliable, and we cannot guarantee its absolute security.
              </p>

              <h2>Links to Other Sites</h2>
              <p>
                This Service may contain links to other sites. If you click on a
                third-party link, you will be directed to that site. Note that
                these external sites are not operated by us. Therefore, we
                strongly advise you to review the Privacy Policy of these
                websites. we have no control over and assume no responsibility
                for the content, privacy policies, or practices of any
                third-party sites or services.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. Thus, you
                are advised to review this page periodically for any changes. we
                will notify you of any changes by posting the new Privacy Policy
                on this page. This policy is effective as of 2020-06-30
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions or suggestions about our Privacy
                Policy, do not hesitate to contact us at
                rohit_martires@yahoo.com
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
