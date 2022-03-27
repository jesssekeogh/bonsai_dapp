import React from "react";
import klogo from "../../../assets/kontribute_logo.png";
import icBadge from "../../../assets/ic-badge-powered-by_label-stripe-white-text.svg";
import { CgInfinity } from "react-icons/cg";
import { Box, Image, Center, Button } from "@chakra-ui/react";
import "./AuthPage.css";

const AuthPage = ({ signIn }) => {
  return (
    <div>
      <Center mt="10%">
        <Box
          maxW="sm"
          borderWidth="1px"
          borderColor="#9d8144"
          borderRadius="lg"
          overflow="hidden"
        >
          <Center>
            <Image p="5" maxH="300px" src={klogo} alt="kontribute" />
          </Center>
          <Box p="3">
            <Box display="flex" alignItems="baseline">
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
              >
                Please Authenticate to enter Kontribute
              </Box>
            </Box>

            <Box mt="3">
              <Center>
                <div className="bonsai__auth-button">
                  <Button
                    onClick={signIn}
                    rightIcon={<CgInfinity />}
                    colorScheme="#0a0a0d"
                    bg="#9d8144"
                  >
                    Authenticate
                  </Button>
                </div>
              </Center>
            </Box>
          </Box>
        </Box>
      </Center>
      <div className="Bonsai__auth_footer">
        <Box>
          <Image src={icBadge} alt="Powered by IC" />
        </Box>
      </div>
    </div>
  );
};

export default AuthPage;
