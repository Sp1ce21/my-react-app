import s from './Post.module.css';

function Post(props) {
    return (
        <div className={s.post}>
            <div className={s.img}></div>
            <div className={s.message}>{props.message}</div>
        </div>
    )
}
export default Post;