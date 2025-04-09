import { Bed } from "lucide-react";

const BedTicket = () => {
    return (
        <div style={{ position: 'relative', display: 'inline-block', paddingInline: 5 }}>
            <Bed />
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    borderTop: '2px solid red', // Línea roja, puedes cambiar el color y grosor
                    transform: 'translateY(-50%) rotate(-15deg)', // Centra la línea
                }}
            />
        </div>
    );
};

export default BedTicket;