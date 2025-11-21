import monitoringData from "@/data/ana_oct2019.json";

// Tipos para los datos adicionales de cada punto
export interface PointData {
    gestiones: string[];
    valores: string[];
    limites: (string | null)[];
    eca: string[];
}

// Importar datos adicionales por código de punto
export interface AdditionalDataMap {
    [key: string]: [string[], string[], (string | null)[], string[]];
}

export const PARAMETROS_DISPONIBLES = {
    "aceites_grasas": {
        nombre: "Aceites y Grasas",
        unidad: "mg/L",
        data: {
            "LTit59": [["ABR2019", "OCT2019"], ["0.9", "0.18"], [null, null], ["5.0000000", "5.0000000"]] as [string[], string[], (string | null)[], string[]],
            "LTit60": [["ABR2019", "OCT2019"], ["0.9", "0.19"], [null, null], ["5.0000000", "5.0000000"]] as [string[], string[], (string | null)[], string[]],
            "LTit61": [["ABR2019", "OCT2019"], ["4", "0.1"], [null, null], ["5.0000000", "5.0000000"]] as [string[], string[], (string | null)[], string[]],
            "LTit62": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
            "LTit63": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
            "LTit64": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
            "LTit65": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
            "LTit66": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
            "LTit67": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
            "LTit68": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
            "LTit69": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
            "LTit70": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
            "LTit71": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
            "LTit72": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
            "LTit73": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
        } as AdditionalDataMap
    },
    "clorofila_a": {
        nombre: "Clorofila a",
        unidad: "mg/L",
        data: {
            "LTit59": [["ABR2019", "OCT2019"], ["0.08935", "0.04287"], [null, null], ["0.0080000", "0.0080000"]] as [string[], string[], (string | null)[], string[]],
            "LTit60": [["ABR2019", "OCT2019"], ["0.11894", "0.02802"], [null, null], ["0.0080000", "0.0080000"]] as [string[], string[], (string | null)[], string[]],
        } as AdditionalDataMap
    }
};

export function getMonitoringPoints(parametro: keyof typeof PARAMETROS_DISPONIBLES) {
    const monitoringFeatures = (monitoringData[1] as any)?.features;
    const additionalData = PARAMETROS_DISPONIBLES[parametro].data;

    if (!monitoringFeatures || !Array.isArray(monitoringFeatures)) return [];

    return monitoringFeatures
        .filter((feature: any) => feature.geometry?.type === "Point" && feature.geometry.coordinates)
        .map((feature: any) => {
            const [lng, lat] = feature.geometry.coordinates;
            const props = feature.properties;
            const codigo = props.codigo;
            const pointData = additionalData[codigo];

            let value = 0;
            let hasData = false;

            if (pointData && pointData[1] && pointData[1].length > 0) {
                // Get latest value
                value = parseFloat(pointData[1][pointData[1].length - 1]);
                hasData = true;
            }

            return {
                id: codigo,
                lat,
                lng,
                name: props.nombre || codigo,
                type: props.tipo,
                value,
                hasData,
                parametro: PARAMETROS_DISPONIBLES[parametro].nombre,
                unidad: PARAMETROS_DISPONIBLES[parametro].unidad
            };
        });
}
