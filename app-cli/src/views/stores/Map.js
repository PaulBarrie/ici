import { useMapEvents } from 'react-leaflet';


export default function MapComponent() {
    const map = useMapEvents({
      click: () => {
          console.log("ok")
        map.locate()
      },

    })
    return null
  }