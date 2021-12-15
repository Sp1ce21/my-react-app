import React from 'react';
import s from './Posts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { required, maxLength } from '../../../utils/validators/validators';
import {Textarea} from '../../common/FormsControls/FormsControls'
const maxLength10 = maxLength(10)

export const PostsReduxForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field validate={[
                required, maxLength10
            ]} name={'postText'} component={Textarea} className={s.textarea} placeholder='your news...' />
            <button className={s.btn}>Send</button>
        </form>
    )
}


export const AddPostReduxForm = reduxForm({form: 'addPost'})(PostsReduxForm)


const Posts = (props) => {
    let posts = props.posts;
    let postsElements = posts.map(p => <Post message={p.text} />);

    const onSubmit = (formData) => {
        props.addPost(formData.postText);
    }



    return (
        <div className={s.posts}>
            <h2 className={s.title}>My posts</h2>
            <AddPostReduxForm onSubmit={onSubmit}/>
            <div className={s.column}>
                {postsElements}
            </div>
        </div>
    )
}




export default Posts;