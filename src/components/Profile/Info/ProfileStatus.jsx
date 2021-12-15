import React from "react";
import s from './Info.module.css';
class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status,
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        this.props.updateStatus(this.state.status);
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status,
            })
        }
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div className={s.point} onDoubleClick={this.activateEditMode}>
                        Status: {this.props.status || 'There`s no status'}
                    </div>
                }
                {this.state.editMode &&
                    <input  onChange={this.onStatusChange} type="text" className={s.point} value={this.state.status} autoFocus={true} onBlur={this.deactivateEditMode} />
                }
            </div>
        )
    }
}

export default ProfileStatus;