import ReactFlow, { Background, NodeTypes, Edge, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './Canvas.module.scss'
import { useEffect } from 'react';
import { T_Node } from '../../types/node';

interface Props {
    nodes: T_Node[]
    nodeTypes: NodeTypes
    setNodes: React.Dispatch<React.SetStateAction<any[]>> | any
    edges: Edge<any>[]
    onConnect: (params:any) => void
    setSelectedNode: React.Dispatch<React.SetStateAction<T_Node | null>>
    selectedNode: T_Node | null
}

export default function Canvas({selectedNode,setSelectedNode, nodes, nodeTypes, setNodes, edges, onConnect }:Props) {
    
    const handleChangeNode = (newNodes:any) => {
        if(!newNodes[0].dragging) return
        setNodes((prev:any)=>{
            const newNodesId = prev.map((node:T_Node)=>{
                if(node.id === newNodes[0].id){
                    node.position = newNodes[0].position
                }
                return node
            })
            return newNodesId
        })
    }

    const handleAddNode = (postion:{
        x:number,
        y:number
    }, nodeType:string) => {
        const newNode: T_Node = {
            id: (nodes.length + 1).toString(),
            data: {
                label: `Text message ${nodes.length + 1}`,
                selectedId: ''
            },
            position: {
                x: postion.x,
                y: postion.y
            },
            type: nodeType,
            markerEnd: {
                type: MarkerType.Arrow,
            },
            dragHandle: '.node_header',
            style: {
                border: '1px solid #ddd',
                padding: 0,
                background: 'white',
                width: "10rem",
                borderRadius: "4px",
            },
        }
        setNodes([...nodes, newNode])
    }

    useEffect(() => {
        setNodes((prev: T_Node[])=>{
            const newNodes = prev.map((node: T_Node)=>{
                if(node.id === selectedNode?.id){
                    node.data.selectedId = selectedNode?.id
                    node.style.border = '1px solid #007bff'
                }else{
                    node.data.selectedId = ""
                    node.style.border = '1px solid #ddd'
                }
                return node
            })
            return newNodes
        })
    },[selectedNode?.id])
    return (
        <div className={styles.canvas}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={handleChangeNode}
                onConnect={onConnect}
                fitView
                onDrop={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.background = 'rgba(0,0,0,0.0)'
                    const x = e.clientX;
                    const y = e.clientY;
                    const type = e.dataTransfer.getData('application/reactflow');
                    handleAddNode({x,y}, type)
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.currentTarget.style.background = 'rgba(0,0,0,0.05)'
                }}
                onNodeClick={(e,node) => {
                    e.stopPropagation()
                    setSelectedNode(node as T_Node)
                }}
            >
                <Background />
            </ReactFlow>
        </div>
    )
}
