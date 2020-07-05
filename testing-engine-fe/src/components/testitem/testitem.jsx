import React from 'react';
class Testitem extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<div>
            <div>{this.props.questions}</div>
            <select><span>Options</span>
                <option>
                    {this.props.answer}
                </option>
                <option>{this.props.option}</option>
            </select>
        </div>)
    }
}
export default Testitem;