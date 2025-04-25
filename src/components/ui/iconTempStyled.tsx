import { Thermometer, ThermometerSnowflake, ThermometerSun } from "lucide-react";

export const IconTempStyled = ({ temperature }: { temperature: number }) => {

    console.log("temperature");
    console.log(temperature);

    if (temperature < 10) return (
        <ThermometerSnowflake color="#0ffffb" size={28} />
    )
    if (temperature < 15) return (
        <ThermometerSnowflake color="#0ffffb" size={28} />
    )
    if (temperature < 23) return (
        <Thermometer size={28} />
    )
    if (temperature < 26) return (
        <ThermometerSun color="#fe780b" size={28} />
    )
    if (temperature >= 26) return (
        <ThermometerSun color="#fe3c0b" size={28} />
    )
};