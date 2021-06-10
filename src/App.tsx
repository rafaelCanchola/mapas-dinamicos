import React, {useState} from 'react';
import logo1 from './images/logo1.png';
import './App.css';
import "tailwindcss/dist/base.css";
import "./styles/globalStyles.css";
import { css } from "styled-components/macro"; //eslint-disable-line
import PublicMap from "./screens/PublicMap";
import Login from "./pages/Login";
import UseToken from "./hooks/UseToken";
import AnimationRevealPage from "./components/helpers/AnimationRevealPage";
import Header, {LogoLink, NavLink, NavLinks, PrimaryLink} from "./components/headers/light.js";
import tw from "twin.macro";
import {Container as ContainerBase} from "./components/misc/Layouts";
import TableCultivo from "./screens/TableCultivo";
import AnalyticMap from "./screens/AnalyticMap";

const Container = tw.div`relative`;
const Content = tw.div`bg-siap-100 flex items-center xl:flex-row lg:rounded-lg`;
const MapContent = tw.div`lg:w-9/12 sm:my-6 bg-white  sm:mx-6  text-gray-900 shadow sm:rounded-lg`;
const Map2Content = tw.div`lg:w-9/12 sm:my-6 bg-white  sm:mx-6  text-gray-900 shadow sm:rounded-lg`;
const InfoContent = tw.div`lg:w-3/12 sm:my-6 bg-white  sm:mx-6  text-gray-900 shadow sm:rounded-lg`;
const Paragraph = tw.p`my-12 lg:my-12 text-center text-base xl:text-lg`;

const HighlightedText = tw.span`text-primary-500`;
const Subheading = tw.span`uppercase tracking-widest font-bold text-primary-500`;

const heading = [
    {
        header: 'first row',
        columns: ['first column', 'second column'],
    },
    {
        header: 'second row',
        columns: ['first column', 'second column'],
    },
    {
        header: 'third row',
        columns: ['first column', 'second column'],
    },
]

function App() {
    const { token, setToken, deleteToken } = UseToken();
    const [cultivo,setCultivo] = useState();
    const handleCallback = (childData:any) =>{
        setCultivo(childData);
    }
    const defaultLinks = [
        <NavLinks>
            <NavLink href="/#mapa">Ver Mapa</NavLink>
            <NavLink href="/#estadistica">Estadistica</NavLink>
            <NavLink href="/#">Subir Archivo</NavLink>
            <NavLink href="/#">Agregar Ejercicio</NavLink>
            <PrimaryLink href="" onClick={() => {setToken(null);deleteToken()}}>Cerrar Sesión</PrimaryLink>
        </NavLinks>
    ];
    const logoLink =[
        <LogoLink href=""><img src={logo1} alt=""  />Mapas Dinámicos</LogoLink>
    ]
    if(!token){
        return (<div className="App"><Login setToken={setToken}/></div>)
    }
    return (
    <div className="App">
        <AnimationRevealPage>
            <Header roundedHeaderButton={true} links={defaultLinks} logoLink={logoLink} className={""}></Header>
            <div id={"mapa"}>
                <Container>
                    <Content>
                        <MapContent><PublicMap user={token} cultivoCallback={handleCallback}/></MapContent>
                        <InfoContent>
                            <Paragraph>
                                {cultivo === undefined ? <>Selecciona un predio para ver su información.</>:<>Información detallada<TableCultivo id={cultivo}/></>}
                            </Paragraph>
                        </InfoContent>
                    </Content>
                </Container>
            </div>
            <div id={"estadistica"}>
                <Container>
                    <Content>
                        <InfoContent>
                            <Paragraph>
                               Selecciona un estado para ver su información.
                            </Paragraph>
                        </InfoContent>
                        <Map2Content><AnalyticMap/></Map2Content>

                    </Content>
                </Container>
            </div>

        </AnimationRevealPage>
    </div>
  );
}

export default App;
