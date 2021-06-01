import React,{useState} from "react";
import PropTypes from 'prop-types';
import AnimationRevealPage from "../components/helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "../images/bienes2.jpg";
import logo1 from "../images/logo1.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";

const Container = tw(ContainerBase)`min-h-screen bg-siap-300 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`md:w-2/4 lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoImage = tw.img`md:h-12 lg:h-20 w-96 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-blue-400 text-gray-100 w-full py-4 rounded-lg hover:bg-siap-300 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-gray-100 text-center hidden sm:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-8 xl:m-2 w-full max-w-full bg-cover bg-center bg-no-repeat rounded-lg`}
`;

async function loginUser(credentials) {
  return fetch('http://187.191.53.158:8080/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
      .then(data => data.json())
}

export default function Login({setToken}){
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }
  return(
      <AnimationRevealPage>
        <Container>
          <Content>
            <MainContainer>
                <LogoImage src={logo1} />
              <MainContent>
                <Heading>Mapas Dinámicos</Heading>
                <Heading>Iniciar Sesión</Heading>
                <FormContainer>
                  <Form onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Email" id={"user"} onChange={e => setUsername(e.target.value)} />
                    <Input type="password" placeholder="Password" id={"pass"} onChange={e => setPassword(e.target.value)}/>
                    <SubmitButton type="submit">
                      <LoginIcon className="icon" />
                      <span className="text">Iniciar Sesión</span>
                    </SubmitButton>
                  </Form>
                </FormContainer>
              </MainContent>
            </MainContainer>
            <IllustrationContainer>
              <IllustrationImage imageSrc={illustration} />
            </IllustrationContainer>
          </Content>
        </Container>
      </AnimationRevealPage>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
