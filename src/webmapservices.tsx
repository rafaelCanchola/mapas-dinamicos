import TileWMS from "ol/source/TileWMS";
import BingMaps from "ol/source/BingMaps";
import OlSourceOSM from "ol/source/OSM";

export const b1 =
    new TileWMS({
        params: {
            layers:'mares2',
        },
        url:'http://187.191.53.158/cgi-bin/mapserv?map=/var/www/maps/siisec.map'

    })

export const b2 =
    new BingMaps({
    imagerySet: "Aerial",
    key:'At-Y-dJe-yHOoSMPmSuTJD5rRE_oltqeTmSYpMrLLYv-ni4moE-Fe1y8OWiNwZVT'
    })

export const b3 =
    new OlSourceOSM()

export const b4 =
    new TileWMS({
        params: {
            layers:'ORTOIMAXIV',
            format:'png'
        },
        url:'http://187.191.14.5/ermex2/XIV_CNv1.exe'
    })

export const o1 =
    new TileWMS({
        params: {
            layers: "estados_mapas_dinamicos,estados_mapas_dinamicos_textos",
        },
        url:'http://187.191.53.158/cgi-bin/mapserv?map=/var/www/maps/siisec.map',
        projection:'EPSG:3857',
    })