import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// 创建地图
const initMap = (id, options) => {
  const map = L.map(id, options);
  return map;
};

// 添加图层
const addTileLayer = (map, url, options) => {
  let tileLayer = L.tileLayer(url, options);
  tileLayer.addTo(map);
  return tileLayer;
};

// 清除图层-单个清除
const removeLayer = (map, tilelayer) => {
  map.removeLayer(tilelayer);
};

const addLayerWMS = (map, url, options) => {
  let layerWms = L.tileLayer.wms(url, options);
  layerWms.addTo(map);
  return layerWms;
};
export default {
  initMap,
  addTileLayer,
  removeLayer,
  addLayerWMS,
};
