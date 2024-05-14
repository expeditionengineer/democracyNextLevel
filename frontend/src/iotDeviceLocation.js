import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

const IotDeviceMap = () => {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetch('http://your-api-url/api/iotdevices')
            .then(response => response.json())
            .then(data => setDevices(data));
    }, []);

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {devices.map(device => (
                <Marker
                    key={device.id}
                    position={[
                        device.coordinates.coordinates[1],
                        device.coordinates.coordinates[0]
                    ]}
                />
            ))}
        </MapContainer>
    );
};

export default IotDeviceMap;