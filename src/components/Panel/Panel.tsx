import { Edge } from 'reactflow';
import { NodeType } from '../../enums/nodetype';
import { T_Node } from '../../types/node';
import NodeTextEditor from '../NodeTextEditor';
import { TextNodeButton } from '../TextNodeButton';
import styles from './Panel.module.scss'

interface Props {
    setSelectedNode: React.Dispatch<React.SetStateAction<T_Node | null>>
    selectedNode: T_Node | null
    setNodes: React.Dispatch<React.SetStateAction<never[]>>
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
}

export default function Panel({ selectedNode, setSelectedNode, setNodes, setEdges }:Props) {
    const handleDragStart = (e:React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('application/reactflow', 'textNode')
    }

    const handleDragEnd = (e:React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.clearData('application/reactflow')
    }

    
    return (
        <div className={styles.panel}>
            {selectedNode ?
                <>
                    {NodeType.TextNode === selectedNode.type && <NodeTextEditor setSelectedNode={setSelectedNode} setNodes={setNodes} selectedNode={selectedNode} setEdges={setEdges} />}
                </>
                :
                <div className={styles.panel_board}>
                    <TextNodeButton draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} className={styles.node_button} />
                </div>
            }

        </div>
    )
}
