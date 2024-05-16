import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const IotDeviceMap = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/iotdevices')
            .then(response => response.json())
            .then(data => setDevices(data));
    }, []);

    return (
        <div>
        <h1>IoT-Geräte</h1>
        <p>Die folgende Karte zeigt die Position der eingetragenen Iot-Geräte.</p>
        <MapContainer center={[52.5234, 13.3995]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {devices.map(device => (
                <Marker
                    key={device.id}
                    position={[
                        device.latitude,
                        device.longitude
                    ]}
                >
            
                    <Popup>
                        <div>
                            <h2>Name des Iot-Geräts: {device.deviceName}</h2>
                            <p>Typ des Iot-Geräts: {device.typeOfDevice}</p>
                            <p>Beschreibung: {device.deviceDescription}</p>
                            <p>Bild: </p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
        </div>
    );
};

export default IotDeviceMap;