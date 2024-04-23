import styles from './Home.module.scss'
import Canvas from '../../components/Canvas'
import Panel from '../../components/Panel'
import { useCallback, useEffect, useState } from 'react';
import TextNode from '../../components/TextNode';
import { addEdge, useEdgesState } from 'reactflow';
import { T_Node } from '../../types/node';
import { NodeType } from '../../enums/nodetype';
import { Button, Tooltip, message } from 'antd';
import { TbBrandWhatsapp } from 'react-icons/tb';

export default function Home() {
    const nodeTypes = {
        [NodeType.TextNode]: TextNode,
    };
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useEdgesState([]);
    const onConnect = useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);
    const [selectedNode, setSelectedNode] = useState<T_Node | null>(null);
    const [isChanged, setIsChanged] = useState(false);

    const handleSaveChanges = () => {
        let hasUnconnectedNodes = false;
        nodes.forEach((node: T_Node) => {
            const outgoingEdges = edges.filter((edge) => edge.source === node.id);
            const incomingEdges = edges.filter((edge) => edge.target === node.id);
            if (outgoingEdges.length === 0 && incomingEdges.length === 0) {
                hasUnconnectedNodes = true;
            }
        });
        if (hasUnconnectedNodes) {
            message.error('Cannot save flows. There are unconnected nodes');
            return
        }
        localStorage.setItem('nodes', JSON.stringify(nodes));
        localStorage.setItem('edges', JSON.stringify(edges));
        setIsChanged(false);
        message.success('Changes saved successfully');
    }

    useEffect(() => {
        const localNodes = localStorage.getItem('nodes');
        const localEdges = localStorage.getItem('edges');
        if (localNodes) {
            setNodes(JSON.parse(localNodes));
        }
        if (localEdges) {
            setEdges(JSON.parse(localEdges));
        }
    }, [localStorage.getItem('nodes'), localStorage.getItem('edges')])

    useEffect(() => {
        const localNodes = localStorage.getItem('nodes');
        const parsedLocalNodes = JSON.parse(localNodes ?? '[]');
        const hasLabelChanges = nodes.some((node: T_Node) => node.data.label !== parsedLocalNodes.filter((n: T_Node) => n.id === node.id)[0]?.data?.label);
        const hasPositionChanges = nodes.some((node: T_Node) => node.position.x !== parsedLocalNodes.filter((n: T_Node) => n.id === node.id)[0]?.position?.x || node.position.y !== parsedLocalNodes.filter((n: T_Node) => n.id === node.id)[0]?.position?.y);
        const hasLengthChanges = nodes.length !== parsedLocalNodes.length;

        setIsChanged(hasLabelChanges || hasLengthChanges || hasPositionChanges);
    }, [nodes]);
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.heading}>
                    <TbBrandWhatsapp className={styles.logo} />
                    <h3>Chatbot Fow Builder</h3>
                </div>
                {!isChanged ?
                    <Tooltip title='No changes to save'>
                        <Button disabled type='primary'>Save Changes</Button>
                    </Tooltip> :
                    <Button type='primary' onClick={handleSaveChanges}>Save Changes</Button>
                }

            </header>
            <div className={styles.canvas}>
                <Canvas nodes={nodes} selectedNode={selectedNode} setSelectedNode={setSelectedNode} edges={edges} nodeTypes={nodeTypes} setNodes={setNodes} onConnect={onConnect} />
                <Panel selectedNode={selectedNode} setSelectedNode={setSelectedNode} setNodes={setNodes} setEdges={setEdges} />
            </div>
        </div>
    )
}
