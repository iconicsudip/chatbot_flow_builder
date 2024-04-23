import { Input } from 'antd'
import { T_Node } from '../../types/node'
import styles from './NodeTextEditor.module.scss'
import { TbArrowLeft, TbTrash } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import { Edge } from 'reactflow'

interface Props {
    setSelectedNode: React.Dispatch<React.SetStateAction<T_Node | null>>
    setNodes: React.Dispatch<React.SetStateAction<never[]>>
    selectedNode: T_Node | null
    setEdges: React.Dispatch<React.SetStateAction<Edge[]>>
}

export default function NodeTextEditor({ setSelectedNode, setNodes, selectedNode, setEdges }:Props) {
    const [message, setMessage] = useState(selectedNode?.data.label)
    const handleBack = () => {
        setSelectedNode(null)
    }
    const handleSetMessage = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const handleDeleteNode = () => {
        setNodes((prev:any)=>{
            const newNodes = prev.filter((node:any)=>node.id !== selectedNode?.id)
            return newNodes
        })
        setEdges((prev:any)=>{
            const newEdges = prev.filter((edge:any)=>edge.source !== selectedNode?.id && edge.target !== selectedNode?.id)
            return newEdges
        })
        setSelectedNode(null)
    }

    useEffect(() => {
        setNodes((prev:any)=>{
            const newNodes = prev.map((node:any)=>{
                if(node.id === selectedNode?.id){
                    node.data.label = message
                }
                return node
            })
            return newNodes
        })
    }, [message])

    useEffect(() => {
        setMessage(selectedNode?.data.label)
    }, [selectedNode?.id])
    return (
        <div>
            <div className={styles.text_editor_header}>
                <TbArrowLeft className={styles.back} onClick={handleBack} />
                <h5>Message</h5>
                <TbTrash className={styles.trash} onClick={handleDeleteNode} />
            </div>
            <div className={styles.message_box}>
                <p className={styles.message_heading}>Your message</p>
                <Input.TextArea value={message} onChange={handleSetMessage} rows={6} placeholder='Write your message here...' />
            </div>
        </div>
    )
}
