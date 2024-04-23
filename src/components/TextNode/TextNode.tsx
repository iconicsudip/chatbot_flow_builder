import { Handle, Position } from 'reactflow'
import styles from './TextNode.module.scss'
import { TbBrandWhatsapp } from 'react-icons/tb';
import { T_Node } from '../../types/node';
interface Props {
    data:T_Node['data']
    id:string
}
export default function TextNode({data,id}:Props) {
    return (
        <>
            <Handle type="target" className={styles.left_handle} position={Position.Left}  />
            <div id={id} className={`node_header ${styles.node}`}>
                <div className={`${styles.drag_area}`} >
                    <p>Send Message</p>
                    <TbBrandWhatsapp className={styles.logo}/>
                </div>
                {data.label === '' ? <p className={styles.empty_text}>Click node to add message</p> : <p className={styles.content_text}>{data.label}</p>}
            </div>
            <Handle type="source" className={styles.right_handle} position={Position.Right} />
        </>
    )
}
