import React, { Component } from "react";
import OlMap from 'ol/Map';
import OlView from "ol/View";
import OlLayerTile from "ol/layer/Tile";
import OlLayerVector from "ol/layer/Vector";
import OlStyle from "ol/style/Style";
import WKT from "ol/format/WKT";
import ScaleLine from "ol/control/ScaleLine";
import MousePosition from "ol/control/MousePosition";
import {Control, defaults as defaultControls} from 'ol/control';
import * as bases from '../webmapservices';

import './PublicMap.css'
import 'ol/ol.css'
import BaseLayer from "ol/layer/Base";
import VectorSource from "ol/source/Vector";
import {Fill, Stroke} from "ol/style";

interface PublicMapState{
    center:any,
    zoom:any
}

let userCreds:any;

const mapLayers: BaseLayer[] = [
    new OlLayerTile({
        source: bases.b1
    }),
    new OlLayerTile({
        source: bases.b2
    }),
    new OlLayerTile({
        source: bases.b3
    }),
    new OlLayerTile({
        source: bases.b4
    }),
    new OlLayerTile({
        source: bases.o1
    }),
]

let agaveLayer = new OlLayerVector({
    opacity:0.5,
    style: new OlStyle({stroke: new Stroke({color:"#fff", width:0.5}),fill:new Fill({color:"#00727f"})}),
    source: new VectorSource({features:undefined})
});
let manzanaLayer = new OlLayerVector({
    opacity:0.5,
    style:new OlStyle({stroke:new Stroke({color:"#fff",width:0.5}),fill:new Fill({color:"#d3353b",})}),
    source: new VectorSource({features:undefined})
});
let aguacateLayer = new OlLayerVector({
    opacity:0.5,
    style:new OlStyle({stroke:new Stroke({color:"#fff",width:0.5}),fill:new Fill({color:"#6C9B3B",})}),
    source: new VectorSource({features:undefined})
});

let appliedLayers: BaseLayer[];
let counterLayers = 1;
let isAgaveLayerOn = false;
let isManzanaLayerOn = false;
let isAguacateLayerOn = false;

function actualizarLayers(sup:any){
    appliedLayers.map(layer => sup.removeLayer(layer));
    switch (counterLayers){
        case 1:
            appliedLayers = [mapLayers[1],agaveLayer,aguacateLayer,manzanaLayer];
            break;
        case 2:
            appliedLayers = [mapLayers[0],mapLayers[4],agaveLayer,aguacateLayer,manzanaLayer];
            break;
        case 3:
            appliedLayers = [mapLayers[2],agaveLayer,aguacateLayer,manzanaLayer];
            break;
        case 4:
            appliedLayers = [mapLayers[3],mapLayers[4],agaveLayer,aguacateLayer,manzanaLayer];
            break;
    }
    appliedLayers.map(layer => sup.addLayer(layer))

}

const CambioCapaBase = /*@__PURE__*/(function (Control) {
    function ChangeLayer(opt_options:any) {

        const options = opt_options || {};
        const button = document.createElement('button');
        button.innerHTML = 'C';

        const element = document.createElement('div');
        element.className = 'capa-base ol-unselectable ol-control';
        element.appendChild(button);

        // @ts-ignore
        Control.call(this, {
            element: element,
            target: options.target,
        });

        // @ts-ignore
        button.addEventListener('click', this.handleChangeLayer.bind(this), false);
    }

    if ( Control ) ChangeLayer.__proto__ = Control;
    ChangeLayer.prototype = Object.create( Control && Control.prototype );
    ChangeLayer.prototype.constructor = ChangeLayer;

    ChangeLayer.prototype.handleChangeLayer = function handleChangeLayer () {

        counterLayers+=1;
        if(counterLayers === 5){
            counterLayers = 1;
        }
        actualizarLayers(this.getMap())

    };
    return ChangeLayer;
}(Control));

const MostrarAgave = /*@__PURE__*/(function (Control) {

    function ShowAgave(opt_options:any) {
        const options = opt_options || {};
        const button = document.createElement('button');
        const icon = document.createElement('span');
        icon.className = 'icon-agave';
        button.id = "agave-button";
        button.appendChild(icon);

        const element = document.createElement('div');
        element.className = 'mostrar-agave ol-unselectable ol-control';
        element.appendChild(button);
        // @ts-ignore
        Control.call(this, {
            element: element,
            target: options.target,
        });
        // @ts-ignore
        button.addEventListener('click', this.handleShowAgave.bind(this), false);
    }

    if ( Control ) ShowAgave.__proto__ = Control;
    ShowAgave.prototype = Object.create( Control && Control.prototype );
    ShowAgave.prototype.constructor = ShowAgave;

    ShowAgave.prototype.handleShowAgave = function handleShowAgave () {
        const filter = 5050000;
        const user = userCreds.id;
        const extent = this.getMap().getView().calculateExtent();
        const xmin = extent[0];
        const ymin = extent[1];
        const xmax = extent[2];
        const ymax = extent[3];
        //@ts-ignore
        const handleSubmit = async () => {
            const agave = await downloadPolygons({
                filter,
                user,
                xmin,
                ymin,
                xmax,
                ymax,
            });
            //@ts-ignore
            return agave.map(geo => new WKT().readFeature(geo.the_geom,{}));
        }
        isAgaveLayerOn = !isAgaveLayerOn;
        if(isAgaveLayerOn){
            handleSubmit()
                .then(
                    (wkt) =>{
                        agaveLayer.getSource().addFeatures(wkt)
                        actualizarLayers(this.getMap())
                        // @ts-ignore
                        document.getElementById("agave-button").style.backgroundColor = "#285C4D"
                    }
                ).catch(
                ()=> isAgaveLayerOn = false
            )
        }else{
            agaveLayer.getSource().clear();
            // @ts-ignore
            document.getElementById("agave-button").style.backgroundColor = "lightslategray";
        }
    };
    return ShowAgave;
}(Control));

const MostrarAguacate = /*@__PURE__*/(function (Control) {

    function ShowAguacate(opt_options:any) {
        const options = opt_options || {};
        const button = document.createElement('button');
        button.id = "aguacate-button";
        const icon = document.createElement('span');
        icon.className = 'icon-avocado';
        button.appendChild(icon)
        const element = document.createElement('div');
        element.className = 'mostrar-aguacate ol-unselectable ol-control';
        element.appendChild(button);
        // @ts-ignore
        Control.call(this, {
            element: element,
            target: options.target,
        });
        // @ts-ignore
        button.addEventListener('click', this.handleShowAguacate.bind(this), false);
    }

    if ( Control ) ShowAguacate.__proto__ = Control;
    ShowAguacate.prototype = Object.create( Control && Control.prototype );
    ShowAguacate.prototype.constructor = ShowAguacate;

    ShowAguacate.prototype.handleShowAguacate = function handleShowAgave () {
        const filter = 5060000;
        const user = userCreds.id;
        const extent = this.getMap().getView().calculateExtent();
        const xmin = extent[0];
        const ymin = extent[1];
        const xmax = extent[2];
        const ymax = extent[3];
        //@ts-ignore
        const handleSubmit = async () => {
            const agave = await downloadPolygons({
                filter,
                user,
                xmin,
                ymin,
                xmax,
                ymax,
            });
            //@ts-ignore
            return agave.map(geo => new WKT().readFeature(geo.the_geom,{}));
        }
        isAguacateLayerOn = !isAguacateLayerOn;
        if(isAguacateLayerOn){
            handleSubmit()
                .then(
                    (wkt) =>{
                        aguacateLayer.getSource().addFeatures(wkt)
                        actualizarLayers(this.getMap())
                        // @ts-ignore
                        document.getElementById("aguacate-button").style.backgroundColor = "#6C9B3B"
                    }
                ).catch(
                ()=> isAguacateLayerOn = false
            )
        }else{
            aguacateLayer.getSource().clear();
            // @ts-ignore
            document.getElementById("aguacate-button").style.backgroundColor = "lightslategray";
        }
    };
    return ShowAguacate;
}(Control));

async function downloadPolygons(cultivo:any) {
    const local = 'http://localhost:8080/api/poligonos';
    const pruebas = 'http://187.191.53.158:8080/api/poligonos';

    let route =
        pruebas +'?&filter='+cultivo.filter+ '&user=' + cultivo.user +
        '&xmin=' + cultivo.xmin + '&xmax=' + cultivo.xmax + '&ymin=' + cultivo.ymin + '&ymax=' + cultivo.ymax;
    return fetch(route, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}

export default class PublicMap extends Component<any, PublicMapState> {
    private olmap: any;

    constructor(props:any) {
        super(props);
        userCreds = this.props.user;
        this.state = { center: [-11397253.55045682,2806837.5334897055], zoom: 5.2 };
        this.olmap = new OlMap({
            view: new OlView({
                center: this.state.center,
                zoom: this.state.zoom,
                //minZoom:5.2,
                maxZoom:10,
                extent:[-14288915.653663361,1750678.179152118,-8505591.44725028,3862996.887827293],

            }),
            //@ts-ignore
            controls:defaultControls().extend([new CambioCapaBase(), new MostrarAgave(), new MostrarAguacate(), new ScaleLine(), new MousePosition()]),
        });
        appliedLayers = [mapLayers[1]];
        this.olmap.addLayer(appliedLayers[0]);
        //actualizarLayers(this.olmap.getMap());
    }


    updateMap() {
        this.olmap.getView().setCenter(this.state.center);
        this.olmap.getView().setZoom(this.state.zoom);

    }

    componentDidMount() {
        this.olmap.setTarget("map");

        // Listen to map changes
        this.olmap.on("moveend", () => {
            let center = this.olmap.getView().getCenter();
            let zoom = this.olmap.getView().getZoom();
            this.setState({ center, zoom });
        });
    }

    shouldComponentUpdate(nextProps:any, nextState:any) {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();

        console.log(" center: "+this.state.center + ":"+ this.state.zoom);
        return !(center === nextState.center && zoom === nextState.zoom);
    }

    render() {
        this.updateMap(); // Update map on render?
        return (
                <div id="map">

                </div>

        );
    }
}


