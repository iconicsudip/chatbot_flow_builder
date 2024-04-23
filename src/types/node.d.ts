import {MarkerType} from 'reactflow'

export type T_Node = {
    id: string,
    data: {
        label: string,
        selectedId: string
    },
    position: {
        x: number,
        y: number
    },
    type: string,
    markerEnd:{
        type: MarkerType
    }
    dragHandle: string,
    style: {
        border: string,
        padding: number,
        background: string,
        width: string,
        borderRadius: string
    }
}